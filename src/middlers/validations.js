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

const checkCPF = async (request, answer, next) => {
    const { cpf } = request.body

    try {
        const validateCPF = await knex("usuario").where("cpf", cpf)
        if (validateCPF.length > 0) {
            return answer.status(400).json({
                mensagem: "An account already exists with the CPF entered!"
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

const checkEmail = async (request, answer, next) => {
    const { email } = request.body

    try {

        const validateEmail = await knex("usuario").where("email", email)
        if (validateEmail.length > 0) {
            return answer.status(400).json({
                mensagem: "An account already exists with the email entered!"
            })
        }

    } catch (error) {
        console.log(error.message)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
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

const checkAccountStatus = async (request, answer, next) => {

    try {
        /*const userStatus = await knex("usuario")
            .where("id", request.foundUser.id)*/

        if (request.foundUser.ativo === false) {
            return answer.status(400).json({
                message: "User inactive"
            })
        }

    } catch (error) {
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
    next()
}


module.exports = {
    informations,
    checkCPF,
    checkEmail,
    validateBalance,
    checkAccountStatus
}

