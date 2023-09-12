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
    extratoCompleto } = require("./controladores/banco");

const { informacoes, validarContas, verificacao } = require("./controladores/intermediarios")
const rotas = express()

rotas.get("/contas", listaContas)
rotas.post("/contas", informacoes, validarContas, criarConta)
rotas.put("/contas/:numeroConta/usuario", informacoes, validarContas, atualizarConta)
rotas.delete("/contas/:numeroConta", excluirConta)
rotas.post("/transacoes/depositar", verificacao, depositarNaConta)
rotas.post("/transacoes/sacar", verificacao, sacarDaConta)
rotas.post("/transacoes/transferir", transferir)
rotas.get("/contas/saldo", conferirSaldo)
rotas.get("/contas/extrato", extratoCompleto)

module.exports = rotas