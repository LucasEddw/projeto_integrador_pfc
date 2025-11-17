create database anima_inos_db;

use anima_inos_db;

create table usuarios
(
	id_usuario int primary key auto_increment,
	nome varchar(150) not null,
    email varchar(150) not null,
    senha varchar(50) not null,
    foto_de_perfil text
);

create table comentarios
(
	id_comentario int primary key auto_increment,
	data_do_comentario datetime not null,
    curtidas int,
    id_usuario int,
    foreign key (id_usuario) references usuarios(id_usuario)
);