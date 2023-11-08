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
import * as ImagePicker from 'expo-image-picker'
const screenWidth = Dimensions.get('window').width;

const Post = () =>
{
    const [imageUri, setImageUri] = useState('');
    const [imageW, setImageW] = useState(0);
    const [imageH, setImageH] = useState(0);
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
        if(imageUri != ''){
            const imageForm = new FormData();
            imageForm.append('image', {
              uri: imageUri,
              type: 'image/jpeg', // Adjust the content type as needed
              name: 'image.jpg', // You can customize the file name
            });
            try {
                const response = await axios.post('http://10.20.141.137:8000/settings/', imageForm, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    // Add any additional headers if necessary
                  },
                });
          
                // Handle the server response here
                console.log('Image uploaded successfully:', response.data);
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            } 
            else {
              console.error('No image data to upload.');
            }
        }

    


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
        <GluestackUIProvider config = {config}>
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss}}>
                <SafeAreaView style={styles.centerContainer}>
                    
                    <Button
                    onPress = {captureImage}
                    >
                        <ButtonText>
                        Take Photo
                        </ButtonText>
                    </Button>
                    <Button
                    onPress = {pickImage}
                    >
                        <ButtonText>
                        Choose Photo
                        </ButtonText>
                    </Button>
                    
                    <View style={styles.postContainer}>
                    {imageUri ? (
              <Image source={{ uri: imageUri }} style={{ width: 400, height: 400 }} />
            ) : null}
                
                    
                    </View>
                    
                    {imageUri != '' ? (<Button
                    onPress = {uploadImage}
                    >
                        <ButtonText>
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