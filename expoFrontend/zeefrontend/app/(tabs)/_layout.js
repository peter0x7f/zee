import { Tabs } from 'expo-router';

import {  SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from '@gluestack-ui/themed';
import { Icon } from "@gluestack-ui/themed"
import styles from '../stylefile';

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


import SignupP from '../SignupP';

import Feed from './Feed';
import { Stack } from 'expo-router/stack';
const screenWidth = Dimensions.get('window').width;


import { Accessibility } from 'lucide-react-native';
import { Cigarette } from 'lucide-react-native';
import { Camera } from 'lucide-react-native';
import { UserCircle2 } from 'lucide-react-native';
import { Dumbbell } from 'lucide-react-native';
import { Newspaper, FileSearch2 } from 'lucide-react-native';
/*
 *   TAB BAR LAYOUT COMPONENT
*/
export default () => {
//Path var to set tab file
  const [path, setPath] = useState('Feed')
    return(



<Tabs 

screenOptions={{
    
   
    headerShown: false,
    
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#FBEFCD',
        tabBarInactiveBackgroundColor: '#FBEFCD',
        tabBarBackground: () => (
            <View backgroundColor={'#FBEFCD'} />),
     
      showLabel: true,
      showIcon: true,
      keyboardHidesTabBar: false,
      tabStyle: {
        padding: 0,
      },
      allowFontScaling: true,
      tabBarStyle: {
        position:'absolute',
        
        flex: 0,  
      alignItems: 'center',
      backgroundColor: '#FBEFCD',
      paddingTop:0,
      },
   
    
 
}}
>         
<Tabs.Screen
name='Feed'
options={
    {
        tabBarIcon: () => {
            setPath('Feed');
             return(
            <GluestackUIProvider config={config}>
                <Newspaper color='#020945'/>
            </GluestackUIProvider>
    
        )},
    }
}
/>

<Tabs.Screen
name='Post'
options={
    {
        tabBarIcon: () => { 
            setPath('Post');
            return(
            <GluestackUIProvider config={config}>
                <Camera color='#020945'/>
            </GluestackUIProvider>
    
        )},
    }
}
/>
<Tabs.Screen
name='Profile'
options={
    {
        tabBarIcon: () => {
            setPath('Profile'); 
            return(
            <GluestackUIProvider config={config}>
                <UserCircle2 color='#020945'/>
            </GluestackUIProvider>
    
        )},
    }
}
/>
<Tabs.Screen
name='WorkoutPage'
options={
    {
        tabBarIcon: () => { 
            setPath('WorkoutPage');
            return(
            <GluestackUIProvider config={config}>
                <Dumbbell color={'#020945'}/>
            </GluestackUIProvider>
    
        )},
    }
}
/>
 </Tabs>

 

        
    )
    
   
}