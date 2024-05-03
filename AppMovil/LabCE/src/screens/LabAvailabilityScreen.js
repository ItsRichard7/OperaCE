import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment'; // Make sure to install moment.js with `npm install moment`
import { db } from '../DB/updateDB.js'; 



export default function LabAvailabilityScreen({ route, navigation }) {
  const labName = route.params.labName;
  const [currentWeek, setCurrentWeek] = useState(0); // Index of the current week
  const [availabilityData, setAvailabilityData] = useState([]); // Availability data for the lab

   // Assuming currentWeek is a number representing the week of the year
   const startDateOfWeek = moment().week(currentWeek).startOf('week');

   // Generate the dates for the current week
   const datesOfWeek = [...Array(7)].map((_, i) => startDateOfWeek.clone().add(i, 'days'));

     // Assuming currentWeek is a number representing the week of the year
  const endDateOfWeek = moment().week(currentWeek).endOf('week');

  // Hours of operation
const hours = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', 
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', 
  '9:00 PM', '10:00 PM', '11:00 PM', '12:00 PM'
];

const dias = [
  'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
];


  useEffect(() => {
    fetchReservations(labName);
  }, []);
  

  const initialAvailability = Array(7).fill(null).map(() => Array(hours.length).fill(true));


  // Generate dummy data representing 3 weeks of lab availability
  function updateAvailabilityData(reservations, availability = initialAvailability) {
    // Assuming availability is a 2D array representing days and slots
    if (Array.isArray(reservations) && reservations.length > 0) {
    reservations.forEach(reservation => {
      const startDate = new Date(reservation.fecha);
      const startHour = startDate.getHours();
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
  
      if (startIndex !== -1) {
        // Mark the slots as unavailable
        for (let i = startIndex; i < startIndex + duration && i < hours.length; i++) {
          // Assuming availability[dayIndex] is an array of slots for the day
          const dayIndex = startDate.getDay();
          availability[dayIndex][i] = false; // false indicates unavailable
        }
      }
    });
  } else {
    // If reservations is not an array or is empty, log a message and do nothing
    console.log('No reservations found or invalid data structure:', reservations);
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
        // Do something with the updated availability, such as updating the UI or storing it
      },
      (tx, error) => {
        console.error('Failed to fetch reservations:', error);
      }
    );
  });
};

  /*
  const updateAvailabilityData = (reservations) => {
    const newAvailabilityData = [...availabilityData];
    reservations.forEach((reservation) => {
      const date = moment(reservation.fecha);
      const week = date.week();
      const dayIndex = date.day();
      const hourIndex = moment(reservation.hora, 'HH:mm').hour();
      const duration = reservation.cant_horas;
      for (let i = 0; i < duration; i++) {
        const dayData = newAvailabilityData.find(day => day.week === week && dayIndex === newAvailabilityData.indexOf(day));
        if (dayData) {
          dayData.slots[hourIndex + i] = false;
        }
      }
    });
    setAvailabilityData(newAvailabilityData);
  };
  */

 
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
  const dayData = transformedAvailabilityData.find(day => day.week === currentWeek && dayIndex === transformedAvailabilityData.indexOf(day));
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

const transformedAvailabilityData = availabilityData.map((slots, index) => ({
  week: currentWeek, // Assuming all data is for week 0, this should be dynamic based on your application logic
  day: dias[index], // Replace with actual day names if available
  slots: slots.map(slot => ({ available: slot })) // Transforming boolean values into objects
}));

// Now, filter the transformed data for the current week
const currentWeekData = transformedAvailabilityData.filter(day => day.week === currentWeek);

// Log the transformed data to verify its structure
console.log('Transformed Availability Data:', transformedAvailabilityData);
console.log('Filtered Current Week Data:', currentWeekData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disponibilidad del laboratorio {labName}</Text>
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