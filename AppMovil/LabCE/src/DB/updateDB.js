import NetInfo from "@react-native-community/netinfo";
import SQLite from 'react-native-sqlite-storage';
import React, { useEffect } from 'react';


export const db = SQLite.openDatabase(
    {
      name: 'MainDB',
      location: 'default',
    },
    () => {},
    error => { console.log(error.message); },
  );


export default function updateDB() {

    useEffect( () => {
        // Create the tables
        createTables();
    
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
            contrasena VARCHAR(32) NOT NULL,
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




    const updateSQLiteDatabase = async (table, columns, data) => {
        if (!data || data.length === 0) {
          console.log(`No data to update for table: ${table}`);
          return;
        }
      
        const placeholders = columns.map(() => '?').join(', ');
        const sqlStatement = `INSERT OR REPLACE INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
      
        db.transaction(tx => {
          data.forEach(item => {
            const values = columns.map(column => item[column]);
            tx.executeSql(sqlStatement, values, (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log(`Insertion or replacement successful for table: ${table}`);
              } else {
                console.log(`Insertion or replacement failed for table: ${table}`);
              }
            }, (tx, error) => {
              console.log(`Failed to execute query for table: ${table}, error: ${error.message}`);
            });
          });
        }, (error) => {
          console.log(`Transaction error for table: ${table}, error: ${error.message}`);
        }, () => {
          console.log(`Transaction successful for table: ${table}`);
        });
      };
      


      const updateUsuario = async () => {
        const endpoint = 'obtenerUsuario';
        const columns = ['cedula', 'correo', 'contrasena', 'carnet', 'p_nombre', 's_nombre', 'p_apellido', 's_apellido', 'f_nacim', 'activo', 'rol_id'];
        let data = await fetchData(endpoint);
      
        // Map the keys from the data to the column names expected by the database
        data = data.map(item => ({
          cedula: item.cedula,
          correo: item.correo,
          contrasena: item.contrasena,
          carnet: item.carnet, // This can be null as per your schema
          p_nombre: item.primerNombre,
          s_nombre: item.segundoNombre, // This can be null as per your schema
          p_apellido: item.primerApellido,
          s_apellido: item.segundoApellido, // This can be null as per your schema
          f_nacim: item.fechaNacimiento.split('T')[0], // Assuming you want just the date part
          activo: item.activo ? 1 : 0, // Convert boolean to 1 or 0
          rol_id: item.rolId
        }));
      
        await updateSQLiteDatabase('Usuario', columns, data);
      };

      const updateActivo = async () => {
        const endpoint = 'obtenerActivo/activos';
        const columns = ['placa', 'tipo', 'marca', 'f_compra', 'prestado', 'aprob_ced'];
        let data = await fetchData(endpoint);
      
        // Map the data to the column names
        const mappedData = data.map(item => ({
          placa: item.placa,
          tipo: item.tipo,
          marca: item.marca,
          f_compra: item.fCompra,
          prestado: item.prestado ? 1 : 0, // Convert boolean to 1 or 0 if necessary
          aprob_ced: item.aprobCed
        }));
      
        // Call the function to update the database with the mapped data
        await updateSQLiteDatabase('Activo', columns, mappedData);
      };

      const updateLaboratorio = async () => {
        const endpoint = 'obtenerLaboratorios';
        const columns = ['nombre', 'computadoras', 'capacidad'];
        let data = await fetchData(endpoint);
        
        // Map the data to the column names
        data = data.map(item => ({
            nombre: item.nombre,
            computadoras: item.computadoras,
            capacidad: item.capacidad
        }));
    
        await updateSQLiteDatabase('Laboratorio', columns, data);
    };
    
    const updateLab_Facilidad = async () => {
        const endpoint = 'obtenerFacilidad';
        const columns = ['lab_nombre', 'descripcion'];
        let data = await fetchData(endpoint);
        
        // Map the data to the column names
        data = data.map(item => ({
            lab_nombre: item.lab_nombre,
            descripcion: item.descripcion
        }));
    
        await updateSQLiteDatabase('Lab_Facilidad', columns, data);
    };
    
    const updateSoli_Lab = async () => {
        const endpoint = 'obtenerSoliLab/solicitudes-laboratorio';
        const columns = ['correo_soli', 'fecha_ent', 'hora_ent', 'fecha_sal', 'hora_sal', 'lab_nombre', 'user_ced'];
        let data = await fetchData(endpoint);
        
        // Map the data to the column names
        data = data.map(item => ({
            correo_soli: item.correo_soli,
            fecha_ent: item.fecha,
            hora_ent: item.hora,
            fecha_sal: item.fecha_sal,
            hora_sal: item.hora_sal,
            lab_nombre: item.lab_nombre,
            user_ced: item.user_ced
        }));
    
        await updateSQLiteDatabase('Soli_Lab', columns, data);
    };
    
    const updateSoli_Act = async () => {
        const endpoint = 'SoliAct';
        const columns = ['correo_soli', 'fecha_ent', 'hora_ent', 'fecha_sal', 'hora_sal', 'act_placa', 'user_ced'];
        let data = await fetchData(endpoint);
        
        // Map the data to the column names
        data = data.map(item => ({
            correo_soli: item.correo_soli,
            fecha_ent: item.fecha_soli,
            hora_ent: item.hora_soli,
            fecha_sal: item.fecha_dev,
            hora_sal: item.hora_dev,
            act_placa: item.act_placa,
            user_ced: item.user_ced
        }));
    
        await updateSQLiteDatabase('Soli_Act', columns, data);
    };
    

const fetchData = async (endpoint) => {
  const response = await fetch(`http://10.0.2.2:5074/api/${endpoint}`)
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;  // Rethrow the error
    });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error al obtener datos de ${endpoint}`);
  }
};


const updateDatabase = async () => {
  try {
    await updateUsuario();
    await updateActivo();
    await updateLaboratorio();
    await updateLab_Facilidad();
    await updateSoli_Lab();
    await updateSoli_Act();

    await sendDatabaseTablesToServer();

    //checkUpdates();


    //cleanTable('Soli_Lab');
  } catch (error) {
    console.error(error);
  }
};

  function logTableData(table) {
  db.transaction(tx => {
    tx.executeSql(`SELECT * FROM ${table}`, [], (tx, results) => {
      const rows = results.rows.raw();
      console.log(`Results from ${table} in JSON format:`, JSON.stringify(rows, null, 2));
    });
  });
}

const checkUpdates = async () => {
  //await updateDatabase();

  //logTableData('Usuario');
  logTableData('Activo');
  //logTableData('Laboratorio');
  //logTableData('Lab_Facilidad');
  logTableData('Soli_Lab');
  //logTableData('Soli_Act');
};

const cleanTable = (tableName) => {
    db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM ${tableName}`,
            [],
            (tx, results) => {
                console.log('Table cleaned successfully');
            },
            (tx, error) => {
                console.log('Error cleaning table: ', error.message);
            }
        );
    });
}

const sendDatabaseTablesToServer = async () => {
  const tables = ['Usuario', 'Soli_Lab', 'Soli_Act'];
  const endpoints = ['ActualizarUsuarios', 'actualizarSoliLabs', 'actualizarSoliActivos'];

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const endpoint = endpoints[i];
    let data = {};

    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM ${table}`, [], (tx, results) => {
          let rows = results.rows.raw();
          if (table === 'Usuario') {
            rows = rows.map(row => {
              const { user_ced: cedula, ...rest } = row;
              return { cedula, ...rest };
            });
          } else if (table === 'Soli_Lab' || table === 'Soli_Act') {
              rows = rows.map(row => {
          const { user_ced, ...rest } = row;
          return { cedula: user_ced, ...rest };
  });
          }
          data = rows;
          resolve();
        }, (transaction, error) => {
          reject(error);
        });
      });
    });

    const jsonData = JSON.stringify(data, null, 2);
    console.log('Sending data:', jsonData); // Log the data you're sending

    fetch(`http://10.0.2.2:5074/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  }
}

  

    }