import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';
import { Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function SuccesfullPasswordChangeScreen({route}) {
  const navigation = useNavigation();


  /*
  useEffect(() => {
    fetchOrderDetails(orderId);
  });

  const fetchOrderDetails = orderId => {
    fetch(`http://10.0.2.2:5274/order/${orderId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error(`Order with ID ${orderId} not found`);
        } else {
          throw new Error(
            `Failed to fetch order details for order ID ${orderId}`,
          );
        }
      })
      .then(data => {
        setOrderDetails(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching order details:', error);
        setLoading(false);
        Alert.alert('Error', error.message); // Show the error message from the caught error
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text>Error: Failed to fetch order details</Text>
      </View>
    );
  }

  */


  return (
    <ImageBackground
      source={require('../Images/circuits.png')}
      style={styles.background}
      resizeMode="cover">
    <View style={styles.container}>
        <Text style={styles.title}> Contraseña cambiada con exito</Text>
        <View>
                <Image
                source={require('../Images/check.png')} 
                style={styles.centerImage}
            />
        </View>
    </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Volver a inicio"
            onPress={() => navigation.navigate('HomeScreen')}
            color="#800080" // Purple
          />
        </View>
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
  centerImage: {
    width: 200, 
    height: 200, 
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});