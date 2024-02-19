//Joseph Somogie 2023

import { React, useState, useEffect} from 'react'
import axios from 'axios'
import { Asset } from 'expo-asset'
import { Link, Redirect, router, useRouter } from 'expo-router'
import { GluestackUIProvider, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import {
  InputField,
  Input,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Center,
} from '@gluestack-ui/themed'
import {
  Cigarette,
  ImageOff,
  FileImage,
  Camera,
  MessagesSquare,
  ThumbsUp,
} from 'lucide-react-native'
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
  View,
  FlatList,
  Image,
  Modal,
  PanResponder,
  Animated,
  TouchableOpacity,
  Keyboard,
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

import SignOut from '../(auth)/SignOut'
import Test from '../comments'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const screenWidth = Dimensions.get('window').width

//imports for bottom sheet comments
import { useCallback, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet'



/*
 * Feed Page for application. Every post made by a valid user is loaded in a FlatList.
 * Modal Setup for comments section.
 */
const Feed = () => {
  //AUTH TOKEN VARS
  const [token, setToken] = useState('')
  const [access, setAccess] = useState('')
  const [refresh, setRefresh] = useState('')
  //Hook to pull tokens from local storage ensure existence
  useEffect(() => {
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

    getToken()
    getAccess()
    getRefresh()
  }, [])
  //Check if tokens exist
  if (token != null && access != null) {
    /*
Func to pull images from backend and load them into flatlist
*/
    const [feedData, setFeedData] = useState([])
    const SetImageFeed = async () => {
      try {
        const response = await axios.get(
          'http://' + global.LOCAL_IP + '/explore_feed/',
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${access}`,
            },
          },
        )

        const newData = response.data.map((item) => {
          const uri = item.post_url && item.post_url.trim() // Validate URI here

          return {
            username: item.username || '',
            caption: item.caption || '',
            image_url: uri ? 'http://' + global.LOCAL_IP + uri : null,
            likes: 0,
          }
        })

        setFeedData(newData)
      } catch (error) {
        console.error('Error fetching feed:', error)
      }
    }
    //Async func to call SetImageFeed() asynchronously
    const loadFeed = async () => {
      await SetImageFeed()
    }
    //Filter feed for valid image URLS
    const validFeedData = feedData.filter((item) => item.image_url)

    const [isPageLoaded, setIsPageLoaded] = useState(false)
    useEffect(() => {
      //load feed on first load
      if (!isPageLoaded) {
        loadFeed()
        console.log('Page is loaded for the first time')

        setIsPageLoaded(true)
      }
    }, [isPageLoaded])

 
/****************Gorham Bottom Sheet setup for Comment Section******************/
  const snapPoints = useMemo(() => [ '75%','100%', ], [])
  const bottomSheetRef = useRef(null)
  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0)

  const RenderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
    ></BottomSheetBackdrop>
  ))
/*******************************************************************************/
    return (
      <GluestackUIProvider config={config} >
        <SafeAreaView style={styles.centerContainer} onLayout={loadFeed} >
          <View style={{ padding: 3 }}></View>
        
          <View style={{ padding: 0 }}></View>
          <View style={{ flex: 1 }} >
            <FlatList
            
              data={validFeedData}
              renderItem={({ item }) => (
                <View style={styles.postContainer3} >
                  <Text>{item.username}</Text>
                  <Image
                    source={{ uri: item.image_url ? item.image_url : null }}
                    style={{ height: 450, width: 380 }}
                  ></Image>
                  <View style={{ padding:4 }} />

                  
                  
                    <View style={{ alignItems: "flex-start", flexDirection: 'row',  }}>
                      <Button
                        bg='$backgroundDark0'
                        size='sm'
                        variant='solid'
                        action='primary'
                        bgColor='#3b4045'
                      >
                        <ButtonText>
                          <ThumbsUp color={'white'} />
                        </ButtonText>
                      </Button>
                      <View style={{ padding: 2 }} />
                      <Button
                        bg='transparent'
                        size='sm'
                        variant='solid'
                        action='primary'
                        bgColor='#3b4045'
                        onPress={handleOpenPress}
                      >
                        <ButtonText>
                          <MessagesSquare color={'white'}></MessagesSquare> 
                        </ButtonText>
                        <Test/>
                      </Button>
              
                    </View>
                  <View style={styles.descriptionContainer}>
                  <Text style={styles.postText}>{item.caption}</Text>
                  </View>
                  
                </View>
              )}
              refreshing={false}
              onRefresh={SetImageFeed}
            />
            <View style={{ padding: 16 }}></View>
          </View>

          
          <View style={{ padding: 3 }}></View>

          <View style={{ padding: 3 }}></View>
          
        </SafeAreaView>
        {/*Comment Section*/}
        <BottomSheet 
        backgroundStyle={{backgroundColor:'#3b4045'}}
        handleIndicatorStyle={{backgroundColor:'black'}}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={RenderBackdrop}
      >
          <BottomSheetTextInput style={{ 
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'black',
  }}

/>

        {/*Flatlist with comment data*/}
        <BottomSheetFlatList
            
              data={validFeedData}
              renderItem={({ item }) => (
                
                  <View >
                    <View style={styles.CommentContainer}>
                  <Text style={styles.postText}>{item.caption}</Text>
                  </View>
                  </View>
                  
                
              )}
              refreshing={false}
              onRefresh={SetImageFeed}
            />

      </BottomSheet>
                    
      </GluestackUIProvider>
    )
  } //end if token exists 
  //else token doesn't exist
  else router.replace('/LoginP')
} //Feed

export default Feed


//Joseph Somogie 2023

