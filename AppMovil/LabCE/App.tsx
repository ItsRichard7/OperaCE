import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import LoansScreen from './src/screens/LoansScreen';
import LaboratoriesScreen from './src/screens/LaboratoriesScreen';
import LabAvailabilityScreen from './src/screens/LabAvailabilityScreen';
//import RegisterScreen from './screens/RegisterScreen';
import { enableScreens } from 'react-native-screens';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LabAvailabilityScreen">
        <Stack.Screen name = "LoginScreen" component = {LoginScreen} options = {{}} />
        <Stack.Screen name = "LoansScreen" component = {LoansScreen} options = {{}} />
        <Stack.Screen name = "LaboratoriesScreen" component = {LaboratoriesScreen} options = {{}} />
        <Stack.Screen name = "LabAvailabilityScreen" component = {LabAvailabilityScreen} options = {{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}