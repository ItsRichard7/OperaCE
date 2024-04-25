import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native';

export default function LaboratoriesScreen({ navigation }) {

//const [laboratories, setLaboratories] = useState([]);
  const [laboratories, setLaboratories] = useState([
    {
      name: 'Laboratorio 1',
      capacity: 30,
      facilities: 'Equipos de última generación',
      assets: ['Computadoras', 'Proyectores', 'Pizarras interactivas'],
    },
    {
      name: 'Laboratorio 2',
      capacity: 25,
      facilities: 'Conexión a internet de alta velocidad',
      assets: ['Computadoras', 'Impresoras'],
    },
    // Add more laboratories as needed
  ]);

  /*
  const navigateToLabsSchedule = (lab) => {
    // Navigate to lab schedule screen passing lab as parameter
    navigation.navigate('LaboratorySchedule', { lab });
  };
  */

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
              onPress={() => navigateToLabDetails(lab)} 
              style={styles.labTouchable}
            >
              <View style={styles.labContainer}>
                <Text style={styles.labName}>{lab.name}</Text>
                <Text style={styles.labSummary}>Capacidad: {lab.capacity}</Text>
                <Text style={styles.labSummary}>Facilidades: {lab.facilities}</Text>
                <Text style={styles.labSummary}>Activos: {lab.assets.join(', ')}</Text>
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
