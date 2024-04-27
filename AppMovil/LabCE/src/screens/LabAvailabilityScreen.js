import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment'; // Make sure to install moment.js with `npm install moment`

// Generate dummy data representing 3 weeks of lab availability
const generateDummyData = (weeks) => {
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  return Array.from({ length: weeks }, (_, weekIndex) =>
    days.map(day => ({
      week: weekIndex,
      day: day,
      slots: Array.from({ length: 10 }, () => Math.random() > 0.5) // Randomly generate availability
    }))
  ).flat();
};

const availabilityData = generateDummyData(3);

// Hours of operation
const hours = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export default function LabAvailabilityScreen({ route, navigation }) {
  const [currentWeek, setCurrentWeek] = useState(0); // Index of the current week

   // Assuming currentWeek is a number representing the week of the year
   const startDateOfWeek = moment().week(currentWeek).startOf('week');

   // Generate the dates for the current week
   const datesOfWeek = [...Array(7)].map((_, i) => startDateOfWeek.clone().add(i, 'days'));

     // Assuming currentWeek is a number representing the week of the year
  const endDateOfWeek = moment().week(currentWeek).endOf('week');


 
  // Function to handle navigation to view availability for the next week
  const onNextWeek = () => {
    if (currentWeek < 2) { // Allow navigation up to 3 weeks ahead
      setCurrentWeek(currentWeek + 1);
    } else {
      Alert.alert('Error', 'No data available for the next week.');
    }
  };

    // Function to handle navigation to view availability for the next week
    const onPastWeek = () => {
        if (currentWeek > 0) { // Allow navigation up to 3 weeks ahead
          setCurrentWeek(currentWeek - 1);
        } else {
          Alert.alert('Error', 'No data available for the next week.');
        }
      };

// Function to handle reserving a time slot
const reserveSlot = (dayIndex, hourIndex) => {
  const dayData = availabilityData.find(day => day.week === currentWeek && dayIndex === availabilityData.indexOf(day));
  if (!dayData.slots[hourIndex]) {
    Alert.alert('Error', 'This slot is not available for reservation.');
    return;
  }
  // Navigate to the ReservationScreen with the selected date and hour
  const selectedDate = datesOfWeek[dayIndex].format('MMMM D, YYYY');
  const selectedHour = hours[hourIndex];
  navigation.navigate('ReservationScreen', {
    selectedDate: selectedDate,
    selectedHour: selectedHour,
  });
};

  // Filter the data to show only the current week
  const currentWeekData = availabilityData.filter(day => day.week === currentWeek);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disponibilidad del laboratorio</Text>
      {/* Month display */}
      <View style={styles.monthContainer}>
            <Text style={styles.monthText}>
              {startDateOfWeek.format('MMMM D')} - {endDateOfWeek.format('MMMM D YYYY')}
            </Text>
          </View>
      <ScrollView horizontal={true}>
        <View style={styles.weekContainer}>
          {/* Hour headers */}
          <View style={styles.hourColumn}>
            {hours.map((hour, hourIndex) => (
              <Text key={hourIndex} style={styles.hourHeader}>{hour}</Text>
            ))}
          </View>
          {/* Availability data for the current week */}
          {currentWeekData.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayColumn}>
              <Text style={styles.dayHeaderText}>
              {day.day} {datesOfWeek[dayIndex].format('D')} {/* Day and date */}
                </Text>
              {day.slots.map((slot, slotIndex) => (
                <TouchableOpacity 
                  key={slotIndex} 
                  style={[styles.timeSlot, slot ? styles.available : styles.unavailable]} 
                  onPress={() => reserveSlot(dayIndex, slotIndex)}
                >
                  <Text style={styles.slotText}>{slot ? 'Disponible' : 'Reservado'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={onNextWeek}>
        <Text style={styles.buttonText}>Siguiente semana</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPastWeek}>
        <Text style={styles.buttonText}>Semana anterior</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    labTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
    monthContainer: {
      paddingHorizontal: 10,
      marginBottom: 50,
    },
    monthText: {
      fontSize: 18,
      textAlign: 'center',
    },
    dayHeaderText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
    },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  scheduleContainer: {
    flex: 1,
    marginBottom: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hourColumn: {
    marginTop: 25, // Adjust this value as needed
    width: 80,
    paddingBottom: 10,
  },
  dayColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  dayHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  hourHeader: {
    fontSize: 16,
    height: 40,
    lineHeight: 40,
    textAlign: 'right',
    paddingRight: 10,
  },
  timeSlot: {
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  available: {
    backgroundColor: '#c8e6c9',
  },
  unavailable: {
    backgroundColor: '#ffcdd2',
  },
  slotText: {
    fontSize: 12,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196f3',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  // ... (add any additional styles you may need)
});
