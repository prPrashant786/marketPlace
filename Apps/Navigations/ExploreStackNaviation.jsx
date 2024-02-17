import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Explorescreen from '../Screens/ExploreScreen';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();

export default function ExploreStackNaviation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='explore-tab' component={Explorescreen}
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen name='productDetails' component={ProductDetail}/>
    </Stack.Navigator>
  )
}