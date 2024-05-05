/*-------------------------------------
|                                     |
|       Store Procedures Móvil        |
|                                     |
-------------------------------------*/

USE OperaCE;
GO

/*------------------ Sección de Gets ------------------*/
-- Obtener Tabla de Usuarios (Info para Base SQL lite)
CREATE PROCEDURE obt_tabla_usuario
AS
BEGIN
    SELECT * FROM Usuario;
END
GO

-- Obtener Tabla de Laboratorios (Info para Base SQL lite)
CREATE PROCEDURE obt_tabla_laboratorio
AS
BEGIN
    SELECT * FROM Laboratorio;
END
GO

-- Obtener Tabla de Facilidades de los Laboratorios (Info para Base SQL lite)
CREATE PROCEDURE obt_tabla_lab_facilidad
AS
BEGIN
    SELECT * FROM Lab_Facilidad;
END
GO

-- Obtener Tabla de Activos (Info para Base SQL lite)
CREATE PROCEDURE obt_tabla_activo
AS
BEGIN
    SELECT * FROM Activo;
END
GO

-- Obtener Tabla de Usuarios (Info para Base SQL lite)
CREATE PROCEDURE obt_tabla_soli_lab
AS
BEGIN
    SELECT * FROM Soli_Lab;
END
GO

-- Obtener Tabla de Usuarios (Info para Base SQL lite)
CREATE PROCEDURE obt_tabla_soli_act
AS
BEGIN
    SELECT * FROM Soli_Act;
END
GO
/*-------------------- Final Sección de Gets -------------------*/


/*------------------- Sección de Updates ----------------------*/
-- Actualizar Tabla de Usuarios (Sincronización con Base Offline)
CREATE PROCEDURE actualizar_usuarios
    @json NVARCHAR(MAX)
AS
BEGIN
    -- Crear una tabla temporal para almacenar la info del JSON
    CREATE TABLE #UsuariosTemp (
        cedula NUMERIC(10) NOT NULL,
        correo NVARCHAR(50) NOT NULL,
        contrasena VARCHAR(32) NOT NULL,
        carnet NUMERIC(12),
        p_nombre NVARCHAR(50) NOT NULL,
        s_nombre NVARCHAR(20),
        p_apellido NVARCHAR(20) NOT NULL,
        s_apellido NVARCHAR(20),
        f_nacim DATE NOT NULL,
        activo BIT NOT NULL,
        rol_id NUMERIC(1) NOT NULL
    );

    -- Obtener la información del JSON y almacenarla en la tabla temporal
    INSERT INTO #UsuariosTemp (cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id)
    SELECT cedula, correo, contrasena, carnet, p_nombre, s_nombre, p_apellido, s_apellido, f_nacim, activo, rol_id
    FROM OPENJSON(@json)
    WITH (
        cedula NUMERIC(10),
        correo NVARCHAR(50),
        contrasena VARCHAR(32),
        carnet NUMERIC(12),
        p_nombre NVARCHAR(50),
        s_nombre NVARCHAR(20),
        p_apellido NVARCHAR(20),
        s_apellido NVARCHAR(20),
        f_nacim DATE,
        activo BIT,
        rol_id NUMERIC(1)
    );

    -- Actualizar los registros ya existentes en la base
    UPDATE Usuario
    SET Usuario.correo = Temp.correo,
        Usuario.contrasena = Temp.contrasena,
        Usuario.carnet = Temp.carnet,
        Usuario.p_nombre = Temp.p_nombre,
        Usuario.s_nombre = Temp.s_nombre,
        Usuario.p_apellido = Temp.p_apellido,
        Usuario.s_apellido = Temp.s_apellido,
        Usuario.f_nacim = Temp.f_nacim,
        Usuario.activo = Temp.activo,
        Usuario.rol_id = Temp.rol_id
    FROM Usuario
    INNER JOIN #UsuariosTemp AS Temp ON Usuario.cedula = Temp.cedula;

    -- Eliminar la tabla temporal
    DROP TABLE #UsuariosTemp;
END
GO

-- Actualizar Tabla de Solicitudes de Laboratorios (Sincronización con Base Offline)
CREATE PROCEDURE actualizar_soli_lab
    @json NVARCHAR(MAX)
AS
BEGIN
    -- Crear tabla temporal para almacenar los datos del JSON
    CREATE TABLE #TempSoliLab (
        correo_soli NVARCHAR(50) NOT NULL,
        fecha DATE NOT NULL,
        hora TIME NOT NULL,
        carnet NUMERIC(12),
        p_nombre NVARCHAR(50) NOT NULL,
        s_nombre NVARCHAR(20),
        p_apellido NVARCHAR(20) NOT NULL,
        s_apellido NVARCHAR(20),
        cant_horas DECIMAL(2,1) NOT NULL,
        lab_nombre NCHAR(6) NOT NULL,
        user_ced NUMERIC(10) NOT NULL
    );

    -- Insertar datos del JSON en la tabla temporal
    INSERT INTO #TempSoliLab (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced)
    SELECT correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced
    FROM OPENJSON(@json)
    WITH (
        correo_soli NVARCHAR(50),
        fecha DATE,
        hora TIME,
        carnet NUMERIC(12),
        p_nombre NVARCHAR(50),
        s_nombre NVARCHAR(20),
        p_apellido NVARCHAR(20),
        s_apellido NVARCHAR(20),
        cant_horas DECIMAL(2,1),
        lab_nombre NCHAR(6),
        user_ced NUMERIC(10)
    );

    -- Actualizar o insertar registros en la tabla principal
    MERGE INTO Soli_Lab AS target
    USING #TempSoliLab AS source
    ON (target.correo_soli = source.correo_soli AND target.fecha = source.fecha AND target.hora = source.hora)
    WHEN MATCHED THEN
        UPDATE SET
            target.carnet = source.carnet,
            target.p_nombre = source.p_nombre,
            target.s_nombre = source.s_nombre,
            target.p_apellido = source.p_apellido,
            target.s_apellido = source.s_apellido,
            target.cant_horas = source.cant_horas,
            target.lab_nombre = source.lab_nombre,
            target.user_ced = source.user_ced
    WHEN NOT MATCHED THEN
        INSERT (correo_soli, fecha, hora, carnet, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced)
        VALUES (source.correo_soli, source.fecha, source.hora, source.carnet, source.p_nombre, source.s_nombre, source.p_apellido, source.s_apellido, source.cant_horas, source.lab_nombre, source.user_ced);

    -- Eliminar tabla temporal
    DROP TABLE #TempSoliLab;
END
GO

-- Actualizar Tabla de Solicitudes de Activos (Sincronización con Base Offline)
CREATE PROCEDURE actualizar_soli_act
    @json NVARCHAR(MAX)
AS
BEGIN
    -- Crear tabla temporal para almacenar los datos del JSON
    CREATE TABLE #TempSoliAct (
        correo_soli NVARCHAR(50) NOT NULL,
        fecha_soli DATE NOT NULL,
        hora_soli TIME NOT NULL,
        p_nombre NVARCHAR(50) NOT NULL,
        s_nombre NVARCHAR(20),
        p_apellido NVARCHAR(20) NOT NULL,
        s_apellido NVARCHAR(20),
        aprobado BIT NOT NULL,
        entregado BIT NOT NULL,
        fecha_dev DATE,
        hora_dev TIME,
        devuelto BIT NOT NULL,
        averia NVARCHAR(200),
        act_placa NVARCHAR(20) NOT NULL,
        user_ced NUMERIC(10) NOT NULL
    );

    -- Insertar datos del JSON en la tabla temporal
    INSERT INTO #TempSoliAct (correo_soli, fecha_soli, hora_soli, p_nombre, s_nombre, p_apellido, s_apellido, aprobado, entregado, fecha_dev, hora_dev, devuelto, averia, act_placa, user_ced)
    SELECT correo_soli, fecha_soli, hora_soli, p_nombre, s_nombre, p_apellido, s_apellido, aprobado, entregado, fecha_dev, hora_dev, devuelto, averia, act_placa, user_ced
    FROM OPENJSON(@json)
    WITH (
        correo_soli NVARCHAR(50),
        fecha_soli DATE,
        hora_soli TIME,
        p_nombre NVARCHAR(50),
        s_nombre NVARCHAR(20),
        p_apellido NVARCHAR(20),
        s_apellido NVARCHAR(20),
        aprobado BIT,
        entregado BIT,
        fecha_dev DATE,
        hora_dev TIME,
        devuelto BIT,
        averia NVARCHAR(200),
        act_placa NVARCHAR(20),
        user_ced NUMERIC(10)
    );

    -- Actualizar o insertar registros en la tabla principal
    MERGE INTO Soli_Act AS target
    USING #TempSoliAct AS source
    ON (target.correo_soli = source.correo_soli AND target.fecha_soli = source.fecha_soli AND target.hora_soli = source.hora_soli)
    WHEN MATCHED THEN
        UPDATE SET
            target.p_nombre = source.p_nombre,
            target.s_nombre = source.s_nombre,
            target.p_apellido = source.p_apellido,
            target.s_apellido = source.s_apellido,
            target.aprobado = source.aprobado,
            target.entregado = source.entregado,
            target.fecha_dev = source.fecha_dev,
            target.hora_dev = source.hora_dev,
            target.devuelto = source.devuelto,
            target.averia = source.averia,
            target.act_placa = source.act_placa,
            target.user_ced = source.user_ced

    WHEN NOT MATCHED THEN
        INSERT (correo_soli, fecha_soli, hora_soli, p_nombre, s_nombre, p_apellido, s_apellido, aprobado, entregado, fecha_dev, hora_dev, devuelto, averia, act_placa, user_ced)
        VALUES (source.correo_soli, source.fecha_soli, source.hora_soli, source.p_nombre, source.s_nombre, source.p_apellido, source.s_apellido, source.aprobado, source.entregado, source.fecha_dev, source.hora_dev, source.devuelto, source.averia, source.act_placa, source.user_ced);



    -- Eliminar tabla temporal
    DROP TABLE #TempSoliAct;
END;

/*------------------ Final Sección de Updates ------------------*/

/* Eliminar todos los store procedure
DROP PROCEDURE obt_tabla_usuario;
DROP PROCEDURE obt_tabla_laboratorio;
DROP PROCEDURE obt_tabla_lab_facilidad;
DROP PROCEDURE obt_tabla_activo; 
DROP PROCEDURE obt_tabla_soli_lab;
DROP PROCEDURE obt_tabla_soli_act;
DROP PROCEDURE actualizar_soli_act;
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

SELECT * FROM Soli_Act
select * from activo
