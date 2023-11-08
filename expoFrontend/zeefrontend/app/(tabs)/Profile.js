import {React, useState} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link, Redirect, router, useRouter } from 'expo-router';
import {Image} from 'react-native'
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
//import { Image } from "@gluestack-ui/themed"
import { InputField, Input, Button, ButtonText, ButtonIcon, Heading, Center } from "@gluestack-ui/themed"
import { Divider } from "@gluestack-ui/themed";
import * as SecureStore from 'expo-secure-store';
import{
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import react from "react";
import styles from "../stylefile";
import SignupP from "../SignupP";
import SignOut from "../(auth)/SignOut";
import Feed from "./Feed";
import { Stack } from 'expo-router/stack';
const screenWidth = Dimensions.get('window').width;

const Profile = () =>
{
    let FOLLOWERS = 5; //samples
    let FOLLOWING = 10; //samples
    const handleSignOut = async () => {
        await SignOut(); 
      }

      const [token, setToken] = useState('')
    const getToken = async () => {
      let token = await SecureStore.getItemAsync('Token');
      setToken(token);
      console.log(token);
    }

    getToken();
    
    if(token != null)
    {
    return(
        <GluestackUIProvider config={config}>
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss}}>
                <SafeAreaView style ={styles.centerContainer}>
                <View>
  <Center>
  <Heading style = {styles.coolText} paddingTop= '$1/6'>
                LBS
            </Heading>
      </Center>
  </View>
  <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.6}></Divider>
     <View style = {{padding:12}}></View>
     <Button 
         bg="$backgroundDark0"
  size="md"
  variant="solid"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress = {handleSignOut}
  
>
  <ButtonText color="black">Sign Out</ButtonText>
  
</Button>
<View style = {{padding:6}}></View>
<Button 
         bg="$backgroundDark0"
  size="md"
  variant="solid"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress = {()=>{}}
  
>
  <ButtonText color="black">Settings</ButtonText>
  
</Button> 

<View style = {{padding:6}}></View>
<Button 
         bg="$backgroundDark0"
  size="md"
  variant="solid"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress = {()=>{FOLLOWERS+=1}}
  
>
  <ButtonText color="black">Followers {FOLLOWERS}</ButtonText>
  
</Button> 

<View style = {{padding:6}}></View>
<Button 
         bg="$backgroundDark0"
  size="md"
  variant="solid"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress = {()=>{}}
  
>
  <ButtonText color="black">Following {FOLLOWING}</ButtonText>
  
</Button> 


                </SafeAreaView>

            </TouchableWithoutFeedback>

        </GluestackUIProvider>

    )
    }
    else
    {
        router.replace('/LoginP');
    }
}
export default Profile;