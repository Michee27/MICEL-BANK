const knex = require("../config/connection")

const deposit = async (request, answer) => {
    const { balance } = request.body

    try {

        if (!balance) {
            return answer.status(404).json({
                message: "Enter the amount to be deposited please"
            })
        }

        const updateRows = await knex("usuario")
            .where("id", request.foundUser.id)
            .update({ "balance": balance })
            .returning(["id", "name", "balance"])

        return answer.status(200).json(updateRows)

    } catch (error) {
        return answer.status(404).json({
            message: error.mensagem
        })
    }
}

module.exports = {
    deposit
}