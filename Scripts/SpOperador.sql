/*-------------------------------------
|                                     |
|     Store Procedures Operador       |
|                                     |
-------------------------------------*/

USE OperaCE;
GO

-- Insertar un nuevo registro de Horas (Vista Marcar Salida)
CREATE PROCEDURE insertar_reg_horas (@fecha DATE, @horaEntrada TIME, @horaSalida TIME, @horasRegistradas NUMERIC(2,1), @userCed NUMERIC(10))
AS
BEGIN
    INSERT INTO Reg_Horas (fecha, hora_entr, hora_sal, horas_reg, user_ced)
    VALUES (@fecha, @horaEntrada, @horaSalida, @horasRegistradas, @userCed);
END
GO

-- Confirmar si lab esta disponible (este ya esta en SpProfe con el nombre de hay_choque_reservas)

-- Hacer Reservaci�n Lab (este ya esta SpProfe con el nombre de insertar_soli_lab)

-- Pedir la lista de activos (este ya esta SpAdmin con el nombre de obt_activos)

-- Proceso para verificar el inicio de sesi�n (este ya esta en SpLogin con el nombre de verificar_inicio)

-- Insertar nueva solicitud de prestamo de activo (Vista Hacer Pr�stamo Activo tanto Profesor como Estudiante)
CREATE PROCEDURE insertar_soli_activo (@correo_soli NVARCHAR(50), @fecha_soli DATE, @hora_soli TIME, @p_nombre NVARCHAR(20), 
									   @s_nombre NVARCHAR(20), @p_apellido NVARCHAR(20), @s_apellido NVARCHAR(20), @aprobado BIT,
									   @act_placa NVARCHAR(20), @user_ced NUMERIC(10))
AS
BEGIN
	INSERT INTO	Soli_Act(correo_soli, fecha_soli, hora_soli, p_nombre, s_nombre, p_apellido, s_apellido, aprobado, entregado, fecha_dev, hora_dev, devuelto, averia, act_placa, user_ced)
	VALUES (@correo_soli, @fecha_soli, @hora_soli, @p_nombre, @s_nombre, @p_apellido, @s_apellido, @aprobado, @aprobado, NULL, NULL, 0, NULL, @act_placa, @user_ced);
END
GO

-- Obtener prestamos de activos que hayan sido aprobados pero no entregados (Vista Entregar Activo)
CREATE PROCEDURE obt_activos_no_entregados
AS
BEGIN
	SELECT * FROM Soli_Act WHERE aprobado = 1 AND entregado = 0;
END
GO

-- Marcar como entregado un activo (Vista Entregar Activo)
CREATE PROCEDURE marcar_entregado (@correo_soli NVARCHAR(50), @fecha_soli DATE, @hora_soli TIME)
AS
BEGIN
	UPDATE Soli_Act SET entregado = 1 WHERE correo_soli = @correo_soli AND fecha_soli = @fecha_soli AND hora_soli = @hora_soli;
END
GO

-- Proceso para verificar el inicio de sesi�n (este ya esta en SpLogin con el nombre de verificar_inicio)

-- Al devolverse el activo se actualiza el estado del pr�stamo (Vista Devolu�i�n Activo)
CREATE PROCEDURE devolver_activo (@act_placa NVARCHAR(20), @fecha_dev DATE, @hora_dev TIME, @averia NVARCHAR(200))
AS
BEGIN
	UPDATE Soli_Act SET	devuelto = 1, fecha_dev = @fecha_dev, hora_dev = @hora_dev, averia = @averia WHERE act_placa = @act_placa AND devuelto = 0;
	UPDATE Activo SET prestado = 0 WHERE placa = @act_placa;
END
GO

-- Obtener los registros de hora de un operador (este ya esta en SpAdmin con el nombre de obt_reg_horas_op)
