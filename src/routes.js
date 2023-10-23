const express = require("express");
const {
    listaContas,
    criarConta,
    atualizarConta,
    excluirConta,
    depositarNaConta,
    sacarDaConta,
    transferir,
    conferirSaldo,
    extratoCompleto,
    welcomePage } = require("./controllers/banco");

const { informacoes, validarContas, verificacao } = require("./intermediaries/validations")
const rotas = express()

rotas.get("/", welcomePage)
rotas.post("/contas", informacoes, validarContas, criarConta)
rotas.put("/contas/:numeroConta/usuario", informacoes, validarContas, atualizarConta)
rotas.delete("/contas/:numeroConta", excluirConta)
rotas.post("/transacoes/depositar", verificacao, depositarNaConta)
rotas.post("/transacoes/sacar", verificacao, sacarDaConta)
rotas.post("/transacoes/transferir", transferir)
rotas.get("/contas/saldo", conferirSaldo)
rotas.get("/contas/extrato", extratoCompleto)

module.exports = rotas