const express = require("express");
const {
    registerAccount,
    userLogin,
    atualizarConta,
    excluirConta,
    depositarNaConta,
    sacarDaConta,
    transferir,
    conferirSaldo,
    extratoCompleto,
    welcomePage
} = require("./controllers/user");

const { informations, validateAccount, verificacao } = require("./intermediaries/validations");
const authenticateUser = require("./intermediaries/authentication");
const route = express()

route.get("/", welcomePage)
route.post("/signup", informations, validateAccount, registerAccount)
route.post("/login", userLogin)

route.use(authenticateUser)
route.put("/account/:numberAccount/user", informations, validateAccount, atualizarConta)

route.delete("/contas/:numeroConta", excluirConta)
route.post("/transacoes/depositar", verificacao, depositarNaConta)
route.post("/transacoes/sacar", verificacao, sacarDaConta)
route.post("/transacoes/transferir", transferir)
route.get("/contas/saldo", conferirSaldo)
route.get("/contas/extrato", extratoCompleto)

module.exports = route