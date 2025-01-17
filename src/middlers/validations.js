const e = require("express")
const knex = require("../config/connection")

const informations = (arrayData) => (req, res, next) => {
    for (const item of arrayData) {
        if (!req.body[item]) {
            return res.status(400).json({
                message: `Please provide your ${item}`
            })
        }
    }
    next()
}

const checkCPF = async (req, res, next) => {
    const { cpf } = req.body

    try {
        const validateCPF = await knex("usuario").where("cpf", cpf)

        if (validateCPF.length > 0) {
            return res.status(400).json({
                mensagem: "An account already exists with the CPF entered!"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    next()
}

const checkEmail = async (req, res, next) => {
    const { email } = req.body

    try {
        const validateEmail = await knex("usuario").where("email", email)
        if (validateEmail.length > 0) {
            return res.status(400).json({
                mensagem: "An account already exists with the email entered!"
            })
        }

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: error.message
        })
    }
    next()
}

const checkRegiser = async (req, res, next) => {
    const { email } = req.body

    try {
        const validateEmail = await knex("usuario").where("email", email)
        if (validateEmail.length === 0) {
            return res.status(400).json({
                message: "Account does not exist"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    next()
}

const validateBalance = async (req, res, next) => {

    try {
        const userBalance = await knex("saldo")
            .where("user_id", req.foundUser.id)
            .sum("balance as total_amount")
            .first()

        req.userBalance = userBalance

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    next()
}

const checkAccountStatus = async (req, res, next) => {

    try {
        if (req.foundUser.ativo === false) {
            return res.status(400).json({
                message: "User inactive"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    next()
}

const checkId = async (req, res, next) => {
    const { receiver_account_id } = req.body

    try {
        const receiverId = await knex("usuario").where("id", receiver_account_id)

        if (receiverId.length === 0) {
            return res.status(400).json({
                mensagem: "Target account does not exist"
            })
        }

        if (receiverId.status === false) {
            return res.status(400).json({
                message: "Target user disabled"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    next()
}


module.exports = {
    informations,
    checkCPF,
    checkEmail,
    checkRegiser,
    validateBalance,
    checkAccountStatus,
    checkId
}

