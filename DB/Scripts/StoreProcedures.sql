USE OperaCE;
GO

-- Obtener Tabla de Usuarios
CREATE PROCEDURE obt_tabla_usuario
AS
BEGIN
    SELECT * FROM Usuario;
END
GO

-- Obtener Tabla de Laboratorios
CREATE PROCEDURE obt_tabla_laboratorio
AS
BEGIN
    SELECT * FROM Laboratorio;
END
GO

-- Obtener Tabla de Facilidades de los Laboratorios
CREATE PROCEDURE obt_tabla_lab_facilidad
AS
BEGIN
    SELECT * FROM Lab_Facilidad;
END
GO

-- Obtener Tabla de Activos
CREATE PROCEDURE obt_tabla_activo
AS
BEGIN
    SELECT * FROM Activo;
END
GO

-- Obtener Tabla de Usuarios
CREATE PROCEDURE obt_tabla_soli_lab
AS
BEGIN
    SELECT * FROM Soli_Lab;
END
GO

-- Obtener Tabla de Usuarios
CREATE PROCEDURE obt_tabla_soli_act
AS
BEGIN
    SELECT * FROM Soli_Act;
END
GO

-- Registrar un nuevo operador en la Base de Datos 
CREATE PROCEDURE insertar_usuario (@cedula NUMERIC(10),@correo NVARCHAR(50),@contrasena NVARCHAR(20), @carnet NUMERIC(12), @p_nombre NVARCHAR(20), @s_nombre NVARCHAR(20), @p_apellido NVARCHAR(20), @s_apellido NVARCHAR(20), @f_nacim DATE)
AS
BEGIN
    INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
	VALUES (@cedula, @correo, @contrasena, @carnet, @p_nombre, @s_nombre, @p_apellido, @s_apellido, @f_nacim, 0, 3);
END
GO

-- Obtiene la contraseña y si esta activo para verificar el inicio de sesión
CREATE PROCEDURE verificar_inicio (@correo NVARCHAR(50))
AS
BEGIN
    SELECT contrasena, activo FROM Usuario WHERE correo = @correo;
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

-- Rechazar un operador (Elimina de Registros)
CREATE PROCEDURE obt_laboratorios
AS
BEGIN
    SELECT * FROM Laboratorio;
END
GO

/* Eliminar todos los store procedure
DROP PROCEDURE obt_tabla_usuario;
DROP PROCEDURE obt_tabla_laboratorio;
DROP PROCEDURE obt_tabla_lab_facilidad;
DROP PROCEDURE obt_tabla_activo; 
DROP PROCEDURE obt_tabla_soli_lab;
DROP PROCEDURE obt_tabla_soli_act;
DROP PROCEDURE insertar_usuario;
DROP PROCEDURE verificar_inicio;
DROP PROCEDURE obt_operadores_no_aprob;
DROP PROCEDURE aprobar_operador; 
DROP PROCEDURE rechazar_operador; 
DROP PROCEDURE obt_laboratorios; 
*/

/* Pruebas para los store procedures
SELECT * from Sys.procedures; 
SELECT * FROM Rol;
SELECT * FROM Usuario;
EXEC insertar_usuario 224560873, 'operador3@gmail.com', 'operador123', 2018445996, 'Marco', NULL, 'Brenes', 'Brenes', '1999-03-12';
EXEC aprobar_operador 224560873;
EXEC rechazar_operador 224560873;
EXEC obt_operadores_no_aprob;
EXEC obt_laboratorios;
*/