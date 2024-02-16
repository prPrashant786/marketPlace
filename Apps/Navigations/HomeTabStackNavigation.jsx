import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();

export default function HomeTabStackNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home' component={Homescreen} 
            options={{headerShown:false}}
        />
        <Stack.Screen name='Item-List' component={ItemList}
            options={({ route }) => ({ title: route.params.category })}
        />
        <Stack.Screen name='productDetails' component={ProductDetail}
        />
    </Stack.Navigator>
  )
}