const express = require("express");

const personalData = ["name", "cpf", "date_of_birth", "phone", "email", "password"]

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
    validateAccount
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
route.get("/user", userDetail)
route.delete("/delete/account", deleteAccount)

route.post("/account/deposit", deposit)
route.post("/account/withdraw", withdraw)
route.post("/account/transfer", transfer)
route.get("/account/balance", detailBalance)
route.get("/account/statement", accountStatement)

module.exports = route