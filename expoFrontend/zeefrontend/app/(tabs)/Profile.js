import {React, useState, useEffect} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link, Redirect, router, useRouter } from 'expo-router';
import {Image} from 'react-native'
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
//import { Image } from "@gluestack-ui/themed"
import { InputField, Input, Button, ButtonText, ButtonIcon, Heading, Center } from "@gluestack-ui/themed"
import { Divider } from "@gluestack-ui/themed";
import { Cigarette, ImageOff, FileImage, Camera } from 'lucide-react-native';
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
      const [imageUri, setImageUri] = useState(null);
      const [username,SetUsername] = useState('')
      const [token, setToken] = useState('')
      const [access, setAccess]= useState('')
      const [refresh, setRefresh]= useState('')
      useEffect(() => {
        const getUsername = async () =>{
          let uname = await SecureStore.getItemAsync('username');
          SetUsername(uname);
          console.log(uname);
        }
        const getToken = async () => {
          let token = await SecureStore.getItemAsync('Token');
          setToken(token);
          console.log(token);
        };
    
        const getAccess = async () => {
          try {
            const accessValue = await SecureStore.getItemAsync('Token');
            setAccess(accessValue.substring(1, accessValue.length - 1));
          } catch {
            console.log('No Token');
          }
        };
    
        const getRefresh = async () => {
          try {
            const refreshValue = await SecureStore.getItemAsync('Refresh');
            setRefresh(refreshValue.substring(1, accessValue.length - 1));
          } catch {
            console.log('No Token');
          }
        };
        getUsername();
        getToken();
        getAccess();
        getRefresh();
      }, []);

      const getPfp = async () => {
        const response = await axios.get(
          'http://' + global.LOCAL_IP + '/profile/'+username,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer `+access,
              
            },
          }
        );
       let img = response.data[0].profile.image_url;
     
       console.log("IMAGE TEST: "+img)
        setImageUri('http://' + global.LOCAL_IP +img)
        console.log("TESTPOINT: "+imageUri)
        console.log(response.data[0].profile.image_url)


        
      }
      
      console.log(token);
    

  
    
    if(token != null)
    {
    return(
        <GluestackUIProvider config={config}>
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss}}>
                <SafeAreaView style ={styles.centerContainer} onLayout={getPfp}>
                <View>
  <Center>
  <View style={styles.postContainer}>
                    {imageUri != null ? (
              <Image source={{ uri: imageUri }} style={{ width: 400, height: 400 }} />
            ) : <View style={{width: 380, height: 380}}><ImageOff size={380} strokeWidth={1.3} color="#020945"/></View>}
                    </View>
  <Heading style = {styles.coolText} paddingTop= '$1/6'>
                {username}
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
  onPress = {getPfp}
  
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
  onPress = {()=>{}}
  
>
  <ButtonText color="black">View Posts</ButtonText>
  
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
  <ButtonText color="black">Change Profile Photo</ButtonText>
  
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