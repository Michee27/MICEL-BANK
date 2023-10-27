const e = require("express")
const knex = require("../config/connection")

const informations = (arrayData) => (request, answer, next) => {
    for (const item of arrayData) {
        if (!request.body[item]) {
            return answer.status(400).json({
                message: `Please provide your ${item}`
            })
        }
    }
    next()
}

const validateAccount = async (request, answer, next) => {
    const { cpf, email } = request.body

    try {
        const validateCPF = await knex("usuario").where("cpf", cpf)
        if (validateCPF.length > 0) {
            return answer.status(400).json({
                mensagem: "An account already exists with the CPF entered!"
            })
        }

        const validateEmail = await knex("usuario").where("email", email)
        if (validateEmail.length > 0) {
            return answer.status(400).json({
                mensagem: "An account already exists with the email entered!"
            })
        }

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
    next()
}

const validateBalance = async (request, answer, next) => {

    try {
        const userBalance = await knex("saldo")
            .where("user_id", request.foundUser.id)
            .sum("balance as total_amount")
            .first()
        request.userBalance = userBalance

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
    next()
}


module.exports = {
    informations,
    validateAccount,
    validateBalance
}

