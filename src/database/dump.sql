create database micel_bank;

create table usuario (
  id serial primary key,
  name text not null,
  cpf text not null unique,
  date_of_birth text not null,
  phone text not null,
  email text not null unique,
  encrypt_password text not null
);

create table saldo (
  id serial primary key,
  user_id integer references usuario(id),
  balance int
);

create table deposito (
  id serial primary key,
  amount int not null,
  account_id integer references usuario(id),
  transaction_date date default current_date
);

create table sacar (
  id serial primary key,
  amount int not null,
  account_id integer references usuario(id),
  transaction_date date default current_date
);

create table transferencia_enviada (
  id serial primary key,
  amount int not null,
  receiver_account_id integer references usuario(id),
  shipping_account_id int 
  transaction_date date default current_date
);

create table transferencia_recebida (
  id serial primary key,
  amount int not null,
  shipping_account_id integer references usuario(id),
  receiver_account_id int,
  transaction_date date default current_date
);

-- Codigo melhorado
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  date_of_birth DATE NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  encrypt_password TEXT NOT NULL,
  deleted_at TIMESTAMP
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
