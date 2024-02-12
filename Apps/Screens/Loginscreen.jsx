import { View,Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";



WebBrowser.maybeCompleteAuthSession();

export default function Loginscreen() {

  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image source={require("./../../assets/images/login.jpg")}
        className="w-full h-[400px]"
      />

      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl">
        <Text className='text-[25px] font-bold'>Community Marketplace</Text>
        <Text className='text-[15px] mt-4 text-slate-500'>Buy and Sell Marketplace where you can sell and make real money</Text>

        <TouchableOpacity onPress={onPress} className='mt-12 bg-blue-500 p-4 rounded-full'>
          <Text className='text-center text-white text-xl'>Get Started</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}