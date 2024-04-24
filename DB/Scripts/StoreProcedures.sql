USE OperaCE;
GO

CREATE PROCEDURE insertar_usuario (@cedula NUMERIC(10),@correo NVARCHAR(50),@contrasena NVARCHAR(20), @carnet NUMERIC(12), @p_nombre NVARCHAR(20), @s_nombre NVARCHAR(20), @p_apellido NVARCHAR(20), @s_apellido NVARCHAR(20), @f_nacim DATE)
AS
BEGIN
    INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
	VALUES (@cedula, @correo, @contrasena, @carnet, @p_nombre, @s_nombre, @p_apellido, @s_apellido, @f_nacim, 0, 3);
END
GO

CREATE PROCEDURE get_contrasena (@correo NVARCHAR(50))
AS
BEGIN
    SELECT contrasena, activo FROM Usuario WHERE correo = @correo;
END
GO

CREATE PROCEDURE aprobar_operador (@cedula NVARCHAR(50))
AS
BEGIN
    UPDATE Usuario SET activo = 1 WHERE cedula = @cedula;
END
GO

CREATE PROCEDURE rechazar_operador (@cedula NVARCHAR(50))
AS
BEGIN
    DELETE FROM Usuario WHERE cedula = @cedula
END
GO

/*
SELECT * FROM Usuario;
EXEC insertar_usuario 224560873, 'operador3@gmail.com', 'operador123', 2018445996, 'Marco', NULL, 'Brenes', 'Brenes', '1999-03-12';
EXEC aprobar_operador 224560873;
EXEC rechazar_operador 224560873;
*/