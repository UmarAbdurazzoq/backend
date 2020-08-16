-- SQL langugae

create database backend_Y;

create table users (
	user_id serial not null primary key,
	username varchar(32),
	password varchar(60),
	name varchar (48)
);

insert into users (username, password, name) values ('muhammad', 'muhammad1', 'Muhammad Najimov');