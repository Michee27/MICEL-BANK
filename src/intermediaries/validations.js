
const informacoes = (requisicao, resposta, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = requisicao.body

    if (!nome) {
        return resposta.status(400).json({
            mensagem: "O nome é obrigatório"
        })
    }
    if (!data_nascimento) {
        return resposta.status(400).json({
            mensagem: "A data de nascimento é obrigatório"
        })
    }
    if (!telefone) {
        return resposta.status(400).json({
            mensagem: "O telefone é obrigatório"
        })
    }
    if (!cpf) {
        return resposta.status(400).json({
            mensagem: "O cpf é obrigatório"
        })
    }
    if (!senha) {
        return resposta.status(400).json({
            mensagem: "A senha é obrigatório"
        })
    }
    if (!email) {
        return resposta.status(400).json({
            mensagem: "O email é obrigatório"
        })
    }
    next()
}

const validarContas = (requisicao, resposta, next) => {
    const { cpf, email } = requisicao.body
    const verificaçãoCPF = contas.find((conta) => {
        return conta.usuario.cpf === (cpf)
    })

    if (verificaçãoCPF) {
        return resposta.status(400).json({
            mensagem: "Já existe uma conta com o cpf informado!"
        })
    }
    const verificaçãoemail = contas.find((conta) => {
        return conta.usuario.email === (email)
    })
    if (verificaçãoemail) {
        return resposta.status(400).json({
            mensagem: "Já existe uma conta com o e-mail informado!"
        })
    }
    next()
}

const verificacao = (requisicao, resposta, next) => {
    const { numero_conta, valor } = requisicao.body
    if (!numero_conta) {
        return resposta.status(400).json({
            mensagem: "O número da conta é obrigatórios!"
        })
    }
    if (!valor) {
        return resposta.status(400).json({
            mensagem: "O valor é obrigatórios!"
        })
    }
    next()
}



module.exports = {
    informacoes,
    validarContas,
    verificacao
}

