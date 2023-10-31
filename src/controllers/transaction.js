const knex = require("../config/connection")

const deposit = async (req, res) => {
    const { amount } = req.body

    try {
        const insertDeposit = await knex("deposito")
            .insert({
                "amount": amount,
                "account_id": req.foundUser.id
            }).returning(["id", "amount", "account_id", "transaction_date"])

        const insertBalance = await knex("saldo")
            .insert({
                "balance": amount,
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
    const { amount, receiver_account_id } = req.body

    try {
        if (amount > parseFloat(req.userBalance.total_amount)) {
            return res.status(400).json({
                message: "insufficient funds"
            })
        }

        const sendTransfer = await knex("transferencia_enviada")
            .insert({
                "amount": amount,
                "shipping_account_id": req.foundUser.id,
                "receiver_account_id": receiver_account_id
            }).returning("*")

        const receiveTransfer = await knex("transferencia_recebida")
            .insert({
                "amount": amount,
                "shipping_account_id": req.foundUser.id,
                "receiver_account_id": receiver_account_id
            }).returning("*")

        const balanceUpdateShipper = await knex("saldo")
            .insert({
                "balance": -amount,
                "user_id": req.foundUser.id
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

        return res.status(201).json(detail)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const detailBalance = async (req, res) => {

    try {

        return res.status(200).json(req.userBalance)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const accountStatement = async (req, res) => {

    try {

        const withdrawalStatement = await knex("sacar")
            .where("account_id", req.foundUser.id)

        const depositStatement = await knex("deposito")
            .where("account_id", req.foundUser.id)

        const transfersSent = await knex("transferencia_enviada")
            .where("shipping_account_id", req.foundUser.id)

        const receiveTransfer = await knex("transferencia_recebida")
            .where("receiver_account_id", req.foundUser.id)

        return res.json({
            withdrawalStatement,
            depositStatement,
            transfersSent,
            receiveTransfer
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
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