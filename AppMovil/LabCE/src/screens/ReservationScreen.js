import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; //npm install @react-native-picker/picker

const ReservationScreen = ({ route, navigation }) => {
  const { selectedDate, selectedHour } = route.params;
  const [duration, setDuration] = useState(1); // Default duration is 1 hour

  const confirmReservation = () => {
    // Logic to handle the reservation confirmation
    // This could involve updating state, sending data to a server, etc.
    console.log(`Lab reserved on ${selectedDate} at ${selectedHour} for ${duration} hour(s).`);
    // Navigate to a confirmation screen or alert the user of the successful reservation
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