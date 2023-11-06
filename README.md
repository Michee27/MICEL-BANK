
![imagem](https://github.com/Michee27/MICEL-BANK/assets/140012117/ff3e10e9-3883-47de-8d1f-6e6867e8574d)

   ## Description:

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

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/25b55e86-4ce8-4302-853b-d81683562f6b)


### Login to an account
Log in to a bank account with a user's information. Entering the email and password when accessing. The [https://micel-bank.onrender.com/lgin](https://micel-bank.onrender.com/login) endpoint is used to access a bank account, when logging into the account, a validation token will be generated that will be necessary to inform whenever any functionality of the respective account is accessed.

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/452c7e75-7ea7-4e8b-80ca-acace6cce4c1)


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

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/941142ed-2244-48b5-a488-7abc5c150928)

### Detail User
The `/user` endpoint has the functionality to detail a user, bringing all the relevant information to the respective bank account, as long as its validation token is passed in the header. Accessing insomnia with [https://micel-bank.onrender.com/user](https://micel-bank.onrender.com/user).

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/5e07de45-dd05-47b0-a9b4-9449014c5368)


### Delete account 

The /delete/account endpoint has the functionality to delete a user, with the condition that their balance is zero, informing their validation token in the header. Accessing insomnia with [https://micel-bank.onrender.com/delete/account](https://micel-bank.onrender.com/delete/account).

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/82a80e86-e873-477f-9a45-393226932bce)


### Depositar
#### `/transacoes/depositar`

The `/account/deposit` endpoint is used to make a deposit to the logged in account. Adding the deposit amount to the respective amount and recording this transaction. Accessing insomnia with [https://micel-bank.onrender.com/account/deposit](https://micel-bank.onrender.com/account/deposit).
The body must have an object with the deposit value in cents

       -   amount

** All fields are mandatory

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/363667c3-3437-4bf9-bb8c-26d944806a20)

### Withdraw

The `/account/withdraw` endpoint will make a withdrawal of an amount that must be informed in the body of the request. Accessing insomnia with [https://micel-bank.onrender.com/account/withdraw](https://micel-bank.onrender.com/account/withdraw).
The body must have an object with the value of the loot

    -   amount

** All fields are mandatory

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/380b1590-2c6c-48ec-b868-416321c682c7)

### Tranferir

The `/account/transfer` endpoint will allow the transfer of resources (money) from one bank account to another and record this transaction. Accessing insomnia with [https://micel-bank.onrender.com/account/transfer](https://micel-bank.onrender.com/account/transfer).
The body must have an object with the following properties (respecting these names):
    -   amount
    -   receiver_account_id

** All fields are mandatory

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/45b28f9a-0e59-480d-8b1c-c7cdb5040421)


### Balance

The `/account/balance` endpoint will return the balance of a bank account passed through its identification token header. Accessing insomnia with [https://micel-bank.onrender.com/account/balance](https://micel-bank.onrender.com/account/balance).

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/fc60627f-3be9-49e0-bac2-2c7474899f1a)

### Statement

The `/contas/statement` endpoint will list the transactions carried out from a specific account, informing the validation token in the header. Accessing insomnia with [https://micel-bank.onrender.com/account/statement](https://micel-bank.onrender.com/account/statement).

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/1ca5ff64-61f5-48e4-8c6c-3277799a6da3)

### Reactivate Account

It is possible to reactivate an account that was initially deleted or closed, by accessing the endpoint `/reactivate/account`, entering the registration email and the word "activate" in the body of the request. Accessing insomnia with [https://micel-bank.onrender.com/reactivate/account](https://micel-bank.onrender.com/reactivate/account).

### In case of successful transaction     :heavy_check_mark:

![image](https://github.com/Michee27/MICEL-BANK/assets/140012117/75ab62b8-714a-4913-9ec4-a8bca2f9d959)


### Video
[See endpoint testing video](https://clipchamp.com/watch/aI4rhTA8YiR)

## Ideias

This project is still under development for constant improvement purposes and we accept suggestions for improvement. Feel free to contact us

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/micheecelestin/)
[![whatsaap](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5547997768422)
