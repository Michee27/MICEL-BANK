const knex = require("../config/connection")

const deposit = async (request, answer) => {
    const { amount } = request.body

    try {
        const insertDeposit = await knex("deposito")
            .insert({
                "amount": amount,
                "account_id": request.foundUser.id
            }).returning(["id", "amount", "account_id", "transaction_date"])

        const insertBalance = await knex("saldo")
            .insert({
                "balance": amount,
                "user_id": request.foundUser.id
            })

        const balanceUpdate = await knex("saldo")
            .where("user_id", request.foundUser.id)
            .sum("balance as total_amount")
            .first();

        const detail = {
            message: "Deposit made successfully",
            amount: insertDeposit[0].amount,
            transaction_date: insertDeposit[0].transaction_date,
            new_balance: parseFloat(balanceUpdate.total_amount)
        }

        return answer.status(200).json(detail)

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
}

const withdraw = async (request, answer) => {
    const { amount } = request.body

    try {
        if (amount > parseFloat(request.userBalance.total_amount)) {
            return answer.status(400).json({
                message: "insufficient funds"
            })
        }

        const insertRows = await knex("sacar")
            .insert({
                "amount": amount,
                "account_id": request.foundUser.id
            }).returning(["id", "amount", "account_id", "transaction_date"])

        const balanceUpdate = await knex("saldo")
            .insert({
                "balance": -amount,
                "user_id": request.foundUser.id
            })


        const detail = {
            message: "Withdray made successfully",
            amount: insertRows[0].amount,
            transaction_date: insertRows[0].transaction_date,
            new_balance: parseFloat(request.userBalance.total_amount) - amount
        }

        return answer.status(200).json(detail)

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
}

const transfer = async (request, answer) => {
    const { amount, receiver_account_id } = request.body

    try {
        if (amount > parseFloat(request.userBalance.total_amount)) {
            return answer.status(400).json({
                message: "insufficient funds"
            })
        }

        const sendTransfer = await knex("transferencia_enviada")
            .insert({
                "amount": amount,
                "shipping_account_id": request.foundUser.id,
                "receiver_account_id": receiver_account_id
            }).returning("*")

        const receiveTransfer = await knex("transferencia_recebida")
            .insert({
                "amount": amount,
                "shipping_account_id": request.foundUser.id,
                "receiver_account_id": receiver_account_id
            })

        const balanceUpdateShipper = await knex("saldo")
            .insert({
                "balance": -amount,
                "user_id": request.foundUser.id
            })

        const balanceUpdateReceiver = await knex("saldo")
            .insert({
                "balance": amount,
                "user_id": receiver_account_id
            })

        const detail = {
            amount_sent: sendTransfer[0].amount,
            receiver_account_id: sendTransfer[0].receiver_account_id,
            transaction_date: sendTransfer[0].transaction_date
        }
        return answer.status(201).json(detail)

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
}

const detailBalance = async (request, answer) => {

    try {

        return answer.status(200).json(request.userBalance)

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
}

const accountStatement = async (request, answer) => {

    try {

        const withdrawalStatement = await knex("sacar")
            .where("account_id", request.foundUser.id)

        const depositStatement = await knex("deposito")
            .where("account_id", request.foundUser.id)

        const transfersSent = await knex("transferencia_enviada")
            .where("shipping_account_id", request.foundUser.id)

        const receiveTransfer = await knex("transferencia_recebida")
            .where("receiver_account_id", request.foundUser.id)

        return answer.json({
            withdrawalStatement,
            depositStatement,
            transfersSent,
            receiveTransfer
        })

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }

}

module.exports = {
    deposit,
    withdraw,
    transfer,
    detailBalance,
    accountStatement
}