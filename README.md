
![imagem](https://github.com/Michee27/MICEL-BANK/assets/140012117/ff3e10e9-3883-47de-8d1f-6e6867e8574d)

   ## Descrição:

The bank is a RESTful API and its main objective is to offer our customers a safe, easy-to-use, and dynamic environment where they can control their finances from creating the bank to issuing activity statements. It is developed in JavaScript language.

   ## Functionalities:

The first 3 API endpoints are to initiate the customer's steps

- Welcome page
- Create bank account
- Log into account

When logging into an account with its respective password, a validation token will be generated, and only through this token, informing through the header that it will be possible to access an account

- Update bank account user details
- Delete a bank account
- Deposit into a bank account
- Withdraw from a bank account
- Transfer amounts between bank accounts
- Check bank account balance
- Issue bank statement
- Reactivate account

## Project status

This project is currently in active development. I'm constantly working on it to make it even better.
The entire BackEnd scope was developed, the FrontEnd part is currently being developed to communicate with the Back.


## Source code

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/ef0e28d2-4d0c-45da-8493-13a42a404d35)



`index.js`: The Express server entry point.

`roteador.js`: Defines the API routes and their controllers.

`middlers`: Contains file menus for validating user data and performing user authentication.
   
`controllers`: where the main endpoints are located and perform tasks coming from my routes
   
 `config`: Folder reserved for configuring my variables, my connection to the database and storing my secret password.
 
`database`: storage of my database creation code and its tables.



## Technologies used

### JavaScript:
High-level programming language widely used for web development. It is known for being a scripting language, which means you can write JavaScript code directly on web pages to make them interactive and dynamic.

### Node.js:
Open source runtime environment based on Google Chrome's V8 engine. It allows developers to use JavaScript to create server-side applications, which is a departure from the traditional use of client-side JavaScript, which runs in browsers.

## Dependencies:

### date-fns: 
A JavaScript library used to work with dates and times. It provides useful functions for analyzing, manipulating and formatting dates. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install date-fns`

### express.js: 
The "Express.js" web framework, used to create web applications and APIs in Node.js. It is widely used to create web servers and simplify web development in Node.js. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install express`

### nodemon: 
A development tool that monitors changes to files in your project directory and automatically restarts the server whenever there is a change. It is often used for Node.js development to save time on server restarts during development. Dependencies are libraries or packages required for your application to function, while devDependencies are packages used only during development, as in the case of nodemon, which helps keep the server updated during development. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install -D nodemon`.
After cloning this repository, you can install all dependencies and devDependencies using the command: npm install

### bcrypt:
A library used for securely hashing passwords. It's a common choice in Node.js applications for securely storing user passwords by hashing and salting them. Unlike nodemon, which is used during development, bcrypt is generally a dependency needed for the application to function securely. Therefore, it is typically added as a regular dependency rather than a development dependency. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install bcrypt`

### dotenv:
A Node.js library used for managing environment variables in your application. It's particularly useful for storing configuration details, such as API keys, database credentials, or any sensitive information, outside of your codebase. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install dotenv`

### jsonwebtoken:
A library used for creating and verifying JSON Web Tokens (JWT) in Node.js applications. JWTs are commonly employed for user authentication and data exchange between parties in a secure and compact manner. Similar to bcrypt and dotenv, jsonwebtoken is a crucial component for security and user authentication in an application and is typically added as a regular dependency, not a development dependency. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install jsonwebtoken`

### knex:
A SQL query builder for Node.js which is used to interact with relational databases. It allows developers to write database queries using JavaScript and provides a clean interface to construct SQL queries. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install knex`

### pg: 
The PostgreSQL client for Node.js. It is the official PostgreSQL client for the Node.js ecosystem, providing an interface for Node.js applications to communicate with a PostgreSQL database. Open the terminal or command prompt, navigate to your project directory and run the following command: `npm install pg`

## Installation

You can contribute to this project by cloning it on your machine and carrying out tests
To use this project, follow these steps:

1. Clone the repository to your local machine using the following command:

- [ ] Fork this repository to your GitHub
- [ ] Clone the project on your machine
- [ ] Once cloned on your machine, install the dependencies mentioned above and start the server using:
```javascript
npm run dev
```
- [ ] Use insomnia to test functions

## How to test

To test this project, you will need to use software to generate HTTP requests. I used insomnia to carry out these tests.
This project was deployed by render, once you have the testing software installed, you can access the link [https://micel-bank.onrender.com/](https://micel-bank.onrender.com/)
 to test the endpoints

### Welcome page
Access the bank's home page via their URL: `/`. Accessing insomnia with [https://micel-bank.onrender.com/](https://micel-bank.onrender.com/), where it will be possible to log in to an account or create an account

### Successful transaction   :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/c1243235-cb1a-4581-b754-b52cf74ec77e)


### Create bank account

Create a bank account with a user's information. The [https://micel-bank.onrender.com/signup](https://micel-bank.onrender.com/signup) endpoint is used to create a bank account, generating a unique number to identify the account (account number) and always starting with a zero balance.
If the CPF and email data have already been registered in another account, an error message will be returned.

The body must receive an object with the following properties (respecting these names):

    -   name
    -   CPF
    -   date_of_birth
    -   phone
    -   email
    -   password
** All fields are mandatory!!

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/5c4e1418-e5d5-4293-9140-de4c4714f3e6)



### Login to an account
Log in to a bank account with a user's information. Entering the email and password when accessing. The [https://micel-bank.onrender.com/lgin](https://micel-bank.onrender.com/login) endpoint is used to access a bank account, when logging into the account, a validation token will be generated that will be necessary to inform whenever any functionality of the respective account is accessed.

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/ae1efc59-2e0c-4ab9-bc7d-9eb96841bfcc)

## ATTENTION: *From this endpoint ALL next endpoints will need to provide the token to proceed*

### Update an account user

Update a bank account with a user's information. The endpoint [https://micel-bank.onrender.com/account/user](https://micel-bank.onrender.com/account/user) is used to update a bank account, stating in the header the access token as a bearer token. Insomnia will allow access to user data that can be updated
If the CPF and email data have already been registered in another account, an error message will be returned.

The body must receive an object with the following properties (respecting these names):

    -   name
    -   CPF
    -   date_of_birth
    -   phone
    -   email
    -   password
** All fields are mandatory!!

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/7c68af83-22f2-4f53-b65d-712890a190cd)

### Excluir Conta
####  

O endpoint `/contas/:numeroConta` tem por funcionalidade excluir uma conta bancária, desde que o número de conta informado pela URL seja existente e também a conta em questão esteja sem saldo. Acessando a insomnia com `http://localhost:3000//contas/:numeroConta`.

### Em caso de transação bem sucedida     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/83f805e8-0938-40f8-a030-e317e231d9dd)


### Em caso de informar um usuário inexistente     :x:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/9a986c8c-4ea6-4f53-b18f-db67f260898f)


### Depositar
#### `/transacoes/depositar`

O endpoint `/transacoes/depositar` serve para realizar um depósito em uma determinada conta, que tem que ser informado pelo corpo (body), somando o valor do depósito ao saldo de uma conta válida e registrar essa transação. Acessando a insomnia com `http://localhost:3000/transacoes/depositar`.
O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

** Todos os campos são obrigatórios

### Transação bem sucedida     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/3cdafaa3-fd4e-4baf-90c0-e2a809e2393c)


### Em caso de informar um valor inválido     :x:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/6329dd91-218a-428d-823a-519d0bb0140a)


### Sacar

O endpoint `/transacoes/sacar` fará a realização de um saque de um valor que deve ser informado pelo corpo (body) da requisção, junto com um valor válido e sua respectiva senha e registrar essa transação.  Acessando a insomnia com `http://localhost:3000/transacoes/sacar`.
O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

** Todos os campos são obrigatórios

### Em caso de trancação bem sucedida     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/913a519a-2ac8-4c0a-b202-a27b47abe47d)

### Em caso de informar uma senha diferente com o cadastrado da conta eem questão     :x:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/5d8229b8-1df7-4b04-80e9-5b293c0e280e)


### Tranferir

O endpoint `/transacoes/transferir` irá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação. Acessando a insomnia com `http://localhost:3000/transacoes/trasnferir`.
O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

** Todos os campos são obrigatórios

### Em caso de trancação bem sucedida     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/903cc066-a1cf-4702-a751-4118586ddad4)


### Informando a senha da conta de origem errado     :x:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/bb7a7b9f-ce50-4157-a127-00619f1bc1cd)


### Saldo

O endpoint `/contas/saldo` irá retornar o saldo de uma conta bancária passado como argumento no url número da conta e senha da respectica conta. Acessando a insomnia com `http://localhost:3000/contas/saldo?numero_conta=1&senha=12345`.

### Em caso de trancação bem sucedida     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/ca0862d5-2b12-4912-8263-2711c385190b)

### Informando a conta errada     :x:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/6592b9af-77dd-4f1c-82bd-b24a97815ea9)


### Extrato
#### 

O endpoint `/contas/extrato` irá listar as transações realizadas de uma conta específica, passado como argumento no url número da conta e senha da respectica conta. Acessando a insomnia com `http://localhost:3000/contas/extrato?numero_conta=1&senha=12345`.

### Em caso de trancação bem sucedida     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/4e7c3912-f6f0-4d33-9988-a1edca22b66d)

### Informando a senha errada     :x:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/c95e3c33-d674-4dc1-aee0-8c60ef4d47ee)


## Ideias

Este projeto ainda está em desenvolvimento para fins de melhoria constante e aceitamos sugestões de melhoria. Fique a vontade para entrar em contato conosco

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/micheecelestin/)
[![whatsaap](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5547997768422)
