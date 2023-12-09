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
   
if(token != null)
{

 
    const [img_1, setImg_1] = useState(null)
    const [img_2, setImg_2] = useState(null)
    const [img_3, setImg_3] = useState(null)
    const [img_4, setImg_4] = useState(null)
    const [img_5, setImg_5] = useState(null)

    useEffect(() => {
      // This block will run when img_1 is updated
      console.log("Image updated: " + img_1);
    }, [img_1]);

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
        console.log("TEST: "+(JSON.stringify(response.data[0])))
        let cap = JSON.stringify(response.data[1].caption)
        cap = cap.substring(1,cap.length-1)
        setImg_3(cap)
        let str = JSON.stringify(response.data[1].image_url)
        str = str.substring(1, str.length - 1)
        console.log("JSON: "+str)
        setImg_1(str)
        setImg_1('http://' + global.LOCAL_IP +str)
        str = JSON.stringify(response.data[0].image_url)
        str = str.substring(1,str.length-1)
        setImg_2('http://' + global.LOCAL_IP +str)
        console.log(img_2)
        }
        catch(error){
            console.log("SetImage Error: "+error);
        }
        
        console.log("Image file test: "+img_1)
    }
    const SetImageFeed = async () =>{
      const response = await axios.get(
        'http://' + global.LOCAL_IP + '/profile/josephsomogie', 
        {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer `+access,
              
            },
          }  
          
    ); 
          console.log(JSON.stringify(response))
    }
    
    const feedData  = [ 
        
    ]

    const sampleData = [
        {
            id: '1',
            title: 'Overhead Press PR!',
            imageUrl: img_1,
        },
        {
            id: '2',
            title: img_3,
            imageUrl: img_2
        },
        {
            id: '3',
            title: 'Squat Max',
            imageUrl: 'https://www.bodybuilding.com/images/2018/may/skyrocket-your-squat-pr-with-conjugate-training-1-700xh.jpg'
        },
        {
            id: '4',
            title: 'Goofy little weight',
            imageUrl: 'https://d3h9ln6psucegz.cloudfront.net/wp-content/uploads/2022/07/Lift-Weights.jpg'
        },


    ];
    
    //get url/profile/[username].image_url?
    return(
        

       

       
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.centerContainer}>
            <View>
  <Center>
    <Button onPress={SetImageFeed}><ButtonText>test</ButtonText></Button>
  <Heading style = {styles.coolText} paddingTop= '$1/6'>
                LBS
            </Heading>
      </Center>
  </View>
  <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.9}></Divider>
     <View style = {{padding:0}}></View>
     <View style={{flex:1}}>
     <FlatList data={sampleData} renderItem={({item}) => ( <View style = {styles.postContainer}>
        <Image source ={{uri: item.imageUrl}} style = {{height: 300, width: 300 }}></Image>
        <View style={{padding:10}}/>
        <View style={styles.descriptionContainer}>
        <Text style = {styles.postText}>{item.title}</Text>
        </View>
        
     </View> )}
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

