create database micel_bank;

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  date_of_birth DATE NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  encrypt_password TEXT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE saldo (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES usuario(id),
  balance INT
);

CREATE TABLE deposito (
  id SERIAL PRIMARY KEY,
  amount INT NOT NULL,
  account_id INTEGER REFERENCES usuario(id),
  transaction_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE sacar (
  id SERIAL PRIMARY KEY,
  amount INT NOT NULL,
  account_id INTEGER REFERENCES usuario(id),
  transaction_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE transferencia_enviada (
  id SERIAL PRIMARY KEY,
  amount INT NOT NULL,
  receiver_account_id INTEGER,
  shipping_account_id INTEGER REFERENCES usuario(id),
  transaction_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE transferencia_recebida (
  id SERIAL PRIMARY KEY,
  amount INT NOT NULL,
  shipping_account_id INTEGER,
  receiver_account_id INTEGER REFERENCES usuario(id),
  transaction_date DATE DEFAULT CURRENT_DATE
);
