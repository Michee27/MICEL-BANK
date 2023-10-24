create database micel_bank;

create table usuario (
  id serial primary key,
  name text not null,
  cpf text not null unique,
  date_of_birth text not null,
  phone text not null,
  email text not null unique,
  password text not null
);
