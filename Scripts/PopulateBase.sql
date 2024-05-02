--Insert Roles a la Base
USE OperaCE; 
GO

INSERT INTO Rol (id, descripcion)
VALUES (1, 'Administrador');

INSERT INTO Rol (id, descripcion)
VALUES (2, 'Profesor');

INSERT INTO Rol (id, descripcion)
VALUES (3, 'Operador');

--Insert Laboratorios a la Base
INSERT INTO Laboratorio (nombre, computadoras, capacidad)
VALUES ('F2-06', 2, 3);

INSERT INTO Laboratorio (nombre, computadoras, capacidad)
VALUES ('F2-07', 13, 25);

INSERT INTO Laboratorio (nombre, computadoras, capacidad)
VALUES ('F2-08', 12, 25);

INSERT INTO Laboratorio (nombre, computadoras, capacidad)
VALUES ('F2-09', 25, 25);

INSERT INTO Laboratorio (nombre, computadoras, capacidad)
VALUES ('F2-10', 13, 25);

--Insert Facilidades de los Laboratorios a la Base
INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee 2 Proyectores','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee entradas HDMI y VGA','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee extintor contra incendios','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una buena iluminaci�n','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee pizarras en ambas paredes','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una pantalla de Televisi�n','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee 2 Proyectores','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee entradas HDMI y VGA','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee extintor contra incendios','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una buena iluminaci�n','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee instrumentos de Texas Instruments','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee mult�metros y osciloscopios','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee pizarras en ambas paredes','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee 2 Proyectores','F2-09');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee entradas HDMI y VGA','F2-09');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee extintor contra incendios','F2-09');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee doble pizarra al frente','F2-09');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee 2 Proyectores','F2-10');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee entradas HDMI y VGA','F2-10');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee extintor contra incendios','F2-10');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una buena iluminaci�n','F2-10');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee pizarras en ambas paredes','F2-10');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una pantalla de televisi�n','F2-10');

-- Insert usuarios a la base
INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (1234567890, 'admin1@gmail.com', 'admin123', NULL, 'Juan', 'Carlos', 'P�rez', 'G�mez', '1990-05-15', 1, 1);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (2345678901, 'admin2@gmail.com', 'admin123', NULL, 'Mar�a', NULL, 'Gonz�lez', 'L�pez', '1985-08-20', 1, 1);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (3456789012, 'profe1@gmail.com', 'profe123',NULL, 'Pedro', 'Jos�', 'Ram�rez', 'Mart�nez', '2000-12-10', 1, 2);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (4567890123, 'profe2@gmail.com', 'profe123', NULL, 'Ana', 'Isabel', 'Mart�nez', 'L�pez', '1995-03-25', 1, 2);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (5678901234, 'operador1@gmail.com', 'operador123', 2021468527, 'Luis', 'Miguel', 'Garc�a', 'S�nchez', '2002-11-03', 1, 3);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (6789012345, 'operador2@gmail.com', 'operador123', 2022457896, 'Sof�a', 'Alejandra', 'Hern�ndez', 'P�rez', '2003-07-18', 1, 3);

-- Insertar los activos a la Base

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('PRJ001', 'Proyector', 'Epson', '2023-05-15', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('CTR001', 'Control remoto', 'Sony', '2023-03-20', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('LLV001', 'Llave', 'Yale', '2022-11-10', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('HDMI001', 'Cable HDMI', 'AmazonBasics', '2022-08-30', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('PRJ002', 'Proyector', 'BenQ', '2023-07-20', 1, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('CTR002', 'Control remoto', 'Samsung', '2023-01-10', 1, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('LLV002', 'Llave', 'Master Lock', '2023-02-28', 1, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('HDMI002', 'Cable HDMI', 'Belkin', '2023-04-15', 1, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('PRJ003', 'Proyector', 'ViewSonic', '2023-09-25', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('CTR003', 'Control remoto', 'LG', '2023-06-05', 0, 3456789012);


/* Inserts de Prueba
-- Insertar Registros de Hora
INSERT INTO Reg_Horas(fecha, hora_entr, hora_sal, horas_reg, user_ced)
VALUES ('2024-04-26', '15:30:10', '18:29:50', DATEDIFF(MINUTE, '15:30:10', '18:29:50') / 60.0 , 5678901234);

INSERT INTO Reg_Horas(fecha, hora_entr, hora_sal, horas_reg, user_ced)
VALUES ('2024-04-27', '10:10:00', '12:29:10', DATEDIFF(MINUTE, '10:10:00', '12:29:10') / 60.0 , 5678901234);

INSERT INTO Reg_Horas(fecha, hora_entr, hora_sal, horas_reg, user_ced)
VALUES ('2024-04-28', '6:59:30', '10:01:22', DATEDIFF(MINUTE, '6:59:30', '10:01:22') / 60.0 , 5678901234);

INSERT INTO Reg_Horas(fecha, hora_entr, hora_sal, horas_reg, user_ced)
VALUES ('2024-04-26', '14:30:10', '15:20:50', DATEDIFF(MINUTE, '14:30:10', '15:20:50') / 60.0 , 6789012345);

INSERT INTO Reg_Horas(fecha, hora_entr, hora_sal, horas_reg, user_ced)
VALUES ('2024-04-27', '10:10:10', '14:44:02', DATEDIFF(MINUTE, '10:10:10', '14:44:02') / 60.0 , 6789012345);

INSERT INTO Reg_Horas(fecha, hora_entr, hora_sal, horas_reg, user_ced)
VALUES ('2024-04-28', '18:56:44', '21:01:54', DATEDIFF(MINUTE, '18:56:44', '21:01:54') / 60.0 , 6789012345);

-- Insertar Solicitudes de Laboratorios
INSERT INTO Soli_Lab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) 
VALUES ('ejemplo1@correo.com', '2024-05-01', '08:00:00', NULL, 'Juan', NULL, 'Pérez', NULL, 3.0, 'F2-06', 5678901234);

INSERT INTO Soli_Lab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) 
VALUES ('ejemplo2@correo.com', '2024-05-01', '11:30:00', NULL, 'María', NULL, 'López', NULL, 2.5, 'F2-07', 6789012345);

INSERT INTO Soli_Lab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) 
VALUES ('ejemplo3@correo.com', '2024-05-02', '09:00:00', NULL, 'Pedro', NULL, 'Gómez', NULL, 1.5, 'F2-08', 5678901234);

INSERT INTO Soli_Lab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) 
VALUES ('ejemplo4@correo.com', '2024-05-03', '12:00:00', NULL, 'Ana', 'María', 'Rodríguez', 'García', 2.0, 'F2-09', 6789012345);

INSERT INTO Soli_Lab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) 
VALUES ('ejemplo5@correo.com', '2024-05-03', '14:30:00', NULL, 'Jorge', NULL, 'Martínez', NULL, 3.5, 'F2-10', 5678901234);

INSERT INTO Soli_Lab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) 
VALUES ('ejemplo6@correo.com', '2024-05-04', '13:00:00', NULL, 'Laura', 'Isabel', 'Fernández', 'López', 1.0, 'F2-06', 6789012345);


SELECT * FROM Usuario;
SELECT * FROM Reg_Horas;
SELECT * FROM Soli_Lab;

DELETE FROM Reg_Horas;
DELETE FROM Soli_Lab;
*/
