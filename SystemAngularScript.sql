 create database SystemAngular;
 use SystemAngular;
 create table Usuarios(
Id_usuario int not null auto_increment,
Nombre varchar (60) not null,
Usuario varchar(20) not null,
Contraseña varchar(20) not null,
primary key (Id_usuario)
);
CREATE TABLE Imagenes (
    Id_imagen INT NOT NULL AUTO_INCREMENT,
    Direccion VARCHAR(60) NOT NULL,
    Estado BOOLEAN NOT NULL,
    Id_usuario INT,
    PRIMARY KEY (Id_imagen),
    FOREIGN KEY (Id_usuario)
        REFERENCES Usuarios (Id_usuario)
);
CREATE TABLE Perfiles (
    Id_perfil INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(60) NOT NULL,
    Id_usuario INT,
    PRIMARY KEY (Id_perfil),
    FOREIGN KEY (Id_usuario)
        REFERENCES Usuarios (Id_usuario)
);

 