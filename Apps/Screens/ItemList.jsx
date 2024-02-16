import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getFirestore ,collection, getDocs, orderBy, limit, query, where } from "firebase/firestore";
import {app} from "../../firebaseConfig"
import LatestListItem from '../Commponents/HomeScreen/LatestListItem';


export default function ItemList() {
  const {params} = useRoute()
  const [itemlist,setItemlist] = useState([])
  const [isloading,setisloading] = useState(true)
  const db = getFirestore(app);

  const getItemBypram = async ()=>{
    setItemlist([])
    const q = query(collection(db,'UserPost'),where('category','==',params.category))
    const querySnapshot = await getDocs(q);
    setisloading(false)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setItemlist(itemlist=>[...itemlist,doc.data()])
    });
  }

  useEffect(()=>{
    params&&getItemBypram()
  },[params])

  return (
    <View>
    {
      isloading? <ActivityIndicator size={'large'}/>
      :
      itemlist.length>0? <LatestListItem latestList={itemlist}/>
      :
      <Text className='p-1 text-center font-bold text-[20px]'>No Post Found</Text>
    }
      
    </View>
  )
}