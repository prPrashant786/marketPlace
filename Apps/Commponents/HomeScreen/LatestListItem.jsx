import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItem from './PostItem'

export default function LatestListItem({latestList}) {
  return (
    <View className='mb-10'>
      
      <FlatList 
        data={latestList}
        numColumns={2}
        renderItem={({item,index})=>( 
          <PostItem item={item}/>
        )}
      />
    </View>
  )
}