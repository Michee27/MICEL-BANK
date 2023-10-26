const e = require("express")
const knex = require("../config/connection")

const informations = (request, answer, next) => {
    const { name, cpf, date_of_birth, phone, email, password } = request.body

    if (!name) {
        return answer.status(400).json({
            mensagem: "Please provide your name"
        })
    }
    if (!date_of_birth) {
        return answer.status(400).json({
            mensagem: "Please provide your date of birth"
        })
    }
    if (!phone) {
        return answer.status(400).json({
            mensagem: "Please provide your phone number"
        })
    }
    if (!cpf) {
        return answer.status(400).json({
            mensagem: "Please provide your cpf"
        })
    }
    if (!password) {
        return answer.status(400).json({
            mensagem: "Please provide your password"
        })
    }
    if (!email) {
        return answer.status(400).json({
            mensagem: "Please provide your email"
        })
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

