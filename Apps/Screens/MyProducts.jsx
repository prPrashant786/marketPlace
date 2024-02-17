import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {app} from "../../firebaseConfig"
import { useUser } from '@clerk/clerk-expo'
import { getFirestore ,collection, getDocs, orderBy, limit, query, where } from "firebase/firestore";
import LatestListItem from '../Commponents/HomeScreen/LatestListItem';


export default function MyProducts() {
    const {user} = useUser();
    const db = getFirestore(app);
    const [itemlist,setItemlist] = useState([])

    const getItemBypram = async ()=>{
        setItemlist([])
        const q = query(collection(db,'UserPost'),where('userEmail','==',user?.primaryEmailAddress.emailAddress))
        const querySnapshot = await getDocs(q);
        // setisloading(false)
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setItemlist(itemlist=>[...itemlist,doc.data()])
        });
    }

    useEffect(()=>{
        getItemBypram()
    },[])

  return (
    <View className='mx-2 my-12'>
        <Text className='px-6 text-[19px] font-bold'>Your Products</Text>
      <LatestListItem latestList={itemlist}/>
    </View>
  )
}