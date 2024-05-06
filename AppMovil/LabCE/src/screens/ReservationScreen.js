import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../DB/updateDB.js'; 
import { getClientId } from '../globalVariables/clientID.js';
import moment from 'moment'; 
import { useNavigation } from '@react-navigation/native';

const ReservationScreen = ({ route, navigation }) => {
  const { selectedLab, selectedDate, selectedHour } = route.params;
  const [duration, setDuration] = useState(1);
  const [userData, setUserData] = useState(null);

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
    const formattedDate = moment(selectedDate, 'D [de] MMMM, YYYY').format('YYYY-MM-DD');
    const formattedHour = moment(selectedHour, 'h:mm A').format('HH:mm:ss');

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO Soli_Lab (correo_soli, fecha, hora, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userData.correo, formattedDate, formattedHour, userData.p_nombre, userData.s_nombre, userData.p_apellido, userData.s_apellido, duration, selectedLab, userData.cedula],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Reservacion', 'La reservacion se ha hecho con exito, favor conectese con la red local para enviar al servidor.');
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

let formattedDate = selectedDate.replace(' de ', ' ').replace(',', '');

let parts = formattedDate.split(' ');
let months = {January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12'};
let formattedDateJS = `${parts[2]}-${months[parts[1]]}-${parts[0].padStart(2, '0')}`;

let displayDate = new Date(formattedDateJS);
displayDate.setDate(displayDate.getDate() + 2);

let formatter = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
let nextDay = formatter.format(displayDate);






  return (
    <ImageBackground
      source={require('../Images/circuits.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Confirma Tu Reservación</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Laboratorio: {selectedLab}</Text>
          <Text style={styles.info}>Fecha: {nextDay}</Text>
          <Text style={styles.info}>Hora: {selectedHour}</Text>
        </View>
        <Text style={styles.label}>Cantidad de horas:</Text>
        <Picker
          selectedValue={duration}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}
        >
          {[...Array(8)].map((_, index) => (
            <Picker.Item key={index} label={`${index + 1}`} value={index + 1} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={confirmReservation}>
          <Text style={styles.buttonText}>Confirmar Reservación</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },
  picker: {
    width: 200,
    height: 50,
    color: '#333',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ReservationScreen;
