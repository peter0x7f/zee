import {React, useState, useEffect} from "react";
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
import SignOut from "./(auth)/SignOut";
import Feed from "./(tabs)/Feed";
import { Stack } from 'expo-router/stack';
import ChangePfp from "./ChangePfp";
const screenWidth = Dimensions.get('window').width;

const Settings = () => {
  const [bio, setBio] = useState('')
  const [token, setToken] = useState('')
  const [access, setAccess]= useState('')
  const [refresh, setRefresh]= useState('')
  useEffect(() => {
    const getToken = async () => {
      let token = await SecureStore.getItemAsync('Token');
      setToken(token);
      console.log(token);
    };

    const getAccess = async () => {
      try {
        const accessValue = await SecureStore.getItemAsync('Token');
        setAccess(accessValue.substring(1, accessValue.length - 1));
      } catch {
        console.log('No Token');
      }
    };

    const getRefresh = async () => {
      try {
        const refreshValue = await SecureStore.getItemAsync('Refresh');
        setRefresh(refreshValue.substring(1, accessValue.length - 1));
      } catch {
        console.log('No Token');
      }
    };
    const getBio = async () => {
      try{
        const findBio = await SecureStore.getItemAsync('bio');
        setBio(findBio);
      }catch{
        console.log('no Bio');
      }
    };

    getToken();
    getAccess();
    getRefresh();
  }, []);
  return (
    <GluestackUIProvider config={config}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
      <SafeAreaView style={styles.centerContainer}>
        <View >    
          <Center>
        
          
          <Divider width={screenWidth*0.9}></Divider>
          <View style={{padding:8}}></View>
          <Link href={'/ChangePfp'} asChild>
        <Button
         bg="$backgroundDark0"
         size="md"
         variant="solid"
         action="primary"
         width={200}
        >
          <ButtonText color={'black'}>Change Profile Photo</ButtonText>
        </Button>
        </Link>
        <View style={{padding:6}}/>
        <Button
         bg="$backgroundDark0"
         size="md"
         variant="solid"
         action="primary"
        >
          <ButtonText color={'black'}>Change Bio</ButtonText>
        </Button>
        <View style={{padding:6}}/>
        <Input 
                      width = '$3/5'
                      variant="outline"
                      size="md"
                      isDisabled={false}
                      isInvalid={false}
                      isReadOnly={false}
                      >
                <InputField  
                onChangeText={()=>{}}
                value={''}

                placeholder={bio}
                color = '$amber100'>
                </InputField>
                    </Input>
        </Center>
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    </GluestackUIProvider>
  );


}
export default Settings;