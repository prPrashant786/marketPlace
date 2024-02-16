import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


export default function ProductDetail({ navigation }) {
    const {params} = useRoute();
    const [productitem,setProductitem] = useState([]);

    useEffect(()=>{
        params&&setProductitem(params.product)
        shareBtn()
    },[params,navigation])

    const sendEmailmsg = ()=>{
      const subject = 'Regarding ' + productitem.title;
      const body = 'Hi ' + productitem.userName + "\n"+ "I am Intrested in this Product"
      Linking.openURL('mailto:'+productitem.userEmail + "?subject=" + subject + "&body=" + body); 
    }

    const shareBtn = ()=>{
      navigation.setOptions({
        headerRight: () => (
          <Ionicons name="share-social" size={24} color="black" 
            onPress={()=>shareProduct()}
            style={{marginRight:10}}
          />
        ),
      });  
    }

    const shareProduct = async ()=>{
      const content = {
        message:productitem.title+"\n"+productitem.desc
      }
      Share.share(content).then(resp => {
        console.log(resp)
      },(error)=>{
        console.log(error)
      })
    }

  return (
    <ScrollView className='p-1'>
      <Image 
        source={{uri:productitem.image}}
        className='w-full h-[350px]'
      />
      <View className='px-2 bg-white mt-[-20px] rounded-t-3xl'>
        <Text className='mt-2 pt-2 text-[24px] font-bold text-grey-200'>{productitem.title}</Text>
        
        <View className= 'items-baseline'>
        <Text className='p-1 bg-blue-300 rounded-lg text-gray-800 font-extrabold' >{productitem.category}</Text>
        </View>

        <Text className='mt-3 font-bold text-[18px]'>Description</Text>
        <Text className='text-[16px] text-gray-500'>{productitem.desc}</Text>

        <Text className='mt-2 font-bold text-[25px] text-blue-500'>${productitem.price}</Text>

         {/* /*User Details*/}
         <View className='mt-3 flex-1 bg-blue-100 flex-row border-[1px] p-1 rounded-xl'>
          <Text className='text-[16px]'>Uploaded By:-</Text>
         <View className='px-2 font-semibold'>
            <Text className='text-[16px] font-black'>{productitem.userName}</Text>
            <Text className='text-[16px] text-blue-500'>{productitem.userEmail}</Text>
        </View>
        </View>

        <TouchableOpacity 
          onPress={()=>{
            sendEmailmsg()
          }}
          className='my-3 border-[1px] rounded-full items-center bg-blue-500'>
          <Text className='p-3 text-white text-[20px]'>Send Message</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}