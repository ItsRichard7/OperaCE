-- Script de Creación de la Base de Datos
CREATE DATABASE OperaCE;
GO
USE OperaCE; 
GO
CREATE TABLE Usuario(
    cedula NUMERIC(10) NOT NULL,
    correo NVARCHAR(50) NOT NULL,
	contrasena VARCHAR(32) NOT NULL,
    carnet NUMERIC(12),
    p_nombre NVARCHAR(50) NOT NULL,
    s_nombre NVARCHAR(20),
    p_apellido NVARCHAR(20) NOT NULL,
    s_apellido NVARCHAR(20),
    f_nacim DATE NOT NULL,
    activo BIT NOT NULL,
    rol_id NUMERIC(1) NOT NULL,
    PRIMARY KEY(cedula),
	UNIQUE(correo)
);

CREATE TABLE Rol(
    id NUMERIC(1) NOT NULL,
    descripcion NCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Reg_Horas(
    fecha DATE NOT NULL,
    hora_entr TIME NOT NULL,
    hora_sal TIME NOT NULL,
	horas_reg NUMERIC(2,1) NOT NULL,
    user_ced NUMERIC(10) NOT NULL
);

CREATE TABLE Activo(
    placa NVARCHAR(20) NOT NULL,
    tipo NVARCHAR(50) NOT NULL,
    marca NVARCHAR(50) NOT NULL,
    f_compra DATE,
    prestado BIT NOT NULL,
    aprob_ced NUMERIC(10),
    PRIMARY KEY(placa)
);

CREATE TABLE Laboratorio(
    nombre NCHAR(6) NOT NULL,
    computadoras NUMERIC(2) NOT NULL,
    capacidad NUMERIC(2) NOT NULL,
    PRIMARY KEY(nombre)
);

CREATE TABLE Lab_Facilidad(
    descripcion NVARCHAR(50) NOT NULL,
    lab_nombre NCHAR(6) NOT NULL,
    PRIMARY KEY(lab_nombre, descripcion),
    CONSTRAINT FK_Lab_Facilidad FOREIGN KEY (lab_nombre) REFERENCES Laboratorio(nombre)
);

CREATE TABLE Soli_Lab(
    correo_soli NVARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    carnet NUMERIC(12),
    p_nombre NVARCHAR(50) NOT NULL,
    s_nombre NVARCHAR(20),
    p_apellido NVARCHAR(20) NOT NULL,
    s_apellido NVARCHAR(20),
    cant_horas DECIMAL(2,1) NOT NULL,
    lab_nombre NCHAR(6) NOT NULL,
    user_ced NUMERIC(10) NOT NULL,
    PRIMARY KEY(correo_soli, fecha, hora),
    CONSTRAINT FK1_Soli_Lab FOREIGN KEY (lab_nombre) REFERENCES Laboratorio(nombre),
    CONSTRAINT FK2_Soli_Lab FOREIGN KEY (user_ced) REFERENCES Usuario(cedula)
);

CREATE TABLE Soli_Act(
    correo_soli NVARCHAR(50) NOT NULL,
    fecha_soli DATE NOT NULL,
    hora_soli TIME NOT NULL,
    p_nombre NVARCHAR(50) NOT NULL,
    s_nombre NVARCHAR(20),
    p_apellido NVARCHAR(20) NOT NULL,
    s_apellido NVARCHAR(20),
	aprobado BIT NOT NULL,
	entregado BIT NOT NULL,
    fecha_dev DATE,
    hora_dev TIME,
    devuelto BIT NOT NULL,
    averia NVARCHAR(200),
    act_placa NVARCHAR(20) NOT NULL,
    user_ced NUMERIC(10) NOT NULL,
    PRIMARY KEY(correo_soli, fecha_soli, hora_soli),
    CONSTRAINT FK1_Soli_Act FOREIGN KEY (act_placa) REFERENCES Activo(placa),
    CONSTRAINT FK2_Soli_Act FOREIGN KEY (user_ced) REFERENCES Usuario(cedula)
);

ALTER TABLE Usuario ADD CONSTRAINT FK_Usuario FOREIGN KEY (rol_id) REFERENCES Rol(id);

ALTER TABLE Reg_Horas ADD CONSTRAINT FK_Reg_Horas FOREIGN KEY (user_ced) REFERENCES Usuario(cedula);

ALTER TABLE Activo ADD CONSTRAINT FK_Activo FOREIGN KEY (aprob_ced) REFERENCES Usuario(cedula);
