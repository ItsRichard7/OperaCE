/*-------------------------------------
|                                     |
|       Store Procedures Admin        |
|                                     |
-------------------------------------*/

USE OperaCE;
GO

-- Obtener Lista de los Laboratorios y Facilidades (Vista Admin)
CREATE PROCEDURE obt_laboratorios
AS
BEGIN
    SELECT A.nombre, A.capacidad, A.computadoras, STRING_AGG(B.descripcion, '. ') AS facilidades 
	FROM Laboratorio as A JOIN Lab_Facilidad as B ON A.nombre = B.lab_nombre 
	GROUP BY A.nombre, A.capacidad, A.computadoras;
END
GO

-- Obtener Lista de los Laboratorios y Facilidades (Vista Admin)
CREATE PROCEDURE editar_laboratorio (@nombre VARCHAR(6), @computadoras NUMERIC(2), @capacidad NUMERIC(2))
AS
BEGIN
    UPDATE Laboratorio SET capacidad = @capacidad, computadoras = @computadoras WHERE nombre = @nombre;
END
GO

-- Eliminar facilidades de un laboratorio en específico
CREATE PROCEDURE eliminar_facilidades (@lab_nombre VARCHAR(6))
AS
BEGIN
    DELETE FROM Lab_Facilidad WHERE lab_nombre = @lab_nombre;
END
GO

-- Insertar facilidad para un laboratorio
CREATE PROCEDURE insertar_facilidad (@lab_nombre VARCHAR(6), @descripcion NVARCHAR(50))
AS
BEGIN
    INSERT INTO Lab_Facilidad(lab_nombre, descripcion) VALUES (@lab_nombre, @descripcion);
END
GO

-- Obtener Lista de Operadores que no han sido aprobados
CREATE PROCEDURE obt_operadores_no_aprob
AS
BEGIN
    SELECT cedula, correo, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim FROM Usuario WHERE activo = 0;
END
GO

-- Aprobar un operador (Marcarlo como activo)
CREATE PROCEDURE aprobar_operador (@cedula NVARCHAR(50))
AS
BEGIN
    UPDATE Usuario SET activo = 1 WHERE cedula = @cedula;
END
GO

-- Rechazar un operador (Elimina de Registros)
CREATE PROCEDURE rechazar_operador (@cedula NVARCHAR(50))
AS
BEGIN
    DELETE FROM Usuario WHERE cedula = @cedula
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
*/

/* Pruebas para los store procedures
SELECT * from Sys.procedures; --Ignorar este comando
EXEC obt_laboratorios;
EXEC aprobar_operador 224560873;
EXEC rechazar_operador 224560873;
EXEC obt_operadores_no_aprob;
EXEC editar_laboratorio 'F2-06', 2, 3;
EXEC eliminar_facilidades 'F2-06';
EXEC insertar_facilidad 'F2-06', 'Se puede coger... depresión';
*/

select * from Laboratorio;