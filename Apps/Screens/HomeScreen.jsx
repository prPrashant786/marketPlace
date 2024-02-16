import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Commponents/HomeScreen/Header'
import Slider from '../Commponents/HomeScreen/Slider'
import { getFirestore ,collection, getDocs, orderBy, limit } from "firebase/firestore";
import {app} from "../../firebaseConfig"
import Category from '../Commponents/HomeScreen/Category';
import LatestListItem from '../Commponents/HomeScreen/LatestListItem';


export default function Homescreen() {
  const db = getFirestore(app);

  const [sliderList,setsliderList] = useState([])
  const [categoryList,setcategoryList] = useState([]);
  const [latestList,setlatestList] = useState([]);
  useEffect(()=>{
    getSlider()
    getCatagoryList()
    getLatestList()
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

  const getLatestList = async ()=>{
    setlatestList([])
    const querySnapshot = await getDocs(collection(db, "UserPost"),orderBy("createdAt",'desc'));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setlatestList(latestList=>[...latestList,doc.data()])
  });
  }


  return (
    <ScrollView className='px-6 py-11'>
      <Header/>
      <Slider sliderList={sliderList}/>
      <Category categoryList={categoryList}/>
      <Text className='p-0 text-[20px] font-bold' >LatestListItem</Text>
      <LatestListItem latestList={latestList}/>
    </ScrollView>
  )
}