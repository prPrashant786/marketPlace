import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Commponents/HomeScreen/Header'
import Slider from '../Commponents/HomeScreen/Slider'
import { getFirestore ,collection, getDocs } from "firebase/firestore";
import {app} from "../../firebaseConfig"
import Category from '../Commponents/HomeScreen/Category';


export default function Homescreen() {
  const db = getFirestore(app);

  const [sliderList,setsliderList] = useState([])
  const [categoryList,setcategoryList] = useState([]);
  useEffect(()=>{
    getSlider()
    getCatagoryList()
  },[])

  //USE To GEtSLider for Home Screen//
  const getSlider = async()=>{
    setsliderList([])
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setsliderList(sliderList=>[...sliderList,doc.data()])
    });
  }

  const getCatagoryList = async ()=>{
    setcategoryList([])
    const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setcategoryList(categoryList=>[...categoryList,doc.data()])
  });
  }


  return (
    <View className='px-6 py-11'>
      <Header/>
      <Slider sliderList={sliderList}/>
      <Category categoryList={categoryList}/>
    </View>
  )
}