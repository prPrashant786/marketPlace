import { View, Text, FlatList, Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Category({categoryList}) {
  const navigation = useNavigation()
  return (
    <View>
      <Text className='p-0 text-[20px] font-bold'>Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({item,index})=>(
          <TouchableOpacity 
          onPress={()=>navigation.navigate('Item-List',{
            category:item.Name
          })}
          className='flex-1 items-center justify-center border-[1px] p-1 border-blue-300 m-1
          h-[80px] rounded-lg bg-blue-50'>
            <Image 
                source={{uri:item?.Icon}}
                className='w-[40px] h-[40px]'
            />
            <Text className='text-[12px] mt-1'>{item?.Name}</Text>
          </TouchableOpacity>
          // console.log(item)
        )}
      />
    </View>
  )
}