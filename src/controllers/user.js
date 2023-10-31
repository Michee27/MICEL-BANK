const knex = require("../config/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = require("../config/secretKey")

const welcomePage = (req, res) => {
    return res.status(200).json({
        WELCOME: "WELCOME TO MICEL BANK",
        SIGN_UP: "CLICK HERE",
        SIGN_IN: "CLICK HERE"
    })
}

const registerAccount = async (req, res) => {
    const { name, cpf, date_of_birth, phone, email, password } = req.body

    try {

        const encrypt_password = await bcrypt.hash(password, 10)

        const register = await knex("usuario")
            .insert({ name, cpf, date_of_birth, phone, email, encrypt_password })

        return res.status(201).json({
            message: "Account created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const findUser = await knex("usuario").where("email", email)
        if (findUser[0].ativo === false) {
            return res.status(400).json({
                message: "User inactive"
            })
        }

        if (findUser.length < 1) {
            return res.status(400).json({
                mensagem: "Invalid email username and/or password."
            })
        }

        const validatePassword = await bcrypt.compare(password, findUser[0].encrypt_password)

        if (!validatePassword) {
            return res.status(400).json({
                mensagem: "Invalid username and/or password."
            })
        }

        const token = jwt.sign({
            id: findUser[0].id
        }, secretKey, { expiresIn: "24h" })

        const backUser = {
            user: {
                id: findUser[0].id,
                name: findUser[0].name,
                email: findUser[0].email,
            },
            token
        }

        return res.status(200).json(backUser)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    const { name, cpf, date_of_birth, phone, email, password } = req.body

    try {

        const encrypt_password = await bcrypt.hash(password, 10)

        const foundUserID = await knex("usuario")
            .update({ name, cpf, date_of_birth, phone, email, encrypt_password })
            .where("id", req.foundUser.id)
            .returning(["id", "name", "cpf", "date_of_birth", "phone", "email"])

        return res.status(201).json(foundUserID[0])
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const userDetail = async (req, res) => {

    try {

        let user = {}

        if (req.userBalance.total_amount === null) {
            user = {
                id: req.foundUser.id,
                name: req.foundUser.name,
                email: req.foundUser.email,
                balance: 0
            }
            return res.status(201).json(user)
        }

        user = {
            id: req.foundUser.id,
            name: req.foundUser.name,
            email: req.foundUser.email,
            balance: parseFloat(req.userBalance.total_amount)
        }

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

const deleteAccount = async (req, res) => {
    try {
        if (parseFloat(req.userBalance.total_amount) > 0) {
            return res.status(400).json({
                message: "The account can only be removed if the balance is zero!"
            })
        }

        const deactivateUser = await knex("usuario")
            .where("id", req.foundUser.id)
            .update({ ativo: false });

        return res.status(201).json({
            message: "account successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const reactivateAccount = async (req, res) => {
    const { email, status } = req.body

    try {
        if (!status || status !== "activate") {
            return res.status(401).json({
                message: "Transaction not accepted"
            })
        }

        const activateUser = await knex("usuario")
            .where("email", email)
            .update({ ativo: true })

        return res.status(201).json({
            message: "account reactivated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

module.exports = {
    welcomePage,
    userLogin,
    registerAccount,
    updateUser,
    userDetail,
    deleteAccount,
    reactivateAccount
}