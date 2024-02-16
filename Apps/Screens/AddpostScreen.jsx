import { StyleSheet,View, Text, TextInput, TouchableOpacity,Image, Alert, ActivityIndicator, KeyboardAvoidingView , ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import {app} from "../../firebaseConfig"
import { getFirestore,collection, getDocs, addDoc } from "firebase/firestore";
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

//TODO:Make form Empty After submission

export default function AddpostScreen() {
  //TODO:- Delete The Bellow Code
  const temp = [
  {
    "title": "Convertible Sports Car",
    "desc": "Enjoy the thrill of the open road with this convertible sports car.",
    "category": "Car",
    "address": "456 Fast Lane, Speed City",
    "price": "65000",
    "image": "https://www.topgear.com/sites/default/files/2022/12/6_4.jpeg",
    "userName": "Roadster Lover",
    "userEmail": "roadster@example.com",
    "userProfileImage": "https://example.com/roadster_lover_profile.jpg",
    "createdAt": "1644929100000"
  },
  {
    "title": "Vintage Wooden Desk",
    "desc": "A beautiful vintage wooden desk with intricate craftsmanship.",
    "category": "Furniture",
    "address": "101 Retro Street, Vintage Haven",
    "price": "1200",
    "image": "https://i.pinimg.com/474x/bb/67/72/bb677226838f2e7c07391bfeac4edfae.jpg",
    "userName": "Vintage Furniture Collector",
    "userEmail": "vintagecollector@example.com",
    "userProfileImage": "https://example.com/vintage_collector_profile.jpg",
    "createdAt": "1644934500000"
  },
  {
    "title": "Luxury Sedan - Limited Edition",
    "desc": "Experience the epitome of luxury with this limited edition sedan.",
    "category": "Car",
    "address": "789 Elegance Road, Prestige Plaza",
    "price": "85000",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHijzrOnw2Ux-VHX8dzpuXBP1YjPxvsEKf-A&usqp=CAU",
    "userName": "Luxury Car Enthusiast",
    "userEmail": "luxurycar@example.com",
    "userProfileImage": "https://example.com/luxury_car_enthusiast_profile.jpg",
    "createdAt": "1644940100000"
  },
  {
    "title": "Modern Leather Sofa Set",
    "desc": "Upgrade your living room with this modern and comfortable leather sofa set.",
    "category": "Furniture",
    "address": "567 Comfort Avenue, Stylish Living",
    "price": "2800",
    "image": "https://i.pinimg.com/736x/87/7c/e6/877ce61733288b7a0ead71e6ea5e45ae.jpg",
    "userName": "Modern Living Enthusiast",
    "userEmail": "modernliving@example.com",
    "userProfileImage": "https://example.com/modern_living_enthusiast_profile.jpg",
    "createdAt": "1644945700000"
  },
  {
    "title": "Performance Sports Coupe",
    "desc": "Feel the power and agility of this performance sports coupe.",
    "category": "Car",
    "address": "123 Velocity Street, Power Drive",
    "price": "70000",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuYrmVqP-03dBvfBz8Xnhr-sVf7H_O1Gkojg&usqp=CAU",
    "userName": "Speedster Fan",
    "userEmail": "speedsterfan@example.com",
    "userProfileImage": "https://example.com/speedster_fan_profile.jpg",
    "createdAt": "1644951300000"
  },
  {
    "title": "Elegant Dining Table Set",
    "desc": "Create a sophisticated dining space with this elegant table set.",
    "category": "Furniture",
    "address": "789 Dining Elegance Lane, Fine Dining Plaza",
    "price": "1800",
    "image": "https://i.pinimg.com/originals/e3/a6/9d/e3a69d24d52ad73af3c13c8603e3bed8.png",
    "userName": "Dining Connoisseur",
    "userEmail": "dininglover@example.com",
    "userProfileImage": "https://example.com/dining_connoisseur_profile.jpg",
    "createdAt": "1644956900000"
  },
  {
    "title": "Antique Wooden Furniture Set",
    "desc": "Handcrafted wooden furniture set with intricate details.",
    "category": "Furniture",
    "address": "789 Oak Street, Vintage Village",
    "price": "2500",
    "image": "https://5.imimg.com/data5/ANDROID/Default/2021/12/OC/LY/QN/111586069/product-jpeg-500x500.jpg",
    "userName": "Antique Collector",
    "userEmail": "collector@example.com",
    "userProfileImage": "https://example.com/collector_profile.jpg",
    "createdAt": "1644907500000"
  },
  {
    "title": "High-end Electronics Gadgets",
    "desc": "Cutting-edge electronic gadgets for tech enthusiasts.",
    "category": "Electronics",
    "address": "101 Tech Street, Gadget Town",
    "price": "2000",
    "image": "https://c02.purpledshub.com/uploads/sites/41/2022/06/9421412f8e83278b37b538744a0913b0ultra-01e0e5e-e1655112987410.jpeg?webp=1&w=1200",
    "userName": "Tech Guru",
    "userEmail": "techguru@example.com",
    "userProfileImage": "https://example.com/tech_guru_profile.jpg",
    "createdAt": "1644896700000"
  }
];

  const addTempData = async () => {
    for (const item of temp) {
      await uploadItem(item);
    }
  };
  
  const uploadItem = async (item) => {
    const docRef = await addDoc(collection(db, 'UserPost'), item);
  
    if (docRef.id) {
      console.log("UPLOADING");
    }
  };
  const db = getFirestore(app);
  const storage = getStorage();
  
  const [loading,setLoading] = useState(false)
  const {user} = useUser();
  const [categoryList,setcategoryList] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(()=>{
    getCatagoryList();
    // addTempData();
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
        value.createdAt = Date.now().toString();
        const docRef = await addDoc(collection(db,"UserPost"),value)
        if(docRef.id){
          setLoading(false)
          Alert.alert('Success!!!','Post Added Successfully.')
        }
      })
    });

  }

  return (
    <KeyboardAvoidingView>
      <ScrollView className='p-10'>
      <Text className='text-[28px] font-extrabold'>Add Post</Text>
      <Text className='text-[15px] text-grey-500 mb-5'>Create New Post and Start Selling</Text>
        <Formik
        initialValues={{ title: '', desc: '',category:'',address:'',price:'',image:'',userName:'',userEmail:'',userProfileImage:'',createdAt:''}}
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
      </ScrollView>
    </KeyboardAvoidingView>
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