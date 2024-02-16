import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity 
        onPress={()=>{navigation.push('productDetails',{
          product:item
        })}}
        className='m-2 p-2 rounded-lg flex-1 border-[0.9px] border-slate-500'>
        <Image source={{uri:item?.image}}
        className='w-full h-[120px]'
        style={{resizeMode: 'contain'}}
        />
        <View className='p-1'>
            <Text className='font-bold text-[15px]'>{item?.title}</Text>
            <Text className='font-bold text-[20px] text-blue-500'>${item?.price}</Text>
        </View>
    </TouchableOpacity>
  )
}