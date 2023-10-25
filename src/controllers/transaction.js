const knex = require("../config/connection")

const deposit = async (request, answer) => {
    const { amount } = request.body

    try {

        if (!amount) {
            return answer.status(404).json({
                message: "Enter the amount to be deposited please"
            })
        }

        const insertRows = await knex("deposito")
            .insert({
                "amount": amount,
                "account_id": request.foundUser.id
            }).returning(["id", "amount", "account_id", "transaction_date"])

        const balanceUpdate = await knex("deposito")
            .where("account_id", request.foundUser.id)
            .sum("amount as total_amount")
            .first();

        const detail = {
            id: insertRows[0].id,
            amount: insertRows[0].amount,
            transaction_date: insertRows[0].transaction_date,
            new_balance: balanceUpdate.total_amount
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
        if (request.foundUser.balance <= 0) {
            return answer.status(400).json({
                message: "insufficient funds"
            })
        }

    } catch (error) {
        return answer.status(404).json({
            message: error.mensagem
        })
    }
}

const transfer = async (request, answer) => {

    try {

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