import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tab1} from './Tab1';
import Icon from 'react-native-vector-icons/Ionicons';
import {Tab2Screen} from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'purple',
        tabBarLabelStyle: {marginBottom: 10},
        tabBarStyle: {
          elevation: 0,
          borderWidth: 0,
          backgroundColor: '#ffffff20',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Tab1}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
