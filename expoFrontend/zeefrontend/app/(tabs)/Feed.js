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
  Image
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
import { AuthProvider, useAuth } from "../Contexts/AuthContext";
import SignOut from "../(auth)/SignOut";
import LoginP from "../LoginP";
import UserHeader from "../UserHeader";

const screenWidth = Dimensions.get('window').width;


const Feed = () =>
{


    const handleSignOut = async () => {
        await SignOut(); 
      }

      const [token, setToken] = useState('')
      const [access, setAccess]= useState('')
      const [refresh, setRefresh]= useState('')
      useEffect(() => {
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
    
        getToken();
        getAccess();
        getRefresh();
      }, []);
   
if(token != null && access!= null)
{

 
    const [img_1, setImg_1] = useState(null)
    const [img_2, setImg_2] = useState(null)
    const [img_3, setImg_3] = useState(null)
    const [img_4, setImg_4] = useState(null)
    const [img_5, setImg_5] = useState(null)
    const [img_6, setImg_6] = useState(null)
    const [img_7, setImg_7] = useState(null)
    const [img_8, setImg_8] = useState(null)
    const [img_9, setImg_9] = useState(null)
    const [img_10, setImg_10] = useState(null)
    
    const [cap_1, setCap_1] = useState(null)
    const [cap_2, setCap_2] = useState(null)
    const [cap_3, setCap_3] = useState(null)
    const [cap_4, setCap_4] = useState(null)
    const [cap_5, setCap_5] = useState(null)
    const [cap_6, setCap_6] = useState(null)
    const [cap_7, setCap_7] = useState(null)
    const [cap_8, setCap_8] = useState(null)
    const [cap_9, setCap_9] = useState(null)
    const [cap_10, setCap_10] = useState(null)

   /*useEffect(() => {
      // This block will run when img_1 is updated
      console.log("Image updated: " + img_1);
    }, [img_1]);*/

    const SetImage = async () =>{
        if (!token) {
            console.log('Token not available');
            return;
          }
        try{
           
        const response = await axios.get(
            'http://' + global.LOCAL_IP + '/explore_feed/', 
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer `+access,
                  
                },
              }  
        ); 
        console.log("response: "+response)
        console.log("TEST: "+(JSON.stringify(response.data[2])))
        let cap = JSON.stringify(response.data[1].caption)
        cap = cap.substring(1,cap.length-1)
        setImg_3(cap)
        let str = JSON.stringify(response.data[0].image_url)
        str = str.substring(1, str.length - 1)
        console.log("JSON: "+str)
        setImg_1(str)
        setImg_1('http://' + global.LOCAL_IP +str)
        str = JSON.stringify(response.data[1].image_url)
        str = str.substring(1,str.length-1)
        setImg_2('http://' + global.LOCAL_IP +str)
        console.log(img_2)
        }
        catch(error){
            console.log("SetImage Error: "+error);
        }
        
        console.log("Image file test: "+img_1)
    }
 
    const SetImageFeed = async () => {
      try {
        const response = await axios.get(
        'http://' + global.LOCAL_IP + '/explore_feed/', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access}`,
          },
        });
    
        const newData = response.data.map((item) => {
          const uri = item.image_url && item.image_url.trim(); // Validate URI here
    
          return {
            id: item.id.toString(),
            caption: item.caption || '',
            image_url: uri ? 'http://' + global.LOCAL_IP +uri : null,
            likes: 0,
          };
        });
    
        setFeedData(newData);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };
   
    const loadFeed = async () => {
      
      await SetImageFeed();
      
      
    
    };
    
   
    const [feedData, setFeedData] = useState([]);
    const validFeedData = feedData.filter((item) => item.image_url);

    const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // This block of code will run once when the component mounts
    if (!isPageLoaded) {
      loadFeed();
      console.log('Page is loaded for the first time');
      
      // Set the state to indicate that the page has been loaded
      setIsPageLoaded(true);
    } 
  }, [isPageLoaded]);
  //loadFeed()
  
    return(
        

       

       
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.centerContainer} onLayout={loadFeed}>
           
  <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.9}></Divider>
     <View style = {{padding:0}}></View>
     <View style={{flex:1}}>
     <FlatList data={validFeedData} renderItem={({item}) => ( <View style = {styles.postContainer}>
        <Image source ={{uri: item.image_url}} style = {{height: 300, width: 300 }}></Image>
        <View style={{padding:10}}/>
        <View style={styles.descriptionContainer}>
        <Text style = {styles.postText}>{item.caption}</Text>
        </View>
        
     </View> )}
     refreshing= {false}onRefresh={SetImageFeed}
     
     />
     </View>
     
     <Divider width = {screenWidth*0.9}></Divider>
     <View style = {{padding:3}}></View>
     

    
    <View style = {{padding:3}}></View>
            </SafeAreaView>
        </GluestackUIProvider>
        
    );
     }//Auth Context
     else
     router.replace('/LoginP')

}; //Feed

export default Feed;

