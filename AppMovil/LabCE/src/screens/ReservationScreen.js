import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; //npm install @react-native-picker/picker
import { db } from '../DB/updateDB.js'; 
import { getClientId } from '../globalVariables/clientID.js';
import moment from 'moment'; //npm install moment
import { useNavigation } from '@react-navigation/native';



const ReservationScreen = ({ route, navigation }) => {
  const { selectedLab, selectedDate, selectedHour } = route.params;
  console.log('selected Lab:', selectedLab,selectedDate, selectedHour);
  const [duration, setDuration] = useState(1); // Default duration is 1 hour
  const [userData, setUserData] = useState(null);
  //const navigation = useNavigation();



  useEffect(() => {
    fetchUserData();
  }, []);


  const fetchUserData = () => {
    const clientId = getClientId();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Usuario WHERE cedula = ?`,
        [clientId],
        (tx, results) => {
          const rows = results.rows.raw();
          if (rows.length > 0) {
            setUserData(rows[0]);
          } else {
            console.error('No user found with the provided client ID');
          }
        },
        (tx, error) => {
          console.error('Failed to fetch user data:', error);
        }
      );
    });
  };

  const confirmReservation = () => {
      // Format selectedDate and selectedHour
  const formattedDate = moment(selectedDate, 'D [de] MMMM, YYYY').format('YYYY-MM-DD');
  const formattedHour = moment(selectedHour, 'h:mm A').format('HH:mm:ss');

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO Soli_Lab (correo_soli, fecha, hora, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userData.correo, formattedDate, formattedHour, userData.p_nombre, userData.s_nombre, userData.p_apellido, userData.s_apellido, duration, selectedLab, userData.cedula],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('Reservacion', 'La reservacion se ha hecho con exito, favo conectese con la red local para enviar al servidor.');
            navigation.navigate('HomeScreen');
          } else {
            Alert.alert('Error', 'No se pudo hacer la reservacion, intente de nuevo.');
          }
        },
        (error) => {
          console.log('error: ', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Confirma Tu Reservación</Text>
    <Text style={styles.info}>Fecha: {selectedDate}</Text>
    <Text style={styles.info}>Hora: {selectedHour}</Text>
      <Text style={styles.label}>Cantidad de hora:</Text>
      <Picker
        selectedValue={duration}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}
      >
        {/* Assuming the lab can be reserved for a maximum of 8 hours */}
        {[...Array(8)].map((_, index) => (
          <Picker.Item key={index} label={`${index + 1}`} value={index + 1} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={confirmReservation}>
        <Text style={styles.buttonText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
  picker: {
    width: 200,
    height: 50,
  },
  button: {
    marginTop: 30,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ReservationScreen;