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
        return answer.status(404).json({
            message: error.mensagem
        })
    }
}

const userLogin = async (request, answer) => {
    const { email, password } = request.body

    try {
        const findUser = await knex("usuario").where("email", email)

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
        return answer.status(404).json({
            message: error.mensagem
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
        return answer.status(404).json({
            message: error.mensagem
        })
    }

}

const userDetail = async (request, answer) => {

    try {

        const balanceUpdate = await knex("saldo")
            .where("user_id", request.foundUser.id)
            .sum("balance as total_amount")
            .first();

        const user = {
            id: request.foundUser.id,
            name: request.foundUser.name,
            email: request.foundUser.email,
            balance: parseFloat(balanceUpdate.total_amount)
        }

        answer.status(200).json(user)

    } catch (error) {
        return answer.status(404).json({
            message: error.mensagem
        })
    }

}

const deleteAccount = async (request, answer) => {
    try {

        if (request.foundUser.balance > 0) {
            return answer.status(400).json({
                message: "The account can only be removed if the balance is zero!"
            })
        }

        const foundUserID = await knex("usuario").del()
            .where("id", request.foundUser.id).returning("*")

        return answer.status(201).send()

    } catch (error) {
        return answer.status(404).json({
            message: error.mensagem
        })
    }
}

/*
const conferirSaldo = (requisicao, resposta) => {
    const { numero_conta, senha } = requisicao.query

    const acharconta = contas.find((elemento) => {
        return elemento.numeroConta === Number(numero_conta)
    })

    if (acharconta) {
        if (acharconta.usuario.senha === senha) {
            return resposta.status(200).json({
                Saldo: acharconta.saldo
            })
        } else {
            return resposta.status(400).json({
                mensagem: "Senha incorreta"
            })
        }
    } else {
        return resposta.status(400).json({
            mensagem: "conta não encontrado"
        })
    }
}

let extrato = {}
const extratoCompleto = (requisicao, resposta) => {
    const { numero_conta, senha } = requisicao.query

    try {
        const acharconta = contas.find((elemento) => {
            return elemento.numeroConta === Number(numero_conta)
        })
        const deposito = depositos.filter((conta) => {
            return Number(conta.numero_conta) === Number(acharconta.numeroConta)
        })
        const resumoDeSaques = saques.filter((conta) => {
            return Number(conta.numero_conta) === Number(acharconta.numeroConta)
        })
        const TranferenciasEnviadas = transferencias.filter((conta) => {
            return Number(conta.numero_conta_origem) === Number(acharconta.numeroConta)
        })
        const TranferenciasRecebidas = transferencias.filter((conta) => {
            return Number(conta.numero_conta_destino) === Number(acharconta.numeroConta)
        })
        if (acharconta) {
            if (acharconta.usuario.senha === senha) {
                extrato = {
                    mensagem: `Extrato conta ${numero_conta}`,
                    TranferenciasEnviadas,
                    TranferenciasRecebidas,
                    deposito,
                    Saques: resumoDeSaques
                }
                return resposta.status(200).json({
                    extrato
                })
            } else {
                return resposta.status(400).json({
                    mensagem: "Senha incorreta"
                })
            }
        } else {
            return resposta.status(400).json({
                mensagem: "conta não encontrado"
            })
        }
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }
}*/

module.exports = {
    welcomePage,
    //listaContas,
    userLogin,
    registerAccount,
    updateUser,
    userDetail,
    deleteAccount
    //atualizarConta,
    //excluirConta,
    //depositarNaConta,
    //sacarDaConta,
    //transferir,
    //conferirSaldo,
    //extratoCompleto,

}