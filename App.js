import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import OnboardingScreen from './screens/OnBoardingScreen';
import CameraScreen from './screens/CameraScreen';
import InformationScreen from './screens/InformationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
