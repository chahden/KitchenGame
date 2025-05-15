import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Pages/index';
import LoginScreen from './Pages/login';
import MarketplaceScreen from './Pages/Marketplace';
import MediaScreen from './Pages/Media';
import EsportScreen from './Pages/Esport';
import AddUserScreen from './Pages/AddUser';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Media" component={MediaScreen} />
        <Stack.Screen name="Esport" component={EsportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
