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
} = require("./controllers/bank");

const { informations, validateAccount, verificacao } = require("./intermediaries/validations")
const rotas = express()

rotas.get("/", welcomePage)
rotas.post("/signup", informations, validateAccount, registerAccount)
rotas.post("/login", userLogin)


rotas.put("/contas/:numeroConta/usuario", informations, validateAccount, atualizarConta)

rotas.delete("/contas/:numeroConta", excluirConta)
rotas.post("/transacoes/depositar", verificacao, depositarNaConta)
rotas.post("/transacoes/sacar", verificacao, sacarDaConta)
rotas.post("/transacoes/transferir", transferir)
rotas.get("/contas/saldo", conferirSaldo)
rotas.get("/contas/extrato", extratoCompleto)

module.exports = rotas