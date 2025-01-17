const jwt = require("jsonwebtoken")
const knex = require("../config/connection")
const secretKey = require("../config/secretKey")


const authenticateUser = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            message: "Not authorized"
        })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, secretKey)

        const findId = await knex("usuario").where("id", id)

        if (findId.length < 1) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        req.foundUser = findId[0]
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Not authorized" })
    }
}

module.exports = authenticateUser