
//Joseph Somogie 2023
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
import * as ImagePicker from 'expo-image-picker'
import {
  Cigarette,
  ImageOff,
  FileImage,
  Camera,
  Check,
  UserCircle2
} from 'lucide-react-native'
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
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  PanResponder,
  Animated,
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import react from 'react'
import styles from '../stylefile'
import SignupP from '../SignupP'
import SignOut from '../(auth)/SignOut'
import Feed from './Feed'
import { Stack } from 'expo-router/stack'
const screenWidth = Dimensions.get('window').width

const Profile = () => {
  let FOLLOWERS = 5 //samples
  let FOLLOWING = 10 //samples
  const handleSignOut = async () => {
    await SignOut()
  }
  const [bio, setBio] = useState('')
  const [imageUri, setImageUri] = useState(null)
  const [pfp, setPfp] = useState(null)
  const [imageW, setImageW] = useState(0)
  const [imageH, setImageH] = useState(0)
  const [username, SetUsername] = useState('')
  const [token, setToken] = useState('')
  const [access, setAccess] = useState('')
  const [refresh, setRefresh] = useState('')
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
  }, [])

  const getPfP = async () => {
    try {
      const response = await axios.get(
        'http://' + global.LOCAL_IP + '/profile/' + username,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ` + access,
          },
        },
      )
      
      let img = response.data[0].profile.image_url
      console.log('RESPONSE: ' + response.data)
      console.log('IMAGE TEST: ' + img)
      setPfp('http://' + global.LOCAL_IP + img)
      console.log('TESTPOINT: ' + pfp)
      console.log(response.data[0].profile.image_url)
    } catch (error) {
      console.log('Get PFP ERROR: ' + error)
    }
  }

  console.log(token)

  getPfP()

  const [bodyW, setBodyW] = useState(null)
  const [maxBench, setMaxBench] = useState(null)
  const [maxDead, setMaxDead] = useState(null)
  const [maxSquat, setMaxSquat] = useState(null)
  if (token != null) {
    return (
      <GluestackUIProvider config={config}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss
          }}
        >
          <SafeAreaView style={styles.centerContainer} onLayout={getPfP}>
            <View>
              <Center>
                <View style={{ padding: 4 }}></View>
                <View style={styles.PFPcontainer}>
                  {pfp != null ? (
                    <Image source={{ uri: pfp }} style={styles.roundImage} />
                  ) : (
                    <View style={{ width: 100, height: 100 }}>
                      <UserCircle2 size={100} strokeWidth={1.3} color='white' />
                    </View>
                  )}
                </View>
                <Heading style={styles.coolText4} paddingTop={2}>
                  {username}
                </Heading>
              </Center>
            </View>
            <View style={{ padding: 0 }}></View>
            <View>
              <Text style={styles.Statstext}>{bio}</Text>
            </View>
            <Divider width={screenWidth * 0.9}></Divider>
            <View style={{ padding: 6 }}></View>
            <Center>
              <Text style={styles.Statstext}>Body Weight: </Text>
              <Text style={styles.Statstext}>Max Bench: </Text>
              <Text style={styles.Statstext}>Max Deadlift: </Text>
              <Text style={styles.Statstext}>Max Squat: </Text>

              <Divider width={screenWidth * 0.9}></Divider>
            </Center>
            <View style={{ padding: 6 }}></View>
            <Button onPress={getPfP}>
              <ButtonText>Test</ButtonText>
            </Button>
            <Link href={'/Settings'} asChild>
              <Button
                bg='$backgroundDark0'
                size='md'
                variant='solid'
                action='primary'
                isDisabled={false}
                isFocusVisible={false}
              >
                <ButtonText color='black'>Settings</ButtonText>
              </Button>
            </Link>

            <View style={{ padding: 6 }}></View>
            <Link href='/UserPosts' asChild>
              <Button
                bg='$backgroundDark0'
                size='md'
                variant='solid'
                action='primary'
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => {}}
              >
                <ButtonText color='black'>View Posts</ButtonText>
              </Button>
            </Link>
            <View style={{ padding: 6 }}></View>
            <Button
              bg='$backgroundDark0'
              size='md'
              variant='solid'
              action='primary'
              isDisabled={false}
              isFocusVisible={false}
              onPress={handleSignOut}
            >
              <ButtonText color='black'>Sign Out</ButtonText>
            </Button>
            <View style={{ padding: 6 }}></View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </GluestackUIProvider>
    )
  } else {
    router.replace('/LoginP')
  }
}
export default Profile
//Joseph Somogie 2023

