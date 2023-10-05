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

   ## Status do Projeto

Este projeto está atualmente em desenvolvimento ativo. Estamos constantemente trabalhando nele para torná-lo ainda melhor.
Foi desenvolvido todo o escopo BackEnd, no momento esta sendo desenvolvido a parte FrontEnd para comunicar com a Back.

## Código-fonte

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/a85c3b87-c9e8-45ec-abfa-304af174db14) 

`index.js`: O ponto de entrada do servidor Express.

`banco.js`: Processar as solicitações do cliente, interagir com o `bancodedados` e retornar uma resposta adequada ao cliente.

`intermediarios.js`: Processa e manipula as solicitações HTTP para verificação dos dados.

`bancodedados.js`: Armazena os dados do banco e as funcionalidades relacionadas ao banco.

`roteador.js`: Define as rotas da API e seus controladores.

## Tecnologias usadas

### JavaScript:
Linguagem de programação de alto nível amplamente utilizada para desenvolvimento web. Ela é conhecida por ser uma linguagem de script, o que significa que você pode escrever código JavaScript diretamente em páginas da web para torná-las interativas e dinâmicas.

### Node.js:
Ambiente de tempo de execução (runtime) de código aberto baseado na engine V8 do Google Chrome. Ele permite que os desenvolvedores utilizem JavaScript para criar aplicativos de servidor, o que é um desvio do uso tradicional do JavaScript no lado do cliente, que é executado nos navegadores.

## Dependências:

### date-fns: 
Uma biblioteca JavaScript usada para trabalhar com datas e horários. Ela fornece funções úteis para análise, manipulação e formatação de datas. Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: `npm install date-fns`

### express.js: 
O framework web "Express.js", usado para criar aplicativos web e APIs em Node.js. É amplamente utilizado para criar servidores web e simplificar o desenvolvimento web em Node.js. Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: `npm install express`

### nodemon: 
Uma ferramenta de desenvolvimento que monitora alterações em arquivos no diretório do seu projeto e reinicia automaticamente o servidor sempre que há uma alteração. É frequentemente usado para desenvolvimento em Node.js para economizar tempo na reinicialização do servidor durante o desenvolvimento. As dependências são bibliotecas ou pacotes necessários para o funcionamento do seu aplicativo, enquanto as devDependencies são pacotes usados apenas durante o desenvolvimento, como no caso do nodemon, que ajuda a manter o servidor atualizado durante o desenvolvimento. Abra o terminal ou prompt de comando, navegue até o diretório do seu projeto e execute o seguinte comando: `npm install -D nodemon`.
Após clonar este repositório, você pode instalar todas as dependências e devDependencies usando o comando: npm install

## Instalação

Para usar este projeto, siga estas etapas:

1. Clone o repositório para sua máquina local usando o seguinte comando:

- [ ] Faça o fork desse repositório para o seu GitHub
- [ ] Clone o projeto em sua máquina
- [ ] Uma vez clonado em sua máquina, realize a instalação das dependências citadas acima e inicie o servidor usando:  
```javascript
npm run dev
```
- [ ] Utilize a insomnia para testar as funções

## Como testar

### Listar contas bancárias
Listar todas as contas cadastradas, incluindo todas as suas transações pela sua URL: `/contas/:senha_banco` e os parâmetros informando a senha pela URL. Acessando a insomnia com `http://localhost:3000/contas?senha_banco=MICEL123Bank`. Se a senha estiver incorreta ou a conta informada não existir, uma mensagem de erro será retornada. 

### Erros de transação
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/55930b4b-c93a-4a1d-ba30-ac584bede40d)

### Transação bem sucedida
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/d120ca86-1c0b-4c20-a949-7195f035968c)


### Criar conta bancária

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
