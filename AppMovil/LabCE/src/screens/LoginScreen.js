
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { db } from '../DB/updateDB.js'; 
import {getClientId, setClientId} from '../globalVariables/clientID';



// @ts-ignore
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkClientId = async () => {
      const clientId = await getClientId();
      if (clientId != null) {
        navigation.navigate('HomeScreen');
      }
    };

    checkClientId();
  }, [navigation]);

  const handleLogin = () => {
    // Prepare user data
    const userData = {
      correo: email,
      contrasena: password,
    };
  
    // Check if the user is in the database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Usuario WHERE correo = ? AND contrasena = ?',
        [userData.correo, userData.contrasena],
        (tx, results) => {
          if (results.rows.length > 0) {
            Alert.alert('Inicio de sesion', 'Se ha iniciado sesion con exito.');
            setClientId(results.rows.item(0).cedula);
            navigation.navigate('HomeScreen');
          } else {
            Alert.alert('Error', 'El usuario o la contrasena son incorrectos.');
          }
        },
        (tx, error) => {
          // Handle the error
          console.error('Failed to check user:', error);
        }
      );
    });
  };
  

  return (
    <ImageBackground
    source={require('../Images/circuits.png')}
      style={styles.background}
      resizeMode="cover">
        <Text style={styles.title}>Inicio de Sesión</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#666"
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              color="#841584"
            />
          </View>

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
    marginBottom: 10,

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 225,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 25,
    marginRight: 25,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});
