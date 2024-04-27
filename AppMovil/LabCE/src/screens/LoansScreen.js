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
        Soli_Act.fecha_ent AS date, 
        Soli_Act.act_placa AS placa, 
        Activo.tipo AS type, 
        Soli_Act.p_nombre || ' ' || Soli_Act.s_nombre || ' ' || Soli_Act.p_apellido || ' ' || Soli_Act.s_apellido AS nombre_solicitante, 
        Usuario.p_nombre || ' ' || Usuario.s_nombre || ' ' || Usuario.p_apellido || ' ' || Usuario.s_apellido AS op_name 
      FROM Soli_Act 
      JOIN Activo ON Soli_Act.act_placa = Activo.placa
      JOIN Usuario ON Soli_Act.user_ced = Usuario.cedula`,
      [],
      (tx, results) => {
        const rows = results.rows.raw();
        setLoans(rows);
      },
      (tx, error) => {
        console.error('Failed to fetch loans:', error);
      }
    );
  });
};

const approveLoan = (correo_soli, fecha_ent, hora_ent) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE Soli_Act SET approved = 1 WHERE correo_soli = ? AND fecha_ent = ? AND hora_ent = ?`,
      [correo_soli, fecha_ent, hora_ent],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Loan approved');
        } else {
          console.log('Failed to approve loan');
        }
      },
      (tx, error) => {
        console.error('Failed to approve loan:', error);
      }
    );
  });
};

const rejectLoan = (correo_soli, fecha_ent, hora_ent) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE Soli_Act SET approved = 0 WHERE correo_soli = ? AND fecha_ent = ? AND hora_ent = ?`,
      [correo_soli, fecha_ent, hora_ent],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('Loan rejected');
        } else {
          console.log('Failed to reject loan');
        }
      },
      (tx, error) => {
        console.error('Failed to reject loan:', error);
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
    {loans.map((loan, index) => (
      <View key={index} style={styles.loanContainer}>
        <Text style={styles.loanDetail}>Fecha: {loan.date}</Text>
        <Text style={styles.loanDetail}>Placa activo: {loan.placa}</Text>
        <Text style={styles.loanDetail}>Tipo activo: {loan.type}</Text>
        <Text style={styles.loanDetail}>Solicitante: {loan.nombre_solicitante}</Text>
        <Text style={styles.loanDetail}>Operador: {loan.op_name}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Aprobar"
            color="#6E8B3D" // Dark olive green
            onPress={() => approveLoan(loan.correo_soli, loan.fecha_ent, loan.hora_ent)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Rechazar"
            color="#8B0000" // Dark red
            onPress={() => rejectLoan(loan.correo_soli, loan.fecha_ent, loan.hora_ent)}
          />
        </View>
      </View>
    ))}
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