import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from '../Screens/HomeScreen';
import Explorescreen from '../Screens/ExploreScreen';
import AddpostScreen from '../Screens/AddpostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
        <Tab.Screen name='home' component={Homescreen}
            options={{
                tabBarLabel : ({color}) => (
                    <Text className='text-12' style={{marginBottom:3,color:color}}>Home</Text>
                ),
                tabBarIcon : ({color,size}) => (
                    <Ionicons name="home" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name='explore' component={Explorescreen}
            options={{
                tabBarLabel : ({color}) => (
                    <Text className='text-12' style={{marginBottom:3,color:color}}>Explore</Text>
                ),
                tabBarIcon : ({color,size}) => (
                    <Ionicons name="search" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name='addpost' component={AddpostScreen}
            options={{
                tabBarLabel : ({color}) => (
                    <Text className='text-12' style={{marginBottom:3,color:color}}>Addpost</Text>
                ),
                tabBarIcon : ({color,size}) => (
                    <Ionicons name="add-circle" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name='profile' component={ProfileScreen}
            options={{
                tabBarLabel : ({color}) => (
                    <Text className='text-12' style={{marginBottom:3,color:color}}>Profile</Text>
                ),
                tabBarIcon : ({color,size}) => (
                    <Ionicons name="person-circle" size={size} color={color} />
                )
            }}
        />
    </Tab.Navigator>
  )
}