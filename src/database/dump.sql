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

