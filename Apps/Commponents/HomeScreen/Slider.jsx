import { View, Text, FlatList,Image } from 'react-native'
import React from 'react'

export default function Slider({sliderList}) {
  return (
    <View className='p-1'>
      <FlatList
        horizontal={true}
        data={sliderList}
        renderItem={({item,index})=>(
            <View className=''>
                <Image 
                    source={{uri:item?.image}}
                    className='m-1 h-[200px] w-[300px] object-fill'
                />
            </View>
        )}
      />
    </View>
  )
}