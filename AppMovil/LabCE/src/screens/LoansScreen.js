import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import { db } from '../DB/updateDB.js'; 


export default function LoansScreen({navigation}) {
  const [loans, setLoans] = useState([]);

useEffect(() => {
  fetchLoans();
}, []);

const fetchLoans = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT 
        Soli_Act.fecha_soli AS fecha_soli, 
        Soli_Act.act_placa AS act_placa, 
        Activo.tipo AS type, 
        Usuario.cedula AS user_ced,
        Soli_Act.p_nombre || ' ' || COALESCE(Soli_Act.s_nombre, '') || ' ' || Soli_Act.p_apellido || ' ' || COALESCE(Soli_Act.s_apellido, '') AS nombre_solicitante, 
        Usuario.p_nombre || ' ' || COALESCE(Usuario.s_nombre, '') || ' ' || Usuario.p_apellido || ' ' || COALESCE(Usuario.s_apellido, '') AS op_name 
      FROM Soli_Act 
      JOIN Activo ON Soli_Act.act_placa = Activo.placa
      JOIN Usuario ON Soli_Act.user_ced = Usuario.cedula
      WHERE Soli_Act.aprobado = 0`, // Filter out approved loans
      [],
      (tx, results) => {
        const rows = results.rows.raw();
        console.log('1 Fecha de solicitud:' + rows[0].fecha_soli);
        console.log('1 cedula solicitante:' + rows[0].user_ced);
        setLoans(rows);
      },
      (tx, error) => {
        console.error('Failed to approve loan:', error.message);
      }
    );
  });
};


const approveLoan = (fecha_soli, act_placa, user_ced) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE Soli_Act SET aprobado = 1 WHERE fecha_soli = ? AND act_placa = ? AND user_ced = ?`,
      [fecha_soli, act_placa, user_ced],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Loan approved');
          fetchLoans();
        } else {
          console.log('Failed to approve loan');
        }
      },
      (tx, error) => {
        console.error('Failed to approve loan:', error.message);
      }
    );
  });
};

const rejectLoan = (fecha_soli, act_placa, user_ced) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE Soli_Act SET aprobado = 0 WHERE fecha_soli = ? AND act_placa = ? AND user_ced = ?`,
      [fecha_soli, act_placa, user_ced],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Loan rejected');
          fetchLoans();
        } else {
          console.log('Failed to reject loan');
        }
      },
      (tx, error) => {
        console.error('Failed to reject loan:', error.message);
      }
    );
  });
};

return (
  <ImageBackground
    source={require('../Images/circuits.png')}
    style={styles.background}
    resizeMode="cover">
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Solicitudes de préstamos</Text>
      <View style={styles.loansContainer}>
        {loans.map((loan, index) => {
          const date = new Date(loan.fecha_soli);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

          return (
            <View key={index} style={styles.loanContainer}>
              <Text style={styles.loanDetail}>Fecha de solicitud: {formattedDate}</Text>
              <Text style={styles.loanDetail}>Placa activo: {loan.act_placa}</Text>
              <Text style={styles.loanDetail}>Tipo activo: {loan.type}</Text>
              <Text style={styles.loanDetail}>Solicitante: {loan.nombre_solicitante}</Text>
              <Text style={styles.loanDetail}>Operador: {loan.op_name}</Text>
              <View style={styles.buttonContainer}>
              <Button
                  title="Aprobar"
                  color="#6E8B3D" // Dark olive green
                  onPress={() => approveLoan(loan.fecha_soli, loan.act_placa, loan.user_ced)}
                  />
            </View>
            <View style={styles.buttonContainer}>
            <Button
              title="Rechazar"
              color="#8B0000" // Dark red
              onPress={() => rejectLoan(loan.fecha_soli, loan.act_placa, loan.user_ced)}
              />
            </View>
          </View>
          );
        })}
      </View>
    </ScrollView>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70, 
    paddingBottom: 110, 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  loansContainer: {
    width: '80%',
    marginBottom: 20,
  },
  loanContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loanDetail: {
    marginBottom: 5,
  },
});