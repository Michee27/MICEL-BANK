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

create table transacao (
  id serial primary key,
  descricao text,
  tipo_transacao text not null,
  deposito int,
  usuario_id integer references usuario(id),
  data_transacao date default datenow()
);
