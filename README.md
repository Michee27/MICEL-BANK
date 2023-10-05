# MICEL BANK

Bem-vindo ao MICEL Bank! Este é prototipo de um projeto de um banco digital.

## Descrição

Nosso banco é uma RESTful API e tem com principal objetivo oferecer ao nosso clientes um ambiente seguro, de uso fácil, e dinâmica onde possa controlar suas finanças desde a criação do banco até a emissão de extrato das atividades. Ele é desenvolvido em Linguagem de javascript.

## Funcionalidades:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

## Código-fonte

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/a85c3b87-c9e8-45ec-abfa-304af174db14) 

`index.js`: O ponto de entrada do servidor Express.

`banco.js`: Processar as solicitações do cliente, interagir com o `bancodedados` e retornar uma resposta adequada ao cliente.

`intermediarios.js`: Processa e manipula as solicitações HTTP para verificação dos dados.

`bancodedados.js`: Armazena os dados do banco e as funcionalidades relacionadas ao banco.

 `roteador.js`: Define as rotas da API e seus controladores.


## Status do Projeto

Este projeto está atualmente em desenvolvimento ativo. Estamos constantemente trabalhando nele para torná-lo ainda melhor.
Foi desenvolvido todo o escopo BackEnd, no momento esta sendo desenvolvido a parte FrontEnd para comunicar com a Back.

## Instalação

Para usar este projeto, siga estas etapas:

1. Clone o repositório para sua máquina local usando o seguinte comando:

- [ ] Faça o fork desse repositório para o seu GitHub
- [ ] Clone o projeto em sua máquina
- [ ] Uma vez clonado em sua máquina, inicie o servidor usando:  
```javascript
npm run dev
```
- [ ] Utilize a insomnia para testar as funções


## Como testar

### Listar contas bancárias
#### `/contas?senha_banco=MICEL123Bank`

Ao acesssar esse endpoint e usando a senha correta, devera imprimir na tela as contas cadastrados e ativos no nosso sistema. (Lembrando que os dados ficarão guardados em memórias)

### Criar conta bancária
#### `/contas`

Esse endpoint serve para criar uma conta bancária, gerando um número único para identificação da conta (número da conta) e iniciando com saldo zero.

O corpo (body) deverá receber um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

#### Exemplo de uso

```javascript
{
    "nome": "Michee",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "mic@dev.com",
    "senha": "12345"
}
```

### Atualizar usuário da conta bancária
#### `/contas/:numeroConta/usuario`

O corpo (body) deverá receber um objeto com as seguintes propriedades (respeitando estes nomes):

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

#### Exemplo de Requisição
```javascript
{
    "nome": "Celestin",
    "cpf": "99911122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "celetin@dev.com",
    "senha": "12345"
}
```

### Excluir Conta
####  `/contas/:numeroConta`

A funcionalidade desse endpoint é excluir uma conta bancária existente caso essa conta esteja sem saldo recebendo sua identificação no url.

### Depositar
#### `/transacoes/depositar`

Esse endpoint serve para somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

#### Exemplo de Requisição
```javascript
// /transacoes/depositar
{
	"numero_conta": "1",
	"valor": 1900
}
```


### Sacar
#### `/transacoes/sacar`

Esse endpoint fará a realização de um saque de um valor em uma determinada conta bancária e registrar essa transação.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

#### Exemplo de Requisição
```javascript
// POST /transacoes/sacar
{
	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
}
```

### Tranferir
#### `POST` `/transacoes/transferir`

Esse endpoint irá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

#### Exemplo de Requisição
```javascript
// POST /transacoes/transferir
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
}
```

### Saldo
#### `/contas/saldo`

Esse endpoint irá retornar o saldo de uma conta bancária passado como argumento no url número da conta e senha da respectica conta.

#### Exemplo de Requisição
```javascript
// POST /transacoes/transferir
{
	/contas/saldo?numero_conta=123&senha=123
}
```

### Extrato
#### `/contas/extrato`

Esse endpoint irá listar as transações realizadas de uma conta específica, passado como argumento no url número da conta e senha da respectica conta.

#### Exemplo de Requisição
```javascript
// POST /transacoes/transferir
{
	/contas/extrato?numero_conta=123&senha=123
}
```
