import {React, useState, useEffect, useRef} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link, Redirect, router, useRouter } from 'expo-router';
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
import { InputField, Input, Button, ButtonText, ButtonIcon, Heading, Center,  } from "@gluestack-ui/themed"
import { Cigarette, ImageOff, FileImage, Camera,  MessagesSquare, ThumbsUp } from 'lucide-react-native';
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
  Modal,
  PanResponder,
  Animated,
  TouchableOpacity,
  Keyboard,
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


import SignOut from "../(auth)/SignOut";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('window').width;

/*
* Feed Page for application. Every post made by a valid user is loaded in a FlatList. 
* Modal Setup for comments section.
*/
const Feed = () =>
{
    //AUTH TOKEN VARS
      const [token, setToken] = useState('')
      const [access, setAccess]= useState('')
      const [refresh, setRefresh]= useState('')
      //Hook to pull tokens from local storage ensure existence
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
 //Check if tokens exist
if(token != null && access!= null)
{

/*
Func to pull images from backend and load them into flatlist
*/ 
const [feedData, setFeedData] = useState([]); 
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
          const uri = item.post_url && item.post_url.trim(); // Validate URI here
    
          return {
            username: item.username || '',
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
   //Async func to call SetImageFeed() asynchronously
    const loadFeed = async () => {
      await SetImageFeed();
    };
    //Filter feed for valid image URLS
    const validFeedData = feedData.filter((item) => item.image_url);

    const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
   //load feed on first load
    if (!isPageLoaded) {
      loadFeed();
      console.log('Page is loaded for the first time');
      
    
      setIsPageLoaded(true);
    } 
  }, [isPageLoaded]);
  
 //Comment section modal bool
  const [modalVisible, setModalVisible] = useState(false);
  

    return(
        

       

       
        <GluestackUIProvider config={config}>
          
            <SafeAreaView style={styles.centerContainer} onLayout={loadFeed}>
           
  <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.9}></Divider>
     <View style = {{padding:0}}></View>
     <View style={{flex:1}}>
     <FlatList data={validFeedData} renderItem={({item}) => ( <View style = {styles.postContainer3}>
        <Image source ={{uri: item.image_url? item.image_url : null}} style = {{height: 300, width: 300 }}></Image>
        <View style={{padding:10}}/>
       
        <View style={styles.descriptionContainer}>
        <Text style = {styles.postText}>{item.caption}</Text>
        
        </View>
        <View style={{padding:4}}>
          <View style={{flexDirection:'row'}}>
          <Button
bg="$backgroundDark0"
size="md"
variant="solid"
action="primary"
bgColor="#020945"
> 
<ButtonText>
  <ThumbsUp color={'white'}/>
</ButtonText>
</Button>
<View style={{padding:2}}/>
      <Button 
        bg="$backgroundDark0"
        size="md"
        variant="solid"
        action="primary"
        bgColor="#020945"
      onPress={() => setModalVisible(true)}>
        <ButtonText>
        <MessagesSquare  color={'white'}></MessagesSquare>
        </ButtonText>
        </Button>
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.ModalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.coolText3}>Comments</Text>

      {/* Empty list of comments */}
      <View style={styles.commentsList}></View>

      {/* Input field for new comment */}
      <TextInput
        placeholder="Add a comment..."
        style={styles.inputField}
        multiline={true}
      />

      {/* Button to close the modal */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>





</View>
    </View>
   
     </View> )}
     refreshing= {false}onRefresh={SetImageFeed}
     
     />
     <View style={{padding:16}}></View>
     </View>
     
     <Divider width = {screenWidth*0.9}></Divider>
     <View style = {{padding:3}}></View>
     

    
    <View style = {{padding:3}}></View>
            </SafeAreaView>
           
        </GluestackUIProvider>
        
    );
     }//end if token exists
     else //else token doesn't exist
     router.replace('/LoginP')

}; //Feed

export default Feed;

