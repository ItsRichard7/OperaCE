import NetInfo from "@react-native-community/netinfo";
import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase(
    {
      name: 'MainDB',
      location: 'default',
    },
    () => {},
    error => { console.log(error.message); },
  );


export default function updateDB() {

    useEffect(() => {
        // Create the tables
        CreateTables();
    
        // Subscribe to network status changes
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && state.isInternetReachable) {
                // If the phone is connected to the internet, update the database
                updateDatabase();
            }
        });
    
        // Clean up the subscription
        return () => {
            unsubscribe();
        };
    }, []);

    const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Usuario(
            cedula NUMERIC(10) NOT NULL,
            correo NVARCHAR(50) NOT NULL,
            contrasena NVARCHAR(20) NOT NULL,
            carnet NUMERIC(12),
            p_nombre NVARCHAR(20) NOT NULL,
            s_nombre NVARCHAR(20),
            p_apellido NVARCHAR(20) NOT NULL,
            s_apellido NVARCHAR(20),
            f_nacim DATE NOT NULL,
            activo BIT NOT NULL,
            rol_id NUMERIC(1) NOT NULL,
            PRIMARY KEY(cedula),
            UNIQUE(correo)
        );`
        );

        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Activo(
            placa NVARCHAR(20) NOT NULL,
            tipo NVARCHAR(50) NOT NULL,
            marca NVARCHAR(50) NOT NULL,
            f_compra DATE,
            prestado BIT NOT NULL,
            aprob_ced NUMERIC(10) NOT NULL,
            PRIMARY KEY(placa)
        );`
        );

        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Laboratorio(
            nombre VARCHAR(6) NOT NULL,
            computadoras NUMERIC(2) NOT NULL,
            capacidad NUMERIC(2) NOT NULL,
            PRIMARY KEY(nombre)
        );`
        );

        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Lab_Facilidad(
            descripcion NVARCHAR(50) NOT NULL,
            lab_nombre VARCHAR(6) NOT NULL,
            PRIMARY KEY(lab_nombre, descripcion),
            CONSTRAINT FK_Lab_Facilidad FOREIGN KEY (lab_nombre) REFERENCES Laboratorio(nombre)
        );`
        );

        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Soli_Lab(
            correo_soli NVARCHAR(50) NOT NULL,
            fecha DATE NOT NULL,
            hora TIME NOT NULL,
            carnet NUMERIC(12),
            p_nombre NVARCHAR(20) NOT NULL,
            s_nombre NVARCHAR(20),
            p_apellido NVARCHAR(20) NOT NULL,
            s_apellido NVARCHAR(20),
            cant_horas DECIMAL(2,1) NOT NULL,
            lab_nombre VARCHAR(6) NOT NULL,
            user_ced NUMERIC(10) NOT NULL,
            PRIMARY KEY(correo_soli, fecha, hora),
            CONSTRAINT FK1_Soli_Lab FOREIGN KEY (lab_nombre) REFERENCES Laboratorio(nombre),
            CONSTRAINT FK2_Soli_Lab FOREIGN KEY (user_ced) REFERENCES Usuario(cedula)
        );`
        );

        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Soli_Act(
            correo_soli NVARCHAR(50) NOT NULL,
            fecha_ent DATE NOT NULL,
            hora_ent TIME NOT NULL,
            p_nombre NVARCHAR(20) NOT NULL,
            s_nombre NVARCHAR(20),
            p_apellido NVARCHAR(20) NOT NULL,
            s_apellido NVARCHAR(20),
            fecha_dev DATE,
            hora_dev TIME,
            devuelto BIT NOT NULL,
            averia NVARCHAR(200) NOT NULL,
            act_placa NVARCHAR(20) NOT NULL,
            user_ced NUMERIC(10) NOT NULL,
            PRIMARY KEY(correo_soli, fecha_ent, hora_ent),
            CONSTRAINT FK1_Soli_Act FOREIGN KEY (act_placa) REFERENCES Activo(placa),
            CONSTRAINT FK2_Soli_Act FOREIGN KEY (user_ced) REFERENCES Usuario(cedula)
        );`
        );
    }, null, null);
    };
    
    const updateDatabase = async () => {
        try {
            // Define the tables and their corresponding API endpoints
            const tables = ['Usuario', 'Activo', 'Laboratorio', 'Lab_Facilidad', 'Soli_Lab', 'Soli_Act'];
            const endpoints = ['usuarios', 'activos', 'laboratorios', 'lab_facilidad', 'soli_lab', 'soli_act'];
            const columns = [
                ['cedula', 'correo', 'contrasena', 'carnet', 'p_nombre', 's_nombre', 'p_apellido', 's_apellido', 'f_nacim', 'activo', 'rol_id'],
                ['placa', 'tipo', 'marca', 'f_compra', 'prestado', 'aprob_ced'],
                ['nombre', 'computadoras', 'capacidad'],
                ['descripcion', 'lab_nombre'],
                ['correo_soli', 'fecha', 'hora', 'carnet', 'p_nombre', 's_nombre', 'p_apellido', 's_apellido', 'cant_horas', 'lab_nombre', 'user_ced'],
                ['correo_soli', 'fecha_ent', 'hora_ent', 'p_nombre', 's_nombre', 'p_apellido', 's_apellido', 'fecha_dev', 'hora_dev', 'devuelto', 'averia', 'act_placa', 'user_ced']
            ];

            // Fetch data for each table and update the SQLite database
            for (let i = 0; i < tables.length; i++) {
                const response = await fetch(`https://your-server.com/api/${endpoints[i]}`);
                const data = await response.json();

                db.transaction((tx) => {
                    data.forEach((item) => {
                        const values = columns[i].map(column => item[column]);
                        const placeholders = columns[i].map(() => '?').join(', ');
                        tx.executeSql(
                            `INSERT OR REPLACE INTO ${tables[i]} (${columns[i].join(', ')}) VALUES (${placeholders})`,
                            values,
                        );
                    });
                });
            }
        } catch (error) {
            console.error('Failed to update database:', error);
        }
    };

    const syncDatabase = async () => {
    try {
        // Define the tables and their corresponding API endpoints
        const tables = ['Usuario', 'Soli_Lab', 'Soli_Act'];
        const endpoints = ['usuarios', 'soli_lab', 'soli_act'];

        // Fetch data from each table and send it to the main database
        for (let i = 0; i < tables.length; i++) {
            db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${tables[i]}`,
                    [],
                    async (tx, results) => {
                        const rows = results.rows.raw();

                        const response = await fetch(`https://your-server.com/api/${endpoints[i]}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(rows),
                        });

                        if (!response.ok) {
                            throw new Error(`Failed to sync ${tables[i]}: ${response.statusText}`);
                        }
                    },
                    (tx, error) => {
                        console.error(`Failed to fetch data from ${tables[i]}:`, error);
                    }
                );
            });
        }
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
};

    }