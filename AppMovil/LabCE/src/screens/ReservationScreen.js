import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; //npm install @react-native-picker/picker
import { db } from '../DB/updateDB.js'; 
import { getClientId } from '../globalVariables/clientID.js';


const ReservationScreen = ({ route, navigation }) => {
  const { selectedLab, selectedDate, selectedHour } = route.params;
  const [duration, setDuration] = useState(1); // Default duration is 1 hour
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      confirmReservation();
    }
  }, [userData]);

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
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Soli_Lab (correo_soli, fecha, hora, p_nombre, s_nombre, p_apellido, s_apellido, cant_horas, lab_nombre, user_ced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userData.correo, selectedDate, selectedHour, userData.p_nombre, userData.s_nombre, userData.p_apellido, userData.s_apellido, duration, selectedLab, userData.cedula],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Se ha creado la solicitud con exito',
              [
                {
                  text: 'Ok',
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Reservation Failed');
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
      <Text style={styles.title}>Confirm Your Reservation</Text>
      <Text style={styles.info}>Date: {selectedDate}</Text>
      <Text style={styles.info}>Hour: {selectedHour}</Text>
      <Text style={styles.label}>Select Duration (hours):</Text>
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