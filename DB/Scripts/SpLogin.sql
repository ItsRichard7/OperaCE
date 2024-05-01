/*-------------------------------------
|                                     |
|       Store Procedures Login        |
|                                     |
-------------------------------------*/

USE OperaCE;
GO

-- Obtiene la contraseña y si esta activo (Inicio de Sesión)
CREATE PROCEDURE verificar_inicio (@correo NVARCHAR(50))
AS
BEGIN
    SELECT contrasena, activo FROM Usuario WHERE correo = @correo;
END
GO

-- Registrar un nuevo operador en la Base de Datos  (Registro Operador)
CREATE PROCEDURE insertar_usuario (@cedula NUMERIC(10),@correo NVARCHAR(50),@contrasena NVARCHAR(32), @carnet NUMERIC(12), @p_nombre NVARCHAR(50), @s_nombre NVARCHAR(20), @p_apellido NVARCHAR(20), @s_apellido NVARCHAR(20), @f_nacim DATE, @activo BIT, @rol_id NUMERIC(1))
AS
BEGIN
    INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
	VALUES (@cedula, @correo, @contrasena, @carnet, @p_nombre, @s_nombre, @p_apellido, @s_apellido, @f_nacim, @activo, @rol_id);
END
GO

-- Verificar que el correo ingresado exista (Recuperar Contraseña)
CREATE PROCEDURE existe_correo (@correo NVARCHAR(50), @correoExiste BIT OUTPUT)
AS
BEGIN
    SET @correoExiste = 0;

    IF EXISTS (SELECT 1 FROM Usuario WHERE correo = @correo)
    BEGIN
        SET @correoExiste = 1;
    END
END
GO

-- Actualizar la contraseña del usuario (Recuperar Contraseña)
CREATE PROCEDURE actualizar_contrasena (@correo NVARCHAR(50), @contrasena NVARCHAR(32))
AS
BEGIN
    UPDATE Usuario SET contrasena = @contrasena WHERE correo = @correo;
END
GO

/* Eliminar todos los store procedure
DROP PROCEDURE insertar_usuario;
DROP PROCEDURE verificar_inicio;
DROP PROCEDURE existe_correo;
DROP PROCEDURE actualizar_contrasena;
*/

/* Pruebas para los store procedures
SELECT * from Sys.procedures; --Ignorar este comando
EXEC verificar_inicio 'admin1@gmail.com';
EXEC insertar_usuario 224560873, 'operador3@gmail.com', 'operador123', 2018445996, 'Marco', NULL, 'Brenes', 'Brenes', '1999-03-12', 3;

DECLARE @CorreoExiste BIT;
EXEC existe_correo 'admin1@gmail.com', @CorreoExiste OUTPUT;
SELECT @CorreoExiste AS 'CorreoExiste';

EXEC actualizar_contrasena 'admin1@gmail.com', 'admin123';
*/

select * from Usuario