const express = require("express");
const {
    welcomePage,
    registerAccount,
    userLogin,
    atualizarConta,
    updateUser,
    userDetail,
    //excluirConta,
    //depositarNaConta,
    //sacarDaConta,
    //transferir,
    //conferirSaldo,
    //extratoCompleto,
} = require("./controllers/user");

const { informations, validateAccount, verificacao } = require("./intermediaries/validations");
const authenticateUser = require("./intermediaries/authentication");

const route = express()

route.get("/", welcomePage)
route.post("/signup", informations, validateAccount, registerAccount)
route.post("/login", userLogin)

route.use(authenticateUser)
route.put("/account/user", informations, validateAccount, updateUser)
route.get("/user", userDetail)

/*
route.delete("/contas/:numeroConta", excluirConta)
route.post("/transacoes/depositar", verificacao, depositarNaConta)
route.post("/transacoes/sacar", verificacao, sacarDaConta)
route.post("/transacoes/transferir", transferir)
route.get("/contas/saldo", conferirSaldo)
route.get("/contas/extrato", extratoCompleto)*/

module.exports = route