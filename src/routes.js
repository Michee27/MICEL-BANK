const express = require("express");
const {
    welcomePage,
    registerAccount,
    userLogin,
    updateUser,
    userDetail,
    deleteAccount,

} = require("./controllers/user");

const { informations, validateAccount, verificacao } = require("./intermediaries/validations");
const authenticateUser = require("./intermediaries/authentication");
const { deposit, withdraw, transfer } = require("./controllers/transaction");

const route = express()

route.get("/", welcomePage)
route.post("/signup", informations, validateAccount, registerAccount)
route.post("/login", userLogin)

route.use(authenticateUser)
route.put("/account/user", informations, validateAccount, updateUser)
route.get("/user", userDetail)
route.delete("/delete/account", deleteAccount)

route.post("/account/deposit", deposit)
route.post("/account/withdraw", withdraw)
route.post("/account/transfer", transfer)

/*
route.post("/transacoes/sacar", verificacao, sacarDaConta)
route.post("/transacoes/transferir", transferir)
route.get("/contas/saldo", conferirSaldo)
route.get("/contas/extrato", extratoCompleto)*/

module.exports = route