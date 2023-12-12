import {React, useState, useEffect} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link, Redirect, router, useRouter } from 'expo-router';
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
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
  FlatList,
  Image,
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
import styles from "./stylefile";
import SignupP from "./SignupP";

import SignOut from "./(auth)/SignOut";
import LoginP from "./LoginP";
import UserHeader from "./UserHeader";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('window').width;

const UserPosts = () => {
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

const getUserPosts = async () => {
  const response = await axios.get(
    'http://' + global.LOCAL_IP + '/profile/'+username,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer `+access,
        
      },
    }
  );
  const newData = response.data.map((item) => {
    const uri = item.post_url && item.post_url.trim();

  return {
    username: item.username || '',
    caption: item.caption || '',
    image_url: uri ? 'http://' + global.LOCAL_IP +uri : null,
    likes: 0,
  };
  
});
setFeedData(newData);
 /*let img = response.data[0].profile.image_url;

 console.log("IMAGE TEST: "+img)
  setImageUri('http://' + global.LOCAL_IP +img)
  console.log("TESTPOINT: "+imageUri)
  console.log(response.data[0].profile.image_url)*/
  
}
const [feedData, setFeedData] = useState([]);
    const validFeedData = feedData.filter((item) => item.image_url);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
     
      if (!isPageLoaded) {
        getUserPosts();
        console.log('Page is loaded for the first time');
        
      
        setIsPageLoaded(true);
      } 
    }, [isPageLoaded]);
    return(
        
<GluestackUIProvider config={config}>
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
    <SafeAreaView onLayout={getUserPosts} >
        <Center>
    <FlatList data={validFeedData} renderItem={({item}) => ( <View style = {styles.postContainer}>
        <Image source ={{uri: item.image_url}} style = {{height: 300, width: 300 }}></Image>
        <View style={{padding:10}}/>
        <View style={styles.descriptionContainer}>
        <Text style = {styles.postText}>{item.caption}</Text>
        </View>
        
     </View> )}
     refreshing= {false}onRefresh={getUserPosts}
     
     />
     </Center>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    
</GluestackUIProvider>
    );
}
export default UserPosts;