import React from 'react';
import {View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import {cleanClientId} from '../globalVariables/clientID';

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../Images/circuits.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Inicio</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Ver solicitudes de préstamos"
            onPress={() => navigation.navigate('LoansScreen')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Solicitar laboratorio"
            onPress={() => navigation.navigate('LaboratoriesScreen')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cambiar contraseña"
            onPress={() => navigation.navigate('PasswordChangeScreen')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cerrar sesión"
            onPress={() => [cleanClientId(), navigation.navigate('LoginScreen')]}
          />
        </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    marginVertical: 10,
    width: '70%',
  },
});

export default HomeScreen;