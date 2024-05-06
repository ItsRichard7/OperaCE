import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import PasswordChangeScreen from './src/screens/PasswordChangeScreen';
import LoansScreen from './src/screens/LoansScreen';
import LaboratoriesScreen from './src/screens/LaboratoriesScreen';
import LabAvailabilityScreen from './src/screens/LabAvailabilityScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReservationScreen from './src/screens/ReservationScreen';
import { enableScreens } from 'react-native-screens';
import updateDB from './src/DB/updateDB'; 

enableScreens();

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {

    updateDB();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name = "LoginScreen" component = {LoginScreen} options = {{}} />
        <Stack.Screen name = "HomeScreen" component = {HomeScreen} options = {{}} />
        <Stack.Screen name = "PasswordChangeScreen" component = {PasswordChangeScreen} options = {{}} />
        <Stack.Screen name = "LoansScreen" component = {LoansScreen} options = {{}} />
        <Stack.Screen name = "LaboratoriesScreen" component = {LaboratoriesScreen} options = {{}} />
        <Stack.Screen name = "LabAvailabilityScreen" component = {LabAvailabilityScreen} options = {{}} />
        <Stack.Screen name = "ReservationScreen" component = {ReservationScreen} options = {{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}