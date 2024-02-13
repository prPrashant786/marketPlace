import { StyleSheet,View, Text, TextInput, TouchableOpacity,Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {app} from "../../firebaseConfig"
import { getFirestore,collection, getDocs, addDoc } from "firebase/firestore";
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

//TODO:Make form Empty After submission and handle screen

export default function AddpostScreen() {
  const db = getFirestore(app);
  const storage = getStorage();
  
  const [loading,setLoading] = useState(false)
  const {user} = useUser();
  const [categoryList,setcategoryList] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(()=>{
    getCatagoryList();
  },[])

  /**
 * Get categoryList from firebase 
 */
  const getCatagoryList = async ()=>{
    setcategoryList([])
    const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setcategoryList(categoryList=>[...categoryList,doc.data()])
  });
  }

  /**
   * USe to pick image
   */
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value)=>{
    //Convert Image to blob for Uploading in firebase
    setLoading(true)
    const resp = await fetch(image)
    const blob = await resp.blob();
    
    const storageRef = ref(storage, 'communityPost/'+Date.now()+'.jpg');
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        value.image = downloadUrl;
        value.userName = user.fullName;
        value.userEmail = user.primaryEmailAddress.emailAddress;
        value.userProfileImage = user.imageUrl;
        const docRef = await addDoc(collection(db,"UserPost"),value)
        if(docRef.id){
          setLoading(false)
          Alert.alert('Success!!!','Post Added Successfully.')
        }
      })
    });

  }

  return (
    <View className='p-10'>
    <Text className='text-[28px] font-extrabold'>Add Post</Text>
    <Text className='text-[15px] text-grey-500 mb-5'>Create New Post and Start Selling</Text>
      <Formik
      initialValues={{ title: '', desc: '',category:'',address:'',price:'',image:'',userName:'',userEmail:'',userProfileImage:'' }}
      onSubmit={value=>onSubmitMethod(value)}
      >
      {({values,handleChange,handleBlur,handleSubmit,setFieldValue}) => (
          <View>
              <TouchableOpacity onPress={pickImage}>
              {image?
              <Image source={{uri:image}} 
              style={{width:100,height:100,borderRadius:15,objectFit:'fill'}}/>
              :
              <Image source={require("../../assets/images/placeholder.png")}
              style={{width:100,height:100,borderRadius:15,objectFit:'fill'}}/>
              }
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder='Title'
                value={values?.title}
                onChangeText={handleChange('title')}
              />
              <TextInput
                style={styles.input}
                placeholder='Descreption'
                value={values?.desc}
                numberOfLines={5}
                onChangeText={handleChange('desc')}
              />
              <TextInput
                style={styles.input}
                placeholder='Price'
                value={values?.price}
                keyboardType='number-pad'
                onChangeText={handleChange('price')}
              />
              <TextInput
                style={styles.input}
                placeholder='Address'
                value={values?.address}
                onChangeText={handleChange('address')}
              />
              <View style={{borderWidth:1,borderRadius:10,marginTop:15}}>             
              <Picker
              selectedValue={values?.category}
              onValueChange={itemvalue=>setFieldValue('category',itemvalue)}
              >

              {categoryList&&categoryList.map((item,index)=>(
                item&&<Picker.Item key={index} label={item?.Name} value={item?.Name} />
              ))}
              </Picker>
              </View>
 
              <TouchableOpacity onPress={handleSubmit} 
              style={{
                backgroundColor:loading?'#ccc':'#007BFF',
              }}
              className='mt-4 bg-blue-500 p-4 rounded-full'
              disabled={loading}
              >
              { loading?
              <ActivityIndicator color={'#fff'}/>
              :
              <Text className='text-center text-white text-[16px]'>Submit</Text>
              }
              
              </TouchableOpacity>
          </View>
      )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input : {
    borderWidth : 1,
    borderRadius : 10,
    fontSize : 17,
    padding : 5,
    paddingTop:15,
    paddingHorizontal : 15,
    marginTop : 8,
    marginBottom:5,
    textAlignVertical:'top'
  }
})