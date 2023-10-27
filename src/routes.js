const express = require("express");
const personalData = ["name", "cpf", "date_of_birth", "phone", "email", "password"]
const checkAmount = ["amount"]

const {
    welcomePage,
    registerAccount,
    userLogin,
    updateUser,
    userDetail,
    deleteAccount
} = require("./controllers/user");

const {
    informations,
    validateAccount,
    validateBalance
} = require("./middlers/validations");

const authenticateUser = require("./middlers/authentication");

const { deposit,
    withdraw,
    transfer,
    detailBalance,
    accountStatement
} = require("./controllers/transaction");

const route = express()

route.get("/", welcomePage)
route.post("/signup", informations(personalData), validateAccount, registerAccount)
route.post("/login", userLogin)

route.use(authenticateUser)
route.put("/account/user", informations(personalData), validateAccount, updateUser)
route.get("/user", validateBalance, userDetail)
route.delete("/delete/account", validateBalance, deleteAccount)

route.post("/account/deposit", informations(checkAmount), deposit)
route.post("/account/withdraw", informations(checkAmount), validateBalance, withdraw)
route.post("/account/transfer", informations(checkAmount), validateBalance, transfer)
route.get("/account/balance", validateBalance, detailBalance)
route.get("/account/statement", accountStatement)

module.exports = route