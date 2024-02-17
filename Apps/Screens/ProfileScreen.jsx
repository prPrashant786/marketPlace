import { View, Text, Image, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'
import { ANDROID } from 'nativewind/dist/utils/selector'


export default function ProfileScreen() {
  const menuItem = [
    {
      id:1,
      name:'My Products',
      Icon:'https://cdn-icons-png.flaticon.com/512/962/962669.png',
      path:'myproduct'
    },
    {
      id:2,
      name:'Explore',
      Icon:'https://cdn-icons-png.flaticon.com/512/471/471012.png',
      path:'explore'
    },
    {
      id:3,
      name:'Log out',
      Icon:'https://cdn-icons-png.flaticon.com/512/3596/3596125.png'
    }
  ]

  const navigation = useNavigation()
  const {signOut} = useAuth()
  const onMenupress = (item)=>{
      if(item.id!=3){
        navigation.navigate(item.path)
      }
      else{
        ToastAndroid.showWithGravity(
          'Log Out',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );    
        signOut();
      }
  }

  const {user} = useUser();
  return (
    <View>
    <View className='items-center mt-20'>
      <Image 
            source={{uri:user?.imageUrl}} 
            className='rounded-full w-[150px] h-[150px]'
        />
        <Text className='mt-2 font-bold text-[25px]'>{user?.fullName}</Text>
        <Text className='mt-1 font-medium text-[17px] text-blue-500'>{user?.primaryEmailAddress.emailAddress}</Text>
    </View>
    <View className='items-center my-2'>
        <FlatList 
          data={menuItem}
          numColumns={3}
          renderItem={({item,index})=>(   
            <TouchableOpacity 
            onPress={()=>onMenupress(item)}
            className='rounded-2xl border-[1px] m-2 p-3 items-center bg-blue-100'>
              <Image 
              source={{uri:item.Icon}}
              className='w-[50px] h-[50px]'
              />
              <Text className='text-[15px] font-bold'>{item.name}</Text>
            </TouchableOpacity>
        )}
        />
      </View>
    </View>
  )
}