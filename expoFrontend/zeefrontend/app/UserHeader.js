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
import styles from "./stylefile";
import SignupP from "./SignupP";
import Feed from "./(tabs)/Feed";
import { Stack } from 'expo-router/stack';
const screenWidth = Dimensions.get('window').width;
const UserHeader = async () => {
  const[username, setUsername] = useState(' ');
  const LoadUserName = async () =>{
     setUsername(await SecureStore.getItemAsync('username'))
  }
    const LBS = 'LBS'
    return(
        <View>
  <Center>
  <Heading style = {styles.coolText} paddingTop= '$1/6'>
               {username == ' ' ? 'LBS' : username}
            </Heading>
      </Center>
      <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.9}></Divider>
     <View style = {{padding:2}}></View>
  </View>
  

    );
}
export default UserHeader;