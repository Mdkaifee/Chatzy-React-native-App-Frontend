import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chat"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: () => (
            <Image
              source={require('../Src/Icon/chat.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../Src/Icon/Profile.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
