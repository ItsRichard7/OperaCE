/*-------------------------------------
|                                     |
|       Store Procedures Movil        |
|                                     |
-------------------------------------*/

USE OperaCE;
GO

/*-------------- Sección de Gets --------------*/
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

/*------------ Final Sección de Gets ------------*/

/* Eliminar todos los store procedure
DROP PROCEDURE obt_tabla_usuario;
DROP PROCEDURE obt_tabla_laboratorio;
DROP PROCEDURE obt_tabla_lab_facilidad;
DROP PROCEDURE obt_tabla_activo; 
DROP PROCEDURE obt_tabla_soli_lab;
DROP PROCEDURE obt_tabla_soli_act;
*/

/* Pruebas para los store procedures
SELECT * from Sys.procedures; --Ignorar este comando
EXEC obt_tabla_usuario;
EXEC obt_tabla_laboratorio;
EXEC obt_tabla_lab_facilidad;
EXEC obt_tabla_activo;
EXEC obt_tabla_soli_lab;
EXEC obt_tabla_soli_act;
*/