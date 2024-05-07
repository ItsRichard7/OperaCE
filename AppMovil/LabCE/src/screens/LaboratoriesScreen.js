import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { db } from '../DB/updateDB.js'; 

export default function LaboratoriesScreen({ navigation }) {

  const [laboratories, setLaboratories] = useState([]);    

  useEffect(() => {
    fetchLaboratories();
  }, []);

  const navigateToLabsSchedule = (selectedLab) => {
    // Navigate to lab schedule screen passing lab as parameter
    navigation.navigate('LabAvailabilityScreen', { labName: selectedLab });
  };

  const fetchLaboratories = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT nombre, computadoras, capacidad FROM Laboratorio`,
        [],
        (tx, results) => {
          const rows = results.rows.raw();
          setLaboratories(rows);
        },
        (tx, error) => {
          console.error('Failed to fetch laboratories:', error);
        }
      );
    });
  };


  return (
    <ImageBackground
      source={require('../Images/circuits.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Laboratorios Disponibles</Text>
        <View style={styles.laboratoriesContainer}>
          {laboratories.map((lab, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigateToLabsSchedule(lab.nombre)} 
              style={styles.labTouchable}
            >
              <View style={styles.labContainer}>
              <Text style={styles.labName}>{lab.nombre}</Text>
              <Text style={styles.labSummary}>Capacidad: {lab.capacidad}</Text>
              <Text style={styles.labSummary}>Computadoras: {lab.computadoras}</Text>
              </View>
            </TouchableOpacity>
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
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  laboratoriesContainer: {
    width: '80%',
  },
  labContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  labName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labSummary: {
    marginBottom: 5,
  },
});
