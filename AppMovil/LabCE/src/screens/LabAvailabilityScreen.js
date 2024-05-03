import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment'; //npm install moment
import { db } from '../DB/updateDB.js'; 

export default function LabAvailabilityScreen({ route, navigation }) {
  const labName = route.params.labName;
  const [currentWeek, setCurrentWeek] = useState(0); // Index of the current week
  const [availabilityData, setAvailabilityData] = useState([]); // Availability data for the lab

 // Get the current date
const currentDate = moment().startOf('isoWeek'); // Start the week on Monday

// Assuming currentWeek is a number representing the week of the year
const startDateOfWeek = currentDate.clone().startOf('week');

// Generate the dates for the current week
const datesOfWeek = [...Array(7)].map((_, i) => startDateOfWeek.clone().add(i, 'days'));


  // Assuming currentWeek is a number representing the week of the year
  const endDateOfWeek = currentDate.clone().endOf('week');

  // Hours of operation
  const hours = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', 
    '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', 
    '9:00 PM', '10:00 PM', '11:00 PM', '12:00 PM'
  ];

  const dias = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  useEffect(() => {
    fetchReservations(labName);
  }, []);
  
  const initialAvailability = Array(7).fill(null).map(() => Array(hours.length).fill(true));

  
function updateAvailabilityData(reservations, availability = initialAvailability) {
  console.log("current date:", currentDate);
  console.log("startDateOfWeek:", startDateOfWeek);
  console.log("endDateOfWeek:", endDateOfWeek);
  // Assuming availability is a 2D array representing days and slots
  if (Array.isArray(reservations) && reservations.length > 0) {
    reservations.forEach(reservation => {
      const startDate = moment(reservation.fecha, 'YYYY-MM-DD').startOf('day');
      const startHour = parseInt(reservation.hora.split(':')[0], 10); // Extract the hour from the "hora" field
  const duration = parseInt(reservation.cant_horas, 10);

  // Find the index for the starting hour
  const startIndex = hours.findIndex(hour => {
    const hourParts = hour.split(/[: ]/); // Split by colon and space
    let hourNumber = parseInt(hourParts[0], 10);
    // Convert 12-hour format to 24-hour format
    if (hourParts[2] === 'PM' && hourNumber !== 12) hourNumber += 12;
    if (hourParts[2] === 'AM' && hourNumber === 12) hourNumber = 0;
    return hourNumber === startHour;
  });

  console.log(`Start hour: ${startHour}, Start index: ${startIndex}`);

  if (startIndex !== -1) {
    // Mark the slots as unavailable
    for (let i = startIndex; i < startIndex + duration && i < hours.length; i++) {
      // Assuming availability[dayIndex] is an array of slots for the day
      const dayIndex = startDate.day();
      availability[dayIndex][i] = false; // false indicates unavailable
      console.log(`Marked slot at day ${dayIndex}, hour ${i} as unavailable`);
    }
  }
});
  } else {
    // If reservations is not an array or is empty, log a message and do nothing
    console.log('No reservations to process.');
  }

  return availability;
}

  // Modify the fetchReservations function to pass the initial availability
  const fetchReservations = (labName) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT fecha, hora, cant_horas FROM Soli_Lab WHERE lab_nombre = ?`,
        [labName],
        (tx, results) => {
          const rows = results.rows.raw();
          setAvailabilityData(updateAvailabilityData(rows));
        },
        (tx, error) => {
          console.error('Failed to fetch reservations:', error);
        }
      );
    });
  };
  
  // Function to handle navigation to view availability for the next week
  const onNextWeek = () => {
    if (currentWeek < 2) { // Allow navigation up to 3 weeks ahead
      setCurrentWeek(currentWeek + 1);
    } else {
      Alert.alert('Error', 'No data available for the next week.');
    }
  };

  // Function to handle navigation to view availability for the past week
  const onPastWeek = () => {
    if (currentWeek > 0) { // Allow navigation up to 3 weeks ahead
      setCurrentWeek(currentWeek - 1);
    } else {
      Alert.alert('Error', 'No data available for the past week.');
    }
  };

  // Function to handle reserving a time slot
const reserveSlot = (dayIndex, hourIndex) => {
  const dayData = transformedAvailabilityData.find(day => day.week === currentWeek && dayIndex === transformedAvailabilityData.indexOf(day));
  if (!dayData.slots[hourIndex]) {
    Alert.alert('Error', 'Este espacio no está disponible para reservar.');
    return;
  }
  // Navigate to the ReservationScreen with the selected date and hour
  const selectedDate = datesOfWeek[dayIndex].format('D [de] MMMM, YYYY');
  const selectedHour = hours[hourIndex];
  navigation.navigate('ReservationScreen', {
    selectedLab: labName,
    selectedDate: selectedDate,
    selectedHour: selectedHour,
  });
};

  const transformedAvailabilityData = availabilityData.map((slots, index) => ({
    week: currentWeek, // Assuming all data is for week 0, this should be dynamic based on your application logic
    day: dias[index], 
    slots: slots.map(slot => ({ available: slot })) // Transforming boolean values into objects
  }));

  // Now, filter the transformed data for the current week
  const currentWeekData = transformedAvailabilityData.filter(day => day.week === currentWeek);

  //console.log('Transformed availability data:', JSON.stringify(transformedAvailabilityData, null, 2));
//console.log('Current week data:', JSON.stringify(currentWeekData, null, 2));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disponibilidad del laboratorio {labName}</Text>
      {/* Month display */}
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>
          {startDateOfWeek.format('D [de] MMMM')} - {endDateOfWeek.format('D [de] MMMM [de] YYYY')}
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
              {day.day} {datesOfWeek[dayIndex].locale('es').format('D')} {/* Day and date */}
            </Text>
            {day.slots.map((slot, slotIndex) => (
            <TouchableOpacity 
              key={slotIndex} 
              style={[styles.timeSlot, slot.available ? styles.available : styles.unavailable]} 
              onPress={() => reserveSlot(dayIndex, slotIndex)}
            >
              <Text style={styles.slotText}>{slot.available ? 'Disponible' : 'Reservado'}</Text>
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
    marginTop: 25,
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
});
