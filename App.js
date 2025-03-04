import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './Source/TabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
// import HomeScreen from './Source/HomeScreen';
import AboutUs from './Source/AboutUs';
import SignUp from './Source/SignUp';
import Login from './Source/Login';
import SplashScreen from './Source/SplashScreen';
import ChatScreen from './Source/ChatScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ChatScreen" component={ChatScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
