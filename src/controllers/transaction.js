const knex = require("../config/connection")
const { reaisToCentavos, centavosToReais } = require("../utils/format")

const deposit = async (req, res) => {
    const { amount } = req.body

    try {
        const insertDeposit = await knex("deposito")
            .insert({
                "amount": reaisToCentavos(amount),
                "account_id": req.foundUser.id
            }).returning(["id", "amount", "account_id", "transaction_date"])

        await knex("saldo")
            .insert({
                "balance": reaisToCentavos(amount),
                "user_id": req.foundUser.id
            })

        const balanceUpdate = await knex("saldo")
            .where("user_id", req.foundUser.id)
            .sum("balance as total_amount")
            .first();

        const detail = {
            message: "Deposit made successfully",
            amount: insertDeposit[0].amount,
            transaction_date: insertDeposit[0].transaction_date,
            new_balance: parseFloat(balanceUpdate.total_amount)
        }

        return res.status(200).json(detail)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const withdraw = async (req, res) => {
    const { amount } = req.body

    try {
        if (amount > parseFloat(req.userBalance.total_amount)) {
            return res.status(400).json({
                message: "insufficient funds"
            })
        }

        const insertRows = await knex("sacar")
            .insert({
                "amount": amount,
                "account_id": req.foundUser.id
            }).returning(["id", "amount", "account_id", "transaction_date"])

        const balanceUpdate = await knex("saldo")
            .insert({
                "balance": -amount,
                "user_id": req.foundUser.id
            })


        const detail = {
            message: "Withdray made successfully",
            amount: insertRows[0].amount,
            transaction_date: insertRows[0].transaction_date,
            new_balance: parseFloat(req.userBalance.total_amount) - amount
        }

        return res.status(200).json(detail)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const transfer = async (req, res) => {
    const { amount } = req.body

    try {

        if (req.receiver.id === req.foundUser.id) {
            return res.status(400).json({
                message: "You cannot make a transfer to yourself"
            })
        }

        if (reaisToCentavos(amount) > req.userBalance) {
            return res.status(400).json({
                message: "insufficient funds"
            })
        }

        const sendTransfer = await knex("transferencia_enviada")
            .insert({
                "amount": reaisToCentavos(amount),
                "shipping_account_id": req.foundUser.id,
                "receiver_account_id": req.receiver.id
            }).returning("*")

        await knex("transferencia_recebida")
            .insert({
                "amount": reaisToCentavos(amount),
                "shipping_account_id": req.foundUser.id,
                "receiver_account_id": req.receiver.id
            }).returning("*")

        await knex("saldo")
            .insert({
                "balance": -reaisToCentavos(amount),
                "user_id": req.foundUser.id
            })

        await knex("saldo")
            .insert({
                "balance": reaisToCentavos(amount),
                "user_id": req.receiver.id
            })

        const detail = {
            amount_sent: sendTransfer[0].amount,
            receiver_account_id: sendTransfer[0].receiver_account_id,
            transaction_date: sendTransfer[0].transaction_date
        }

        return res.status(201).json(detail)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// const detailBalance = async (req, res) => {

//     try {

//         return res.status(200).json(req.userBalance)

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// }


const attachUsersToTransfers = async (transfers, userIdKey) => {
    const userIds = transfers.map(transfer => transfer[userIdKey]);
    const users = await knex("usuario")
        .whereIn("id", userIds)
        .select("id", "name", "email");

    const userMap = users.reduce((map, user) => {
        map[user.id] = user;
        return map;
    }, {});

    return transfers.map(transfer => ({
        ...transfer,
        user: userMap[transfer[userIdKey]],
        amount: centavosToReais(transfer.amount),
    }));
};

const accountStatement = async (req, res) => {
    try {
        const { id } = req.foundUser;

        const [withdrawalStatement, depositStatement, transfersSent, receiveTransfer] = await Promise.all([
            knex("sacar").where("account_id", id),
            knex("deposito").where("account_id", id),
            knex("transferencia_enviada").where("shipping_account_id", id),
            knex("transferencia_recebida").where("receiver_account_id", id),
        ]);


        const transformedTransfersSent = await attachUsersToTransfers(transfersSent, "id");
        const transformedReceiveTransfer = await attachUsersToTransfers(receiveTransfer, "id");
        const transformedWithdrawalStatement = await attachUsersToTransfers(withdrawalStatement, "id");
        const transformedDepositStatement = await attachUsersToTransfers(depositStatement, "id");


        return res.json({
            withdrawalStatement: transformedWithdrawalStatement,
            depositStatement: transformedDepositStatement,
            transfersSent: transformedTransfersSent,
            receiveTransfer: transformedReceiveTransfer,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};



module.exports = {
    deposit,
    withdraw,
    transfer,
    // detailBalance,
    accountStatement
}