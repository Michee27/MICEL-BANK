const knex = require("knex")

const welcomePage = (request, answer) => {
    return answer.status(200).json({
        WELCOME: "WELCOME TO MICEL BANK",
        SIGN_UP: "CLICK HERE",
        SIGN_IN: "CLICK HERE"
    })
}


const listaContas = (requisicao, resposta) => {
    const { senha_banco } = requisicao.query
    const senhaCorreta = "MICEL123Bank"

    try {
        if (senha_banco === senhaCorreta) {
            resposta.status(200).json({
                WELCOME: "BEM VINDO AO MICEL BANK",
                banco,
                QUANTIDADES: `${contas.length} contas encontradas`,
                contas
            })
        } else {
            return resposta.status(401).json({
                mensagem: "A senha do banco informada é inválida!"
            })
        }
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }
}

let numeroDaConta = 1
let dados = []
let saldo = 0
const criarConta = (requisicao, resposta) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = requisicao.body
    try {
        dados = {
            numeroConta: numeroDaConta++,
            saldo,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }
        contas.push(dados)
        return resposta.status(201).json()
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }
}

const atualizarConta = (requisicao, resposta) => {
    const { numeroConta, } = requisicao.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = requisicao.body

    try {
        const contaEncontrada = contas.find((conta) => {
            return conta.numeroConta === Number(numeroConta)
        })

        if (!contaEncontrada) {
            return resposta.status(404).json({
                mensagem: "Numero da conta incorreto"
            })
        }

        contaEncontrada.usuario.nome = nome
        contaEncontrada.usuario.cpf = cpf
        contaEncontrada.usuario.data_nascimento = data_nascimento
        contaEncontrada.usuario.telefone = telefone
        contaEncontrada.usuario.email = email
        contaEncontrada.usuario.senha = senha
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }

    return resposta.status(201).json()
}

const excluirConta = (requisicao, resposta) => {
    const { numeroConta } = requisicao.params
    try {
        const acharconta = contas.find((elemento) => {
            return elemento.numeroConta === Number(numeroConta)
        })

        if (acharconta) {
            if (acharconta.saldo > 0) {
                return resposta.status(400).json({
                    mensagem: "A conta só pode ser removida se o saldo for zero!"
                })
            }
        } else if (!acharconta) {
            return resposta.status(400).json({
                mensagem: "conta não encontrado"
            })
        }

        contas = contas.filter((elemento) => {
            return elemento.numeroConta !== Number(numeroConta)
        })
        return resposta.status(201).json()
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }
}

let dadosDeDeposito = []
const depositarNaConta = (requisicao, resposta) => {
    const { numero_conta, valor } = requisicao.body

    try {
        const acharconta = contas.find((conta) => {
            return conta.numeroConta === Number(numero_conta)
        })

        if (!acharconta) {
            return resposta.status(400).json({
                mensagem: "conta não encontrado"
            })
        } else if (acharconta && valor > 0) {
            acharconta.saldo += valor
            dadosDeDeposito = {
                data: new Date(),
                numero_conta,
                valor
            }
            depositos.push(dadosDeDeposito)

        } else {
            return resposta.status(400).json({
                mensagem: "Valor informado não é permitido"
            })
        }
        return resposta.status(201).json()
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }
}

let dadosDoSaque = []
const sacarDaConta = (requisicao, resposta) => {
    const { numero_conta, valor, senha } = requisicao.body

    try {
        if (!senha) {
            return resposta.status(400).json({
                mensagem: "Por favor, informe a senha"
            })
        }
        const acharconta = contas.find((conta) => {
            return conta.numeroConta === Number(numero_conta)
        })
        if (acharconta) {
            if (acharconta.usuario.senha === senha) {
                if (acharconta.saldo >= valor && valor > 0) {
                    acharconta.saldo -= valor
                    dadosDoSaque = {
                        data: new Date(),
                        numero_conta,
                        valor
                    }
                    saques.push(dadosDoSaque)
                } else {
                    return resposta.status(400).json({
                        mensagem: "Saldo insuficiente"
                    })
                }
            } else {
                return resposta.status(400).json({
                    mensagem: "Senha incorreta"
                })
            }
        } else {
            return resposta.status(400).json({
                mensagem: "conta não encontrado"
            })
        }
        return resposta.status(201).json()
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }
}

let dadosTransferencia = []
const transferir = (requisicao, resposta) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = requisicao.body
    if (!numero_conta_origem || !numero_conta_destino) {
        return resposta.status(400).json({
            mensagem: "Por favor, informe o numero da conta origem e destino"
        })
    }

    const acharconta1 = contas.find((elemento) => {
        return elemento.numeroConta === Number(numero_conta_origem)
    })
    const acharconta2 = contas.find((elemento) => {
        return elemento.numeroConta === Number(numero_conta_destino)
    })

    if (acharconta1 && acharconta2 && acharconta1 !== acharconta2) {
        if (acharconta1.usuario.senha === senha) {
            if (acharconta1.saldo >= valor) {
                if (valor > 0) {
                    acharconta1.saldo -= valor
                    acharconta2.saldo += valor
                    dadosTransferencia = {
                        data: new Date(),
                        numero_conta_origem,
                        numero_conta_destino,
                        valor
                    }
                } else {
                    return resposta.status(400).json({
                        mensagem: "Informe por favor o valor da transferencia"
                    })
                }
                transferencias.push(dadosTransferencia)
            } else {
                return resposta.status(400).json({
                    mensagem: "Saldo insuficiente"
                })
            }
        } else {
            return resposta.status(400).json({
                mensagem: "Senha incorreta"
            })
        }
    } else {
        return resposta.status(400).json({
            mensagem: "conta não encontrado"
        })
    }
    return resposta.status(201).json()
}

const conferirSaldo = (requisicao, resposta) => {
    const { numero_conta, senha } = requisicao.query

    const acharconta = contas.find((elemento) => {
        return elemento.numeroConta === Number(numero_conta)
    })

    if (acharconta) {
        if (acharconta.usuario.senha === senha) {
            return resposta.status(200).json({
                Saldo: acharconta.saldo
            })
        } else {
            return resposta.status(400).json({
                mensagem: "Senha incorreta"
            })
        }
    } else {
        return resposta.status(400).json({
            mensagem: "conta não encontrado"
        })
    }
}

let extrato = {}
const extratoCompleto = (requisicao, resposta) => {
    const { numero_conta, senha } = requisicao.query

    try {
        const acharconta = contas.find((elemento) => {
            return elemento.numeroConta === Number(numero_conta)
        })
        const deposito = depositos.filter((conta) => {
            return Number(conta.numero_conta) === Number(acharconta.numeroConta)
        })
        const resumoDeSaques = saques.filter((conta) => {
            return Number(conta.numero_conta) === Number(acharconta.numeroConta)
        })
        const TranferenciasEnviadas = transferencias.filter((conta) => {
            return Number(conta.numero_conta_origem) === Number(acharconta.numeroConta)
        })
        const TranferenciasRecebidas = transferencias.filter((conta) => {
            return Number(conta.numero_conta_destino) === Number(acharconta.numeroConta)
        })
        if (acharconta) {
            if (acharconta.usuario.senha === senha) {
                extrato = {
                    mensagem: `Extrato conta ${numero_conta}`,
                    TranferenciasEnviadas,
                    TranferenciasRecebidas,
                    deposito,
                    Saques: resumoDeSaques
                }
                return resposta.status(200).json({
                    extrato
                })
            } else {
                return resposta.status(400).json({
                    mensagem: "Senha incorreta"
                })
            }
        } else {
            return resposta.status(400).json({
                mensagem: "conta não encontrado"
            })
        }
    } catch (error) {
        return resposta.status(404).json({
            mensagem: error.mensagem
        })
    }
}

module.exports = {
    listaContas,
    criarConta,
    atualizarConta,
    excluirConta,
    depositarNaConta,
    sacarDaConta,
    transferir,
    conferirSaldo,
    extratoCompleto,
    welcomePage
}