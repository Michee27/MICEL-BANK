const knex = require("../config/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = require("../config/secretKey")

const welcomePage = (request, answer) => {
    return answer.status(200).json({
        WELCOME: "WELCOME TO MICEL BANK",
        SIGN_UP: "CLICK HERE",
        SIGN_IN: "CLICK HERE"
    })
}

const registerAccount = async (request, answer) => {
    const { name, cpf, date_of_birth, phone, email, password } = request.body

    try {

        const encrypt_password = await bcrypt.hash(password, 10)

        const register = await knex("usuario")
            .insert({ name, cpf, date_of_birth, phone, email, encrypt_password })

        return answer.status(201).json({
            message: "Account created successfully"
        })
    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
}

const userLogin = async (request, answer) => {
    const { email, password } = request.body

    try {
        const findUser = await knex("usuario").where("email", email)

        if (findUser[0].ativo === false) {
            return answer.status(400).json({
                message: "User inactive"
            })
        }

        if (findUser.length < 1) {
            return answer.status(400).json({
                mensagem: "Invalid email username and/or password."
            })
        }

        const validatePassword = await bcrypt.compare(password, findUser[0].encrypt_password)

        if (!validatePassword) {
            return answer.status(400).json({
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

        return answer.status(200).json(backUser)

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }
}

const updateUser = async (request, answer) => {
    const { name, cpf, date_of_birth, phone, email, password } = request.body

    try {

        const encrypt_password = await bcrypt.hash(password, 10)

        const foundUserID = await knex("usuario")
            .update({ name, cpf, date_of_birth, phone, email, encrypt_password })
            .where("id", request.foundUser.id)
            .returning(["id", "name", "cpf", "date_of_birth", "phone", "email"])

        return answer.status(201).json(foundUserID[0])
    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }

}

const userDetail = async (request, answer) => {

    try {
        const user = {
            id: request.foundUser.id,
            name: request.foundUser.name,
            email: request.foundUser.email,
            balance: parseFloat(request.userBalance.total_amount)
        }

        answer.status(200).json(user)

    } catch (error) {
        console.log(error)
        return answer.status(404).json({
            message: "Internal server error"
        })
    }

}

const deleteAccount = async (request, answer) => {
    try {
        if (parseFloat(request.userBalance.total_amount) > 0) {
            return answer.status(400).json({
                message: "The account can only be removed if the balance is zero!"
            })
        }

        const deactivateUser = await knex("usuario")
            .where("id", request.foundUser.id)
            .update({ ativo: false });

        return answer.status(201).json({
            message: "account successfully deleted"
        })

    } catch (error) {
        return answer.status(500).json({
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
    deleteAccount
}