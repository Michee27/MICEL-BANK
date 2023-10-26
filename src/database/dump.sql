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

create table transferencia (
  id serial primary key,
  type text not null,
  amount int not null,
  shipping_account_id integer references usuario(id),
  receiver_account_id integer references usuario(id)
);
