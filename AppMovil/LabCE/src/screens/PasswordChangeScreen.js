
import React, {useState} from 'react';
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
import {getClientId} from '../globalVariables/clientID';
import { db } from '../DB/updateDB.js';

// @ts-ignore
export default function PasswordChangeScreen() {
  const [currentpassword, setCurrentPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, confirmSetNewPassword] = useState('');
  const navigation = useNavigation();

  const handlePasswordChange = () => {
    const clientId = getClientId();

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT contrasena FROM Usuario WHERE cedula = ?`,
        [clientId],
        (tx, results) => {
          
          const rows = results.rows.raw();
        
          if (rows.length > 0) {
            const user = rows[0];
            if (user.contrasena !== currentpassword) {
              Alert.alert('Error', 'Contraseña actual está incorrecta');
            } else if (newpassword !== confirmnewpassword) {
              Alert.alert('Error', 'Las contraseñas no coinciden');
            } else {
              console.log('Updating password...');
              tx.executeSql(
                `UPDATE Usuario SET contrasena = ? WHERE cedula = ?`,
                [newpassword, clientId],
                () => {
                  console.log('Password changed successfully');
                  Alert.alert('Success', 'Password changed successfully');
                  navigation.goBack();
                },
                (tx, error) => {
                  console.error('Failed to update password:', error);
                }
              );
            }
          } else {
            console.error('No user found with the provided client ID');
          }
        },
        (tx, error) => {
          console.error('Failed to fetch user data:', error);
        }
      );
    });
  };

  return (
    <ImageBackground
    source={require('../Images/circuits.png')}
      style={styles.background}
      resizeMode="cover">
        <Text style={styles.title}>Cambiar contraseña</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña actual"
            onChangeText={text => setCurrentPassword(text)}
            value={currentpassword}
            secureTextEntry={true}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            onChangeText={text => setNewPassword(text)}
            value={newpassword}
            secureTextEntry={true}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar nueva contraseña"
            onChangeText={text => confirmSetNewPassword(text)}
            value={confirmnewpassword}
            secureTextEntry={true}
            placeholderTextColor="#666"
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Cambiar contraseña"
              onPress={handlePasswordChange}
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
    //marginTop: 10,

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 225,
    //marginBottom: 10,
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
