/*-------------------------------------
|                                     |
|       Store Procedures Admin        |
|                                     |
-------------------------------------*/

USE OperaCE;
GO

-- Obtener Lista de los Laboratorios y Facilidades (Vista Admin - Labs)
CREATE PROCEDURE obt_laboratorios
AS
BEGIN
    SELECT A.nombre, A.capacidad, A.computadoras, STRING_AGG(B.descripcion, '. ') AS facilidades 
	FROM Laboratorio as A JOIN Lab_Facilidad as B ON A.nombre = B.lab_nombre 
	GROUP BY A.nombre, A.capacidad, A.computadoras;
END
GO

-- Obtener Lista de los Laboratorios y Facilidades (Vista Admin - Labs)
CREATE PROCEDURE editar_laboratorio (@nombre VARCHAR(6), @computadoras NUMERIC(2), @capacidad NUMERIC(2))
AS
BEGIN
    UPDATE Laboratorio SET capacidad = @capacidad, computadoras = @computadoras WHERE nombre = @nombre;
END
GO

-- Agregar un nuevo laboratorio (Vista Admin - Labs)
CREATE PROCEDURE insertar_lab (@nombre VARCHAR(6), @computadoras NUMERIC(2), @capacidad NUMERIC(2))
AS
BEGIN
	INSERT INTO Laboratorio(nombre, computadoras, capacidad)
	VALUES(@nombre, @computadoras, @capacidad);
END
GO

-- Eliminar un laboratorio ya existente (Vista Admin - Labs)
CREATE PROCEDURE eliminar_lab (@nombre VARCHAR(6))
AS
BEGIN
	DELETE FROM Laboratorio WHERE nombre = @nombre;
END
GO

-- Eliminar facilidades de un laboratorio en espec�fico (Vista Admin - Labs)
CREATE PROCEDURE eliminar_facilidades (@lab_nombre VARCHAR(6))
AS
BEGIN
    DELETE FROM Lab_Facilidad WHERE lab_nombre = @lab_nombre;
END
GO

-- Insertar facilidad para un laboratorio (Vista Admin - Labs)
CREATE PROCEDURE insertar_facilidad (@lab_nombre VARCHAR(6), @descripcion NVARCHAR(50))
AS
BEGIN
    INSERT INTO Lab_Facilidad(lab_nombre, descripcion) VALUES (@lab_nombre, @descripcion);
END
GO

-- Obtener Lista de Operadores que no han sido aprobados (Aprobaci�n de Operadores)
CREATE PROCEDURE obt_operadores_no_aprob
AS
BEGIN
    SELECT cedula, correo, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim FROM Usuario WHERE activo = 0;
END
GO

-- Aprobar un operador (Marcarlo como activo) (Aprobaci�n de Operadores) 
CREATE PROCEDURE aprobar_operador (@cedula NVARCHAR(50))
AS
BEGIN
    UPDATE Usuario SET activo = 1 WHERE cedula = @cedula;
END
GO

-- Rechazar un operador (Elimina de Registros) (Aprobaci�n de Operadores)
CREATE PROCEDURE rechazar_operador (@cedula NVARCHAR(50))
AS
BEGIN
    DELETE FROM Usuario WHERE cedula = @cedula
END
GO

-- Obtener la lista de activos de CE (Vista de Activos)
CREATE PROCEDURE obt_activos
AS
BEGIN
	SELECT placa, tipo, marca, f_compra
	FROM Activo
END
GO

-- Editar activo (Vista de Activos)
CREATE PROCEDURE editar_activo (@placa NVARCHAR(20), @tipo NVARCHAR(50), @marca NVARCHAR(50), @f_compra DATE, @aprob_ced NUMERIC(10))
AS
BEGIN
	UPDATE Activo SET placa = @placa, tipo = @tipo, marca = @marca, f_compra = @f_compra, aprob_ced = @aprob_ced WHERE placa = @placa;
END
GO

-- Agregar un nuevo activo (Vista de Activos)
CREATE PROCEDURE insertar_activo (@placa NVARCHAR(20), @tipo NVARCHAR(50), @marca NVARCHAR(50), @f_compra DATE, @aprob_ced NUMERIC(10))
AS
BEGIN
	INSERT INTO Activo(placa, tipo, marca, f_compra, aprob_ced)
	VALUES(@placa, @tipo, @marca, @f_compra, @aprob_ced);
END
GO

-- Eliminar un activo ya existente (Vista de Activos)
CREATE PROCEDURE eliminar_activo (@placa NVARCHAR(20))
AS
BEGIN
	DELETE FROM Activo WHERE placa = @placa;
END
GO

-- Obtener la lista de profesores (Vista de Profesores)
CREATE PROCEDURE obt_profesores
AS
BEGIN
	SELECT cedula, p_nombre, s_nombre, p_apellido, s_apellido, 
	DATEDIFF(YEAR, f_nacim, GETDATE()) - 
            CASE 
                WHEN DATEADD(YEAR, DATEDIFF(YEAR, f_nacim, GETDATE()), f_nacim) > GETDATE() THEN 1 
                ELSE 0 
            END AS edad,
			f_nacim, correo
	FROM Usuario
	WHERE rol_id = 2;
END
GO

-- Editar profesor (Vista de Profesores)
CREATE PROCEDURE editar_profesor (@cedula NUMERIC(10), @correo NVARCHAR(50), @p_nombre NVARCHAR(20), @s_nombre NVARCHAR(20), @p_apellido NVARCHAR(20), @s_apellido NVARCHAR(20), @f_nacim DATE)
AS
BEGIN
	UPDATE Usuario SET correo = @correo, p_nombre = @p_nombre, s_nombre = @s_nombre, p_apellido = @p_apellido, s_apellido = @s_apellido, f_nacim = @f_nacim WHERE cedula = @cedula;
END
GO

-- Eliminar un profesor (Vista de Profesores)
CREATE PROCEDURE borrar_profesor (@cedula NUMERIC(10))
AS
BEGIN
	DELETE FROM USUARIO WHERE cedula = @cedula;
END
GO

-- Obtener todos los operadores y horas realizadas (Registros de Operadores)
CREATE PROCEDURE mostrar_operadores
AS
BEGIN
	SELECT A.carnet, A.p_nombre, A.s_nombre, A.p_apellido, A.s_apellido, SUM(B.horas_reg) AS horas_totales 
	FROM Usuario AS A JOIN Reg_Horas AS B ON A.cedula = B.user_ced
	WHERE A.rol_id = 3 AND A.activo = 1
	GROUP BY A.carnet, A.p_nombre, A.s_nombre, A.p_apellido, A.s_apellido;
END
GO

-- Obtener los registros de horas de un operador espec�fico (Registros de Operadores)
CREATE PROCEDURE obt_reg_horas_op (@carnet NUMERIC(12))
AS
BEGIN
	SELECT B.fecha, B.hora_entr, B.hora_sal, B.horas_reg
	FROM Usuario AS A JOIN Reg_Horas AS B ON A.cedula = B.user_ced
	WHERE A.carnet = @carnet;
END
GO

/* Eliminar todos los store procedure
DROP PROCEDURE obt_laboratorios;
DROP PROCEDURE obt_operadores_no_aprob;
DROP PROCEDURE aprobar_operador; 
DROP PROCEDURE rechazar_operador; 
DROP PROCEDURE editar_laboratorio; 
DROP PROCEDURE eliminar_facilidades 
DROP PROCEDURE insertar_facilidad; 
DROP PROCEDURE obt_activos;
DROP PROCEDURE editar_activo;
DROP PROCEDURE obt_profesores;
DROP PROCEDURE editar_profesor;
DROP PROCEDURE borrar_profesor;
DROP PROCEDURE mostrar_operadores;
DROP PROCEDURE obt_reg_horas_op;
*/

/* Pruebas para los store procedures
SELECT * from Sys.procedures; --Ignorar este comando
EXEC obt_laboratorios;
EXEC aprobar_operador 224560873;
EXEC rechazar_operador 224560873;
EXEC obt_operadores_no_aprob;
EXEC editar_laboratorio 'F2-06', 2, 3;
EXEC eliminar_facilidades 'F2-06';
EXEC insertar_facilidad 'F2-06', 'Se puede coger... depresi�n';
EXEC obt_activos;
EXEC editar_activo 'PRJ002', 'Proyector', 'Samsung', '2023-07-20';
EXEC obt_profesores;
EXEC editar_profesor 4567890123, 'profe2@gmail.com', 'Ana', NULL, 'Mart�nez', 'L�pez', '1995-03-25';
EXEC borrar_profesor 4567890123;
EXEC mostrar_operadores;
EXEC obt_reg_horas_op 2022457896;
*/