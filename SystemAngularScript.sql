 create database SystemAngular;
 use SystemAngular;
CREATE TABLE Perfiles (
    Id_perfil INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(60) NOT NULL,
    Estado BOOLEAN NOT NULL,
    PRIMARY KEY (Id_perfil)
);
CREATE TABLE Usuarios (
    Id_usuario INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(60) NOT NULL,
    Usuario VARCHAR(20) NOT NULL,
    Contraseña VARCHAR(20) NOT NULL,
    Estado BOOLEAN NOT NULL,
    Id_perfil INT,
    PRIMARY KEY (Id_usuario),
    FOREIGN KEY (Id_perfil)
        REFERENCES Perfiles (Id_perfil)
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

CREATE TABLE menus (
    Cd_opcion INT AUTO_INCREMENT NOT NULL,
    Opcion VARCHAR(20) NOT NULL,
    Estado BOOLEAN NOT NULL,
    Padre INT,
    PRIMARY KEY (Cd_opcion)
);
INSERT INTO menus
values (1,"Menu Imagenes",1,null);
INSERT INTO menus
values (2,"Administracion de Imagenes",1,1);
INSERT INTO menus
values (4,"Administracion",1,null);
INSERT INTO menus
values (5,"Administracion de Usuarios",1,4);
INSERT INTO menus
values (6,"Administracion de Opciones",1,4);
INSERT INTO Perfiles
values (1,"Administrador",true);
INSERT INTO Perfiles
values (2,"Usuario",true);
INSERT INTO Usuarios
values (1,"Enrique Erazo","eerazo","Password01",true,1); 
INSERT INTO Usuarios
values (2,"Mishell Rosero","mrosero","Password01",true,2); 
INSERT INTO Usuarios
values (3,"Jonathan Juma","jjuma","Password01",true,2); 
INSERT INTO Imagenes
values (1,"homero.jpg",true,1);
INSERT INTO Imagenes
values (2,"perro.jpg",true,2);
INSERT INTO Imagenes
values (3,"descarga.jpg",true,1);
INSERT INTO Imagenes
values (4,"descarga(1).jpg",true,2);
 