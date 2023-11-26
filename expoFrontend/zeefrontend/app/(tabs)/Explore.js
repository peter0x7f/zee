import {React, useState} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link, Redirect, router, useRouter } from 'expo-router';

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
  Keyboard,
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
import SignOut from "../(auth)/SignOut";
import Feed from "./Feed";
import { Stack } from 'expo-router/stack';
import * as ImagePicker from 'expo-image-picker'
import { Cigarette, ImageOff, FileImage, Camera, FileSearch2 } from 'lucide-react-native';
const screenWidth = Dimensions.get('window').width;
const Explore = () => {
    const sampleData = [
        { id: 1, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x600', imageURL2: 'https://source.unsplash.com/random/800x600', imageURL3: 'https://source.unsplash.com/random/800x600' },
        { id: 2, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 3, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 4, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 5, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 6, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 7, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 8, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 9, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 10, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 11, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 12, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 13, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 14, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 15, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 16, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 17, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 18, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 19, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 20, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 21, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 22, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 23, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 24, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 25, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 26, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 27, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 28, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 29, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
        { id: 30, desc: 'TEST POST', imageURL: 'https://source.unsplash.com/random/800x601', imageURL2: 'https://source.unsplash.com/random/800x602', imageURL3: 'https://source.unsplash.com/random/800x603' },
    ];
    
 
    
const picSize = 143;
    return(
<GluestackUIProvider config={config}>
    
        <SafeAreaView style={styles.centerContainer}>
        <View>
  <Center>
  <Heading style = {styles.coolText} paddingTop= '$1/6'>
                LBS
            </Heading>
      </Center>
  </View>
  <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.9}></Divider>
     <View style = {{padding:2}}></View>
     <View style={{flex:1}}>
     <FlatList data={sampleData} renderItem={({item})=>(<View style={ {flexDirection:'row'}}>
<Image source={{uri:item.imageURL}} style={{height:picSize,width:picSize}}/>
<View stye={{padding:3}}/>
<Image source={{uri:item.imageURL2}} style={{height:picSize,width:picSize}}/>
<Image source={{uri:item.imageURL3}} style={{height:picSize,width:picSize}}/>
</View>)}
/>
     </View>

        </SafeAreaView>

    
</GluestackUIProvider>
    );
};
export default Explore;