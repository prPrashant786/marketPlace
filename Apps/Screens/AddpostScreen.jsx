import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {app} from "../../firebaseConfig"
import { getFirestore,collection, getDocs } from "firebase/firestore";


export default function AddpostScreen() {
  const db = getFirestore(app);
  const [categoryList,setcategoryList] = useState([]);
  useEffect(()=>{
    getCatagoryList();
  },[])
  /**
 * Get categoryList from firebase 
 */
  const getCatagoryList = async ()=>{
    const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setcategoryList(categoryList=>[...categoryList,doc.data()])
  });
  }

  return (
    <View>
      <Text>AddpostScreen</Text>
    </View>
  )
}