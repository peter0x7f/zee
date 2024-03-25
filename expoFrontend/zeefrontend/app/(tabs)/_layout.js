
//Joseph Somogie 2023
import { Tabs } from 'expo-router'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { View } from '@gluestack-ui/themed'
import { Icon } from '@gluestack-ui/themed'
import styles from '../stylefile'

import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Asset } from 'expo-asset'
import { Link, Redirect, router, useRouter } from 'expo-router'
import { Image } from 'react-native'
import { GluestackUIProvider, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
//import { Image } from "@gluestack-ui/themed"
import {
  InputField,
  Input,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Center,
} from '@gluestack-ui/themed'
import { Divider } from '@gluestack-ui/themed'
import * as SecureStore from 'expo-secure-store'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import SignupP from '../SignupP'

import Feed from './Feed'
import { Stack } from 'expo-router/stack'
const screenWidth = Dimensions.get('window').width

import { Accessibility } from 'lucide-react-native'
import { Cigarette } from 'lucide-react-native'
import { Camera } from 'lucide-react-native'
import { UserCircle2 } from 'lucide-react-native'
import { Dumbbell } from 'lucide-react-native'
import { Newspaper, FileSearch2 } from 'lucide-react-native'
/*
 *   TAB BAR LAYOUT COMPONENT
 */
export default () => {

  const [username, SetUsername] = useState('')
  const [token, setToken] = useState('')
  const [access, setAccess] = useState('')
  const [refresh, setRefresh] = useState('')
  const[pfp, setPfp] = useState(null)
  useEffect(() => {
    const getUsername = async () => {
      let uname = await SecureStore.getItemAsync('username')
      SetUsername(uname)
      console.log("Username: "+uname)
    }
    const getToken = async () => {
      let token = await SecureStore.getItemAsync('Token')
      setToken(token)
      console.log(token)
    }

    const getAccess = async () => {
      try {
        const accessValue = await SecureStore.getItemAsync('Token')
        setAccess(accessValue.substring(1, accessValue.length - 1))
      } catch {
        console.log('No Token')
      }
    }

    const getRefresh = async () => {
      try {
        const refreshValue = await SecureStore.getItemAsync('Refresh')
        setRefresh(refreshValue.substring(1, accessValue.length - 1))
      } catch {
        console.log('No Token')
      }
    }
    const getBio = async () => {
      try {
        const findBio = await SecureStore.getItemAsync('bio')
        setBio(findBio)
      } catch {
        console.log('no Bio')
      }
    } 
    
    //getBio();
    getUsername()
    getToken()
    getAccess()
    getRefresh()
    getPfP()
  }, [])

  const getPfP = async () => {
    try {
      const response = await axios.get(
        'http://' + global.LOCAL_IP + '/getsettings/',
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ` + access,
          },
        },
      )
      console.log("Response Data: "+response.data.image_url);
      let img = response.data.image_url
      setPfp('http://' + global.LOCAL_IP + img)
    } catch (error) {
      console.log('Get PFP ERROR: ' + error)
    }
  }
  

    
  //Path var to set tab file
  const [path, setPath] = useState('Feed')
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
        tabBarBackground: () => <View backgroundColor={'#222426'} />,

        showLabel: true,
        showIcon: true,
        keyboardHidesTabBar: false,
        tabStyle: {
          padding: 0,
        },
        allowFontScaling: true,
        tabBarStyle: {
          position: 'absolute',

          flex: 0,
          alignItems: 'center',
          backgroundColor: 'black',
          paddingTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name='Feed'
        options={{
          tabBarIcon: () => {
            setPath('Feed')
            return (
              <GluestackUIProvider config={config}>
                <Newspaper color='white' />
              </GluestackUIProvider>
            )
          },
        }}
      />

      <Tabs.Screen
        name='Post'
        options={{
          tabBarIcon: () => {
            setPath('Post')
            return (
              <GluestackUIProvider config={config}>
                <Camera color='white' />
              </GluestackUIProvider>
            )
          },
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{

          tabBarIcon: () => {
            setPath('Profile')
            getPfP()
            return (
              <GluestackUIProvider config={config}>
               {pfp ? (<Image 
               source={{ uri: pfp }} style={{width:30, height:30, borderRadius:15}} /> )
                : (<UserCircle2 color='white' />) }
              </GluestackUIProvider>
            )
          },
        }}
      />
      <Tabs.Screen
        name='WorkoutPage'
        options={{
          tabBarIcon: () => {
            setPath('WorkoutPage')
            return (
              <GluestackUIProvider config={config}>
                <Dumbbell color={'white'} />
              </GluestackUIProvider>
            )
          },
        }}
      />
    </Tabs>
  )
}
//Joseph Somogie 2023