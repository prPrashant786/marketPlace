import { View, Text,Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const {user} = useUser();

  return (
    <View>
        <View className='flex-row items-center gap-2'>
        <Image 
            source={{uri:user?.imageUrl}} 
            className='rounded-full w-12 h-12'
        />
        <View>
            <Text className='text-[14px]'>Welcome</Text>
            <Text className='text-[18px] font-bold'>{user?.fullName}</Text>
        </View>
        </View>

        <View  className='mt-4 py-3 px-4 bg-white rounded-full flex-row items-center border-[0.4px]'>
            <Ionicons name="search" size={24} color="grey" />
            <TextInput
            className='px-2 w-full'
            placeholder='Search'/>
        </View>
    </View>
  )
}