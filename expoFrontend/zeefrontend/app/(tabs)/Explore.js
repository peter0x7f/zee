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
  Image,
  TouchableOpacity
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
import ViewExplore from "../ViewExplore";
import { Stack } from 'expo-router/stack';
import * as ImagePicker from 'expo-image-picker'
import { Cigarette, ImageOff, FileImage, Camera, FileSearch2 } from 'lucide-react-native';
const screenWidth = Dimensions.get('window').width;
const Explore = () => {
    const sampleData = [
        { id: 1, desc: 'TEST POST 1', imageURL: 'https://source.unsplash.com/random/800x600' },
        { id: 2, desc: 'TEST POST 2', imageURL: 'https://source.unsplash.com/random/800x601' },
        { id: 3, desc: 'TEST POST 3', imageURL: 'https://source.unsplash.com/random/800x602' },
        { id: 4, desc: 'TEST POST 4', imageURL: 'https://source.unsplash.com/random/800x603' },
        { id: 5, desc: 'TEST POST 5', imageURL: 'https://source.unsplash.com/random/800x604' },
        { id: 6, desc: 'TEST POST 6', imageURL: 'https://source.unsplash.com/random/800x605' },
        { id: 7, desc: 'TEST POST 7', imageURL: 'https://source.unsplash.com/random/800x606' },
        { id: 8, desc: 'TEST POST 8', imageURL: 'https://source.unsplash.com/random/800x607' },
        { id: 9, desc: 'TEST POST 9', imageURL: 'https://source.unsplash.com/random/800x608' },
        { id: 10, desc: 'TEST POST 10', imageURL: 'https://source.unsplash.com/random/800x609' },
        { id: 11, desc: 'TEST POST 11', imageURL: 'https://source.unsplash.com/random/800x610' },
        { id: 12, desc: 'TEST POST 12', imageURL: 'https://source.unsplash.com/random/800x611' },
        { id: 13, desc: 'TEST POST 13', imageURL: 'https://source.unsplash.com/random/800x612' },
        { id: 14, desc: 'TEST POST 14', imageURL: 'https://source.unsplash.com/random/800x613' },
        { id: 15, desc: 'TEST POST 15', imageURL: 'https://source.unsplash.com/random/800x614' },
        { id: 16, desc: 'TEST POST 16', imageURL: 'https://source.unsplash.com/random/800x615' },
        { id: 17, desc: 'TEST POST 17', imageURL: 'https://source.unsplash.com/random/800x616' },
        { id: 18, desc: 'TEST POST 18', imageURL: 'https://source.unsplash.com/random/800x617' },
        { id: 19, desc: 'TEST POST 19', imageURL: 'https://source.unsplash.com/random/800x618' },
        { id: 20, desc: 'TEST POST 20', imageURL: 'https://source.unsplash.com/random/800x619' },
        { id: 21, desc: 'TEST POST 21', imageURL: 'https://source.unsplash.com/random/800x620' },
        { id: 22, desc: 'TEST POST 22', imageURL: 'https://source.unsplash.com/random/800x621' },
        { id: 23, desc: 'TEST POST 23', imageURL: 'https://source.unsplash.com/random/800x622' },
        { id: 24, desc: 'TEST POST 24', imageURL: 'https://source.unsplash.com/random/800x623' },
        { id: 25, desc: 'TEST POST 25', imageURL: 'https://source.unsplash.com/random/800x624' },
        { id: 26, desc: 'TEST POST 26', imageURL: 'https://source.unsplash.com/random/800x625' },
        { id: 27, desc: 'TEST POST 27', imageURL: 'https://source.unsplash.com/random/800x626' },
        { id: 28, desc: 'TEST POST 28', imageURL: 'https://source.unsplash.com/random/800x627' },
        { id: 29, desc: 'TEST POST 29', imageURL: 'https://source.unsplash.com/random/800x628' },
        { id: 30, desc: 'TEST POST 30', imageURL: 'https://source.unsplash.com/random/800x629' },
       /* { id: 31, desc: 'TEST POST 31', imageURL: 'https://source.unsplash.com/random/800x630' },
        { id: 32, desc: 'TEST POST 32', imageURL: 'https://source.unsplash.com/random/800x631' },
        { id: 33, desc: 'TEST POST 33', imageURL: 'https://source.unsplash.com/random/800x632' },
        { id: 34, desc: 'TEST POST 34', imageURL: 'https://source.unsplash.com/random/800x633' },
        { id: 35, desc: 'TEST POST 35', imageURL: 'https://source.unsplash.com/random/800x634' },
        { id: 36, desc: 'TEST POST 36', imageURL: 'https://source.unsplash.com/random/800x635' },
        { id: 37, desc: 'TEST POST 37', imageURL: 'https://source.unsplash.com/random/800x636' },
        { id: 38, desc: 'TEST POST 38', imageURL: 'https://source.unsplash.com/random/800x637' },
        { id: 39, desc: 'TEST POST 39', imageURL: 'https://source.unsplash.com/random/800x638' },
        { id: 40, desc: 'TEST POST 40', imageURL: 'https://source.unsplash.com/random/800x639' },
        { id: 41, desc: 'TEST POST 41', imageURL: 'https://source.unsplash.com/random/800x640' },
        { id: 42, desc: 'TEST POST 42', imageURL: 'https://source.unsplash.com/random/800x641' },
        { id: 43, desc: 'TEST POST 43', imageURL: 'https://source.unsplash.com/random/800x642' },
        { id: 44, desc: 'TEST POST 44', imageURL: 'https://source.unsplash.com/random/800x643' },
        { id: 45, desc: 'TEST POST 45', imageURL: 'https://source.unsplash.com/random/800x644' },
        { id: 46, desc: 'TEST POST 46', imageURL: 'https://source.unsplash.com/random/800x645' },
        { id: 47, desc: 'TEST POST 47', imageURL: 'https://source.unsplash.com/random/800x646' },
        { id: 48, desc: 'TEST POST 48', imageURL: 'https://source.unsplash.com/random/800x647' },
        { id: 49, desc: 'TEST POST 49', imageURL: 'https://source.unsplash.com/random/800x648' },
        { id: 50, desc: 'TEST POST 50', imageURL: 'https://source.unsplash.com/random/800x649' },
        { id: 51, desc: 'TEST POST 51', imageURL: 'https://source.unsplash.com/random/800x650' },
        { id: 52, desc: 'TEST POST 52', imageURL: 'https://source.unsplash.com/random/800x651' },
        { id: 53, desc: 'TEST POST 53', imageURL: 'https://source.unsplash.com/random/800x652' },
        { id: 54, desc: 'TEST POST 54', imageURL: 'https://source.unsplash.com/random/800x653' },
        { id: 55, desc: 'TEST POST 55', imageURL: 'https://source.unsplash.com/random/800x654' },
        { id: 56, desc: 'TEST POST 56', imageURL: 'https://source.unsplash.com/random/800x655' },
        { id: 57, desc: 'TEST POST 57', imageURL: 'https://source.unsplash.com/random/800x656' },
        { id: 58, desc: 'TEST POST 58', imageURL: 'https://source.unsplash.com/random/800x657' },
        { id: 59, desc: 'TEST POST 59', imageURL: 'https://source.unsplash.com/random/800x658' },
        { id: 60, desc: 'TEST POST 60', imageURL: 'https://source.unsplash.com/random/800x659' },*/
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
     <FlatList data={sampleData} numColumns={3} renderItem={({item})=>(<View style={ {flexDirection:'row'}} >
<TouchableOpacity width={picSize}  >
<Image source={{uri:item.imageURL}} style={{height:picSize,width:picSize}}/>
</TouchableOpacity>

</View>)}
/>
     </View>

        </SafeAreaView>

    
</GluestackUIProvider>
    );
};
export default Explore;

func = (Data, index) => {
    router.replace()

 }