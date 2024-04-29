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
	SELECT A.act_placa, A.p_nombre, A.s_nombre, A.p_apellido, A.s_apellido, A.fecha_soli, A.hora_soli
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

/* Eliminar todos los store procedure
DROP PROCEDURE obt_activos_no_aprobados;
DROP PROCEDURE aprobar_prestamo_activo;
*/

/* Pruebas para los store procedures
SELECT * from Sys.procedures; --Ignorar este comando
EXEC obt_activos_no_aprobados 3456789012;
EXEC obt_activos_no_aprobados 'juanitoelcrack@estudiantec.cr', '2024-04-28', '18:56:44';