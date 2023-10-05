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

Criar uma conta bancária com informações de um usuário. O endpoint `/contas` serve para criar uma conta bancária, gerando um número único para identificação da conta (número da conta) e iniciando sempre com saldo zero. Acessando a insomnia com `http://localhost:3000/contas`.
Se os dados do CPF e do e-mail já estiverem sido cadastrados em outra conta, uma mensagem de erro será retornada.

O corpo (body) deverá receber um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha
** Todos os campos são obrigatório!!

### Em caso de transação bem sucedida
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/5cddea00-9926-4c8f-9ef1-bb309807a077)

### Em caso de duplicação de usuário
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/66168312-0595-492b-916b-d630e2f7dab3)


### Atualizar usuário de uma conta

Atualizar uma conta bancária com informações de um usuário. O endpoint `/contas/:numeroConta/usuario` serve para atualizar uma conta bancária, usando o mesmo número da identificação da conta (número da conta) e iniciando sempre com saldo zero. Acessando a insomnia com `http://localhost:3000/contas/:numeroConta/usuario`.
Se os dados do CPF e do e-mail já estiverem sido cadastrados em outra conta, uma mensagem de erro será retornada.

O corpo (body) deverá receber um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

### Em caso de transação bem sucedida
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/67ad60e3-3eca-4a83-938e-81e798251c83)

### Em caso de informar um usuário inexistente
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/a678e314-6fae-473d-a4b1-8b38b3315b6f)



### Excluir Conta
####  

O endpoint `/contas/:numeroConta` tem por funcionalidade excluir uma conta bancária, desde que o número de conta informado pela URL seja existente e também a conta em questão esteja sem saldo. Acessando a insomnia com `http://localhost:3000//contas/:numeroConta`.

### Em caso de transação bem sucedida
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/83f805e8-0938-40f8-a030-e317e231d9dd)


### Em caso de informar um usuário inexistente
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/9a986c8c-4ea6-4f53-b18f-db67f260898f)


### Depositar
#### `/transacoes/depositar`

O endpoint `/transacoes/depositar` serve para realizar um depósito em uma determinada conta, que tem que ser informado pelo corpo (body), somando o valor do depósito ao saldo de uma conta válida e registrar essa transação.
O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

** Todos os campos são obrigatórios

### Transação bem sucedida
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/3cdafaa3-fd4e-4baf-90c0-e2a809e2393c)


### Em caso de informar um valor inválido
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/6329dd91-218a-428d-823a-519d0bb0140a)


### Sacar
#### `/transacoes/sacar`

O endpoint `/transacoes/sacar` fará a realização de um saque de um valor que deve ser informado pelo corpo (body) da requisção, junto com um valor válido e sua respectiva senha e registrar essa transação.
O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

** Todos os campos são obrigatórios

### Em caso de trancação bem sucedida
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/913a519a-2ac8-4c0a-b202-a27b47abe47d)

### Em caso de informar uma senha diferente com o cadastrado da conta eem questão
![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/5d8229b8-1df7-4b04-80e9-5b293c0e280e)


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
