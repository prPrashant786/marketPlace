import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Commponents/HomeScreen/Header'
import Slider from '../Commponents/HomeScreen/Slider'
import { getFirestore ,collection, getDocs, orderBy, limit } from "firebase/firestore";
import {app} from "../../firebaseConfig"
import Category from '../Commponents/HomeScreen/Category';
import LatestListItem from '../Commponents/HomeScreen/LatestListItem';


export default function Homescreen({navigation}) {
  const db = getFirestore(app);

  const [sliderList,setsliderList] = useState([])
  const [categoryList,setcategoryList] = useState([]);
  const [latestList,setlatestList] = useState([]);
  // useEffect(()=>{
  //   getSlider()
  //   getCatagoryList()
  //   getLatestList()
  // },[navigation])

  const [isload1,setisload1] = useState(true)
  const [isload2,setisload2] = useState(true)
  const [isload3,setisload3] = useState(true)

  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSlider()
      getCatagoryList()
      getLatestList()
    });
  
    return unsubscribe;
  }, [navigation]);

  

  //USE To GEtSLider for Home Screen//
  const getSlider = async()=>{
    setsliderList([])
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    setisload1(false)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setsliderList(sliderList=>[...sliderList,doc.data()])
    });
  }

  const getCatagoryList = async ()=>{
    setcategoryList([])
    setisload2(false)
    const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setcategoryList(categoryList=>[...categoryList,doc.data()])
  });
  }

  const getLatestList = async ()=>{
    setlatestList([])
    setisload3(false)
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
        {isload1&&isload2&&isload3?
        <ActivityIndicator size={'large'}/>
        :
        <View>
          <Slider sliderList={sliderList}/>
          <Category categoryList={categoryList}/>
          <Text className='p-0 text-[20px] font-bold' >LatestListItem</Text>
          <LatestListItem latestList={latestList}/>
        </View>
        }
    </ScrollView>
  )
}