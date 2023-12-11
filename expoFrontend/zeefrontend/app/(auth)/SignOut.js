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
import SignupP from "../SignupP";
import { useAuth } from "../Contexts/AuthContext";
import { AuthProvider } from "../Contexts/AuthContext";
import { Stack } from 'expo-router/stack';
import LoginP from "../LoginP";
import Layout from "../_layout";

const screenWidth = Dimensions.get('window').width;

const SignOut = async () =>
{



    await SecureStore.deleteItemAsync('Token');
    await SecureStore.deleteItemAsync('Refresh');
    await SecureStore.deleteItemAsync('username')
    let Token = await SecureStore.getItemAsync('Token');
    let Refresh = await SecureStore.getItemAsync('Refresh');
    let username =  await SecureStore.getItemAsync('username');
    if(Token == null && Refresh == null && username == null){
        console.log("Signout Success")
        
      router.replace('/LoginP')

    }
    else if(Token != null || Refresh != null || username != null)
    {
        console.log("Signout Failed! Token =", JSON.stringify(Token), " Refresh =",  JSON.stringify(Refresh))
    }
}
export default SignOut;