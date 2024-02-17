import { View, Text,ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import { getFirestore ,collection, getDocs, orderBy, limit } from "firebase/firestore";
import {app} from "../../firebaseConfig"
import LatestListItem from '../Commponents/HomeScreen/LatestListItem';

export default function Explorescreen({ navigation }) {
  const db = getFirestore(app);
  const [latestList,setlatestList] = useState([]);

  const getLatestList = async ()=>{
    setlatestList([])
    const querySnapshot = await getDocs(collection(db, "UserPost"),orderBy("createdAt",'desc'));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setlatestList(latestList=>[...latestList,doc.data()])
  });
  }

  useEffect(()=>{
    getLatestList()
  },[navigation])


  return (
    <View className='p-5 py-8'>
    <Text className='text-[30px] pt-2 font-bold'>Explore More</Text>
      <ScrollView>
        <LatestListItem latestList={latestList}/>
      </ScrollView>
    </View>
  )
}