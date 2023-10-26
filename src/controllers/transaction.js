const knex = require("../config/connection")

const deposit = async (request, answer) => {
    const { amount } = request.body

    try {
        if (!amount) {
            return answer.status(404).json({
                message: "Enter the amount to be deposited please"
            })
        }

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
        return answer.status(404).json({
            message: error.mensagem
        })
    }
}

const withdraw = async (request, answer) => {
    const { amount } = request.body

    try {

        if (!amount) {
            return answer.status(404).json({
                message: "Enter the amount to be withdrawn please"
            })
        }
        const accountAmount = await knex("saldo")
            .where("user_id", request.foundUser.id)

        if (accountAmount[0].balance < 1) {
            return answer.status(400).json({
                message: "insufficient funds"
            })
        }

        const checkBalance = await knex("saldo")
            .where("user_id", request.foundUser.id)
            .sum("balance as total_amount")
            .first();

        if (amount > parseFloat(checkBalance.total_amount)) {
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
            new_balance: parseFloat(checkBalance.total_amount) - amount
        }

        return answer.status(200).json(detail)

    } catch (error) {
        return answer.status(404).json({
            message: error.mensagem
        })
    }
}

const transfer = async (request, answer) => {
    const { amount, receiver_account_id } = request.body

    try {
        if (!amount) {
            return answer.status(404).json({
                message: "Enter the amount please"
            })
        }

        const checkBalance = await knex("saldo")
            .where("user_id", request.foundUser.id)
            .sum("balance as total_amount")
            .first();

        if (amount > parseFloat(checkBalance.total_amount)) {
            return answer.status(400).json({
                message: "insufficient funds"
            })
        }

        const insertRows = await knex("transferencia_enviada")
            .insert({
                "amount": amount,
                "shipping_account_id": request.foundUser.id,
                "receiver_account_id": receiver_account_id
            }).returning("*")

        const balanceUpdate = await knex("saldo")
            .insert({
                "balance": -amount,
                "user_id": request.foundUser.id
            })

        const detail = {
            amount_sent: insertRows[0].amount,
            receiver_account_id: insertRows[0].receiver_account_id,
            transaction_date: insertRows[0].transaction_date
        }
        return answer.status(201).json(detail)

    } catch (error) {
        return answer.status(404).json({
            message: error.mensagem
        })
    }
}

module.exports = {
    deposit,
    withdraw,
    transfer
}