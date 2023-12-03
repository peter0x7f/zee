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
import styles from "./stylefile";
import SignupP from "./SignupP";
import SignOut from "./(auth)/SignOut";
import Feed from "./(tabs)/Feed";
import { Stack } from 'expo-router/stack';
import * as ImagePicker from 'expo-image-picker'
import { Cigarette, ImageOff, FileImage, Camera, FileSearch2 } from 'lucide-react-native';
const screenWidth = Dimensions.get('window').width;
//this component is rendered onPress of any post in the explore page, and the explore is changed to single view.
const ViewExplore = ({Data}, index) => {
  return(
    <GluestackUIProvider config={config}>
      <SafeAreaView style={styles.centerContainer}>
        <FlatList data={Data} renderItem={({item}) => ( <View style = {styles.postContainer}>
        <Image source ={{uri: item.imageUrl}} style = {{height: 300, width: 300 }}></Image>
        <View style={{padding:10}}/>
        <View style={styles.descriptionContainer}>
        <Text style = {styles.postText}>{item.title}</Text>
        </View>
        
     </View> )}
     initialScrollIndex={index}
     />
        
     
      </SafeAreaView>

    </GluestackUIProvider>
  )
}
export default ViewExplore