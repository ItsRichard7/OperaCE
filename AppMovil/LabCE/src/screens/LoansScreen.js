import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';

export default function LoansScreen({navigation}) {
  //const [loans, setLoans] = useState([]);

  const [loans, setLoans] = useState([
    {
      date: '2022-01-01',
      nombre_operador: 'John Doe',
      activo: 'Active',
      estudiante: 'Student 1',
    },
    {
      date: '2022-01-02',
      nombre_operador: 'Jane Doe',
      activo: 'Inactive',
      estudiante: 'Student 2',
    },
    // Add more loans as needed
  ]);
  /*
  useEffect(() => {
    fetchMenu();
  }, []);
  
  const fetchMenu = () => {
    fetch('http://10.0.2.2:5274/dishes')
      .then(response => response.json())
      .then(data => {
        const mergedData = data.dishes.map((dish, index) => {
          return {...dish, ...data.platos[index]};
        });
        setDishes(mergedData);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to fetch menu.');
      });
  };

  */
  return (
    <ImageBackground
    source={require('../Images/circuits.png')}
      style={styles.background}
      resizeMode="cover">
<ScrollView contentContainerStyle={styles.container}>
  <Text style={styles.title}>Solicitudes de préstamos</Text>
  <View style={styles.loansContainer}>
    {loans.map((loan, index) => (
      <View key={index} style={styles.loanContainer}>
        <Text style={styles.loanDetail}>Fecha: {loan.date}</Text>
        <Text style={styles.loanDetail}>Operador: {loan.nombre_operador}</Text>
        <Text style={styles.loanDetail}>Activo: {loan.activo}</Text>
        <Text style={styles.loanDetail}>Estudiante: {loan.estudiante}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Aprobar"
            color="#6E8B3D" // Dark olive green
            //onPress={() =>
              //Aprobacion prestamo
           // }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Rechazar"
            color="#8B0000" // Dark red
            //onPress={() =>
              //Rechazar prestamo
            //}
          />
        </View>
      </View>
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
    paddingTop: 70, // Add top padding here
    paddingBottom: 110, // Add bottom padding here
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  loansContainer: {
    width: '80%',
    marginBottom: 20,
  },
  loanContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loanDetail: {
    marginBottom: 5,
  },
});