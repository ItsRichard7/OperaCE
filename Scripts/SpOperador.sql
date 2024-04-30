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
    VALUES (@fecha, @horaEntrada, @horaSalida, @horasRegistradas, @userCed)
END

-- Confirmar si lab esta disponible (este ya esta en SpProfe con el nombre de hay_choque_reservas)

-- Hacer Reservación Lab (este ya esta SpProfe con el nombre de insertar_soli_lab)

-- Pedir la lista de activos (este ya esta SpAdmin con el nombre de obt_activos)

-- Proceso para verificar el inicio de sesión (este ya esta en la vista de login)

-- Proceso para insertar una nueva solicitud de activo que recibe correo del que solicita, fecha soli, hora soli, placa de activo, cedula de quien lo presta, nombres soli, apellidos soli, flag de aprobado, flag de entregado (igual que la de aprobado)
CREATE PROCEDURE insertar_soli_activo (@correo_soli, @fecha_soli)