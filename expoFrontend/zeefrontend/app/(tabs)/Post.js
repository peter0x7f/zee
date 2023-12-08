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
import * as ImagePicker from 'expo-image-picker'
import { Cigarette, ImageOff, FileImage, Camera } from 'lucide-react-native';
const screenWidth = Dimensions.get('window').width;

const Post = () =>
{
 
  const [access, setAccess] = useState('')
  const [refresh, setRefresh] = useState('')
  const [token, setToken] = useState('')
    const [imageUri, setImageUri] = useState('');
    const [imageW, setImageW] = useState(0);
    const [imageH, setImageH] = useState(0);

    const [image_url, setimage_url] = useState('');
  const [bio, setBio] = useState('');
  const [achievements, setAchievements] = useState('');
  const [max_bench, setMaxBench] = useState('');
  const [max_squat, setMaxSquat] = useState('');
  const [max_deadlift, setMaxDeadlift] = useState('');
  const [total, setTotal] = useState('');
  const [bw, setBw] = useState('');
  image_url,
  bio,
  achievements,
  max_bench,
  max_squat,
  max_deadlift,
  total,
  bw,
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
  const pickImage = async () => {
    try{
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
  })
  if(!result.canceled){
    const { uri, width, height } = result.assets[0];
    saveImage(uri, width, height);
}
}catch (error) {
    alert("Error uploading image: " + error.mssage);
}

};

    const captureImage = async () => {
        try{
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1,
            })
            if(!result.canceled){
                const { uri, width, height } = result.assets[0];
                saveImage(uri, width, height);
            }

        } catch (error) {
            alert("Error uploading image: " + error.mssage);
        }
    };

    const saveImage = async (uri, width, height) => {
        try{
            setImageUri(uri);
        setImageW(width);
        setImageH(height);
            
        }catch(error){
            throw error;
        }
    }

    const uploadImage = async () => {
      if (imageUri !== '') {
        const imageForm2 = [
          imageUri,
          bio,
          achievements,
          max_bench,
          max_squat,
          max_deadlift,
          total,
          bw,
        ]
        setimage_url(imageUri)
        console.log("imageUri: "+imageUri)
        console.log("image_url: "+image_url)

        setBw('350')
        setBio('im racist')
        const imageForm = new FormData();
       
        imageForm.append('image', {
          image_url: imageUri,
          bio: 'test',
          achievements: 'test',
          max_bench: '405',
          max_squat: '495',
          max_deadlift: '585',
          total: 'alot',
          bw: '400'
        });
       
        
        try {
        
          const response = await axios.post(
            'http://' + global.LOCAL_IP + '/settings/',
             imageForm,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer `+access,
                
              },
            }
          );
    
          
          console.log('Image uploaded successfully:', response.data, imageForm);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        console.error('No image data to upload.');
      }
       console.log('Bearer '+access)
    };

    


    const handleSignOut = async () => {
        await SignOut(); 
      }

      
   

    
    if(token != null)
    {
    return(
        <GluestackUIProvider config = {config}>
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss}}>
                <SafeAreaView style={styles.centerContainer}>
                <View>
  <Center>
  <Heading style = {styles.coolText} paddingTop= '$1/6'>
                LBS
            </Heading>
      </Center>
  </View>
  <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.6}></Divider>
     <View style = {{padding:12, flex:0}}></View>
     
                    
                    <View style={styles.postContainer}>
                    {imageUri ? (
              <Image source={{ uri: imageUri }} style={{ width: 400, height: 400 }} />
            ) : <View style={{width: 380, height: 380}}><ImageOff size={380} strokeWidth={1.3} color="#020945"/></View>}
                    </View>
                    <View style = {{padding:12}}></View>
                    <View style = {{flexDirection:"row"  }}>         
                    <Button
                    bg="$backgroundDark0"
                    size="md"
                    variant="rounded"
                    action="primary"
                    
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress = {captureImage}
                    >
                       
                        <Camera color='black'/>
                    </Button>
                    <View style = {{padding:3}}></View>
                    <Button
                      bg="$backgroundDark0"
                      size="md"
                      variant="rounded"
                      action="primary"
                      
                      isDisabled={false}
                      isFocusVisible={false}
                    onPress = {pickImage}
                    >
                       <FileImage color='black'/>
                    </Button>
                    </View> 
                    <View style = {{padding:4}}></View>
                    {imageUri != '' ? (<Button 
                      bg="$backgroundDark0"
                      size="md"
                      variant="rounded"
                      action="primary"
                      
                      isDisabled={false}
                      isFocusVisible={false}
                    onPress = {uploadImage}
                    >
                        <ButtonText color='black'>
                        Post Image
                        </ButtonText>
                    </Button>) : null}
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </GluestackUIProvider>

    )
    }
    else{
        router.replace('/LoginP')
    }
}
export default Post;