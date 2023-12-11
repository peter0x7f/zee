import {React, useState, useEffect} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link } from 'expo-router';
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
const screenWidth = Dimensions.get('window').width;

import { Stack } from 'expo-router/stack';


export default function Layout() {
  const [username, setUsername] = useState(SecureStore.getItemAsync('username'));

   useEffect(() => {
    
    const fetchUsername = async () => {
      try {
        const storedUsername = await SecureStore.getItemAsync('username');
        setUsername(storedUsername || ''); // Set the username or an empty string if not found
       
       
      } catch (error) {
        console.error('Error fetching username:', error);
       
      }
     
    };
 

    fetchUsername();
  }, []);
  return( <Stack
  username = {username}
  screenOptions={{
    
    headerStyle: {
        backgroundColor: '#020945',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  }
  }
   >
    <Stack.Screen name= "(tabs)"  options={{headerTitle:  'LBS'  }}  />
   </Stack>
   );
  
  
}