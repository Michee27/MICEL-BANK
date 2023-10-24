const jwt = require("jsonwebtoken")
const knex = require("../config/connection")
const secretKey = require("../config/secretKey")


const autenticarUsuario = async (request, answer, next) => {
    const { authorization } = request.headers

    if (!authorization) {
        return answer.status(401).json({
            message: 'Not authorized'
        })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, secretKey)

        const { rows, rowCount } = await pool.query(
            'select * from usuarios where id = $1',
            [id]
        )

        if (rowCount < 1) {
            return resposta.status(401).json({
                mensagem: 'Não autorizado'
            })
        }

        requisicao.usuarioEncontrado = rows[0]
        next()
    } catch (error) {
        return resposta.status(401).json({ mensagem: 'Não autorizado' })
    }
}

//module.exports = autenticarUsuario 