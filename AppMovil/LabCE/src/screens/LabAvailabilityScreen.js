import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Generate dummy data representing 3 weeks of lab availability
const generateDummyData = (weeks) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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

  // Function to handle navigation to view availability for the next week
  const onNextWeek = () => {
    if (currentWeek < 2) { // Allow navigation up to 3 weeks ahead
      setCurrentWeek(currentWeek + 1);
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
    // Implement your reservation logic here
    // For example, navigate to a reservation screen with the selected time slot
  };

  // Filter the data to show only the current week
  const currentWeekData = availabilityData.filter(day => day.week === currentWeek);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratory Availability</Text>
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
              <Text style={styles.dayHeaderText}>{day.day}</Text>
              {day.slots.map((slot, slotIndex) => (
                <TouchableOpacity 
                  key={slotIndex} 
                  style={[styles.timeSlot, slot ? styles.available : styles.unavailable]} 
                  onPress={() => reserveSlot(dayIndex, slotIndex)}
                >
                  <Text>{slot ? 'Available' : 'Unavailable'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.nextWeekButton} onPress={onNextWeek}>
        <Text style={styles.nextWeekButtonText}>Next Week</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... (styles remain unchanged)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hourColumn: {
    marginRight: 10,
    width: 80,
  },
  hourHeader: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  dayColumn: {
    marginRight: 10,
  },
  dayHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeSlot: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  available: {
    backgroundColor: 'lightgreen',
  },
  unavailable: {
    backgroundColor: 'lightcoral',
  },
  nextWeekButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  nextWeekButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
