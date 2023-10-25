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
            })
            .returning(["id", "amount", "account_id", "transaction_date"])

        return answer.status(200).json(insertRows)

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
    transfer
}