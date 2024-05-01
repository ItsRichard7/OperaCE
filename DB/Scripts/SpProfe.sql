/*-------------------------------------
|                                     |
|     Store Procedures Profesor       |
|                                     |
-------------------------------------*/

USE OperaCE;
GO

-- Obtener la lista de Activos que no han sido aprobados por un profesor (Vista Aprobar Prestamos)
CREATE PROCEDURE obt_activos_no_aprobados (@cedula NUMERIC(10))
AS
BEGIN
	SELECT A.act_placa, A.p_nombre, A.s_nombre, A.p_apellido, A.s_apellido, A.fecha_soli, A.hora_soli, A.correo_soli
	FROM Soli_Act as A JOIN Activo as B ON A.act_placa = B.placa
	WHERE A.aprobado = 0 AND B.aprob_ced = @cedula;
END
GO

-- Actualizar un prestamo como aprobado (Vista Aprobar Prestamos)
CREATE PROCEDURE aprobar_prestamo_activo (@correo_soli NVARCHAR(50), @fecha_soli DATE, @hora_soli TIME)
AS
BEGIN
	UPDATE Soli_Act SET aprobado = 1 WHERE correo_soli = @correo_soli AND fecha_soli = @fecha_soli AND hora_soli = @hora_soli;
END
GO

-- Rechazar un prestamo de activo y eliminarlo (Vista Aprobar Prestamos)
CREATE PROCEDURE rechazar_prestamo_activo (@correo_soli NVARCHAR(50), @fecha_soli DATE, @hora_soli TIME)
AS
BEGIN
	DELETE FROM Soli_Act WHERE correo_soli = @correo_soli AND fecha_soli = @fecha_soli AND hora_soli = @hora_soli;
END
GO

-- Obtener Lista de Labs (este ya esta en SpAdmin con el nombre de obt_laboratorios)

-- Verificar que no haya otra solicitud del laboratorio (Vista Reservación Laboratorios)
CREATE PROCEDURE hay_choque_reservas (@lab_nombre NCHAR(6), @hora_inicio TIME, @cant_horas DECIMAL(2,1), @existe_registro BIT OUTPUT)
AS
BEGIN
	DECLARE @hora_salida TIME
	SET @hora_salida = DATEADD(HOUR, @cant_horas, @hora_inicio)
	IF EXISTS ( SELECT 1 FROM Soli_Lab
        WHERE lab_nombre = @lab_nombre AND hora >= @hora_inicio AND hora <= @hora_salida
    )
    BEGIN SET @existe_registro = 1 END
    ELSE BEGIN SET @existe_registro = 0 END
END
GO

-- Insertar una nueva solicitud de laboratorio (Vista Reservación Laboratorios)
CREATE PROCEDURE insertar_soli_lab (@correoSoli NVARCHAR(50), @fechaSoli DATE, @horaSoli TIME, @carnet NUMERIC(12), 
                                    @pNombre NVARCHAR(50), @sNombre NVARCHAR(20), @pApellido NVARCHAR(20), @sApellido NVARCHAR(20), 
									@cantHoras DECIMAL(2,1), @labNombre NCHAR(6), @userCed NUMERIC(10))
AS
BEGIN
    INSERT INTO Soli_Lab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced)
    VALUES (@correoSoli, @fechaSoli, @horaSoli, @carnet, @pNombre, @sNombre, @pApellido, @sApellido, @cantHoras, @labNombre, @userCed)
END
GO

-- Obtener todas las solicitudes que ha tenido un laboratorio (Vista Calendario Laboratorio)
CREATE PROCEDURE obt_solis_lab (@nombre NCHAR(6))
AS
BEGIN
    SELECT * FROM Soli_Lab WHERE lab_nombre = @nombre;
END
GO

-- Obtener todas las solicitudes de laboratorios que ha hecho un profesor (Vista Registro Reservaciones)
CREATE PROCEDURE obt_solis_labs_profe (@cedula NUMERIC(10))
AS
BEGIN
	SELECT lab_nombre, fecha, hora, cant_horas FROM Soli_Lab WHERE user_ced = @cedula;
END
GO

/* Eliminar todos los store procedure
DROP PROCEDURE obt_activos_no_aprobados;
DROP PROCEDURE aprobar_prestamo_activo;
*/

/* Pruebas para los store procedures
SELECT * from Sys.procedures; --Ignorar este comando
EXEC obt_activos_no_aprobados 3456789012;
*/

SELECT * FROM Soli_Act