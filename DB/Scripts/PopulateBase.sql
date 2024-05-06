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
VALUES ('Posee una buena iluminación','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee pizarras en ambas paredes','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una pantalla de Televisión','F2-07');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee 2 Proyectores','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee entradas HDMI y VGA','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee extintor contra incendios','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una buena iluminación','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee instrumentos de Texas Instruments','F2-08');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee multímetros y osciloscopios','F2-08');

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
VALUES ('Posee una buena iluminación','F2-10');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee pizarras en ambas paredes','F2-10');

INSERT INTO Lab_Facilidad(descripcion, lab_nombre)
VALUES ('Posee una pantalla de televisión','F2-10');


-- Insert usuarios a la base
INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (1234567890, 'admin1@gmail.com', 'admin123', NULL, 'Juan', 'Carlos', 'Pérez', 'Gómez', '1990-05-15', 1, 1);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (2345678901, 'admin2@gmail.com', 'admin123', NULL, 'María', NULL, 'González', 'López', '1985-08-20', 1, 1);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (3456789012, 'profe1@gmail.com', 'profe123',NULL, 'Pedro', 'José', 'Ramírez', 'Martínez', '2000-12-10', 1, 2);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (4567890123, 'profe2@gmail.com', 'profe123', NULL, 'Ana', 'Isabel', 'Martínez', 'López', '1995-03-25', 1, 2);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (5678901234, 'operador1@gmail.com', 'operador123', 2021468527, 'Luis', 'Miguel', 'García', 'Sánchez', '2002-11-03', 1, 3);

INSERT INTO Usuario (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
VALUES (6789012345, 'operador2@gmail.com', 'operador123', 2022457896, 'Sofía', 'Alejandra', 'Hernández', 'Pérez', '2003-07-18', 1, 3);

-- Insertar los activos a la Base

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('PRJ001', 'Proyector', 'Epson', '2023-05-15', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('CTR001', 'Control remoto', 'Sony', '2023-03-20', 0, null);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('LLV001', 'Llave', 'Yale', '2022-11-10', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('HDMI001', 'Cable HDMI', 'AmazonBasics', '2022-08-30', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('PRJ002', 'Proyector', 'BenQ', '2023-07-20', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('CTR002', 'Control remoto', 'Samsung', '2023-01-10', 0, null);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('LLV002', 'Llave', 'Master Lock', '2023-02-28', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('HDMI002', 'Cable HDMI', 'Belkin', '2023-04-15', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('PRJ003', 'Proyector', 'ViewSonic', '2023-09-25', 0, 3456789012);

INSERT INTO Activo (placa, tipo, marca, f_compra, prestado, aprob_ced)
VALUES ('CTR003', 'Control remoto', 'LG', '2023-06-05', 0, null);

USE OperaCE


/* Inserts de Prueba
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

SELECT * FROM Usuario;
SELECT * FROM Reg_Horas;
DELETE FROM Reg_Horas;
*/
