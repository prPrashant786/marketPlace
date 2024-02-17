import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ExploreStackNaviation from './ExploreStackNaviation';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();

export default function ProfileScreenStackNavigation() {
  return (
    <Stack.Navigator
    >
        <Stack.Screen name='myprofile' component={ProfileScreen}
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen name='explore' component={ExploreStackNaviation} 
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen name='myproduct' component={MyProducts} 
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen name='productDetails' component={ProductDetail}/>
    </Stack.Navigator>
  )
}