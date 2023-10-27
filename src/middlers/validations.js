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
        return answer.status(404).json({
            mensagem: error.mensagem
        })
    }
    next()
}

const validadeAmount = async (request, answer, next) => {
    const { amount } = request.body

    if (!amount) {
        return answer.status(404).json({
            message: "Enter the amount to be withdrawn please"
        })
    }

}

module.exports = {
    informations,
    validateAccount,
    validadeAmount
}

