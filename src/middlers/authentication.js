const jwt = require("jsonwebtoken")
const knex = require("../config/connection")
const secretKey = require("../config/secretKey")


const authenticateUser = async (request, answer, next) => {
    const { authorization } = request.headers

    if (!authorization) {
        return answer.status(401).json({
            message: "Not authorized"
        })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, secretKey)

        const findId = await knex("usuario").where("id", id)

        if (findId.length < 1) {
            return answer.status(401).json({
                message: "Not authorized"
            })
        }

        request.foundUser = findId[0]
        next()
    } catch (error) {
        return answer.status(401).json({ message: "Not authorized" })
    }
}

module.exports = authenticateUser