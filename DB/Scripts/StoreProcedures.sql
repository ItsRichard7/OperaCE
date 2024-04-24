USE OperaCE;
GO

CREATE PROCEDURE insertar_usuario (@cedula NUMERIC(10),@correo NVARCHAR(50),@contrasena NVARCHAR(20), @carnet NUMERIC(12), @p_nombre NVARCHAR(20), @s_nombre NVARCHAR(20), @p_apellido NVARCHAR(20), @s_apellido NVARCHAR(20), @f_nacim DATE, @rol_id NUMERIC(1))
AS
BEGIN
    INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
	VALUES (@cedula, @correo, @contrasena, @carnet, @p_nombre, @s_nombre, @p_apellido, @s_apellido, @f_nacim, 0, @rol_id);
END
GO

CREATE PROCEDURE get_contrasena (@correo NVARCHAR(50))
AS
BEGIN
    SELECT contrasena FROM Usuario WHERE correo = @correo
END
GO

