import {React, useState} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link, router } from 'expo-router';
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


const screenWidth = Dimensions.get('window').width;
/*
Simple func signs user out and checks for errors.
*/ 
const SignOut = async () =>
{


  //DELETE AUTH TOKENS
    await SecureStore.deleteItemAsync('Token');
    await SecureStore.deleteItemAsync('Refresh');
    await SecureStore.deleteItemAsync('username');
  //CHECK IF THEY EXIST POST DELETION
    let Token = await SecureStore.getItemAsync('Token');
    let Refresh = await SecureStore.getItemAsync('Refresh');
    let username =  await SecureStore.getItemAsync('username');
  //IF SUCCESSFULY DELETED
    if(Token == null && Refresh == null && username == null){
        console.log("Signout Success")
        //S
      router.replace('/LoginP')

    }
    else if(Token != null || Refresh != null || username != null)
    {
        console.log("Signout Failed! Token =", JSON.stringify(Token), " Refresh =",  JSON.stringify(Refresh))
    }
}
export default SignOut;