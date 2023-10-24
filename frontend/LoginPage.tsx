import React from "react";
import type {PropsWithChildren} from 'react';
import LoginButton from './LoginButton';
import SignupButton from "./SignupButton";
import App from './App';
import axios from 'axios';
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const screenWidth = Dimensions.get('window').width;



const LoginPage = () => {
return (
    <SafeAreaView style = {styles.centerContainer}>
      <View>
        
        <Text style=
            {styles.coolText}>ZEE</Text>
      </View>
      
      <View style={styles.signupContainer}>
      <TextInput
      style = {[styles.input, {width: 0.8*screenWidth}]}
      textAlign="center">
        Username
      </TextInput>
      </View>
      <View style={styles.signupContainer}>
      <TextInput
      style = {[styles.input, {width: 0.8*screenWidth}]}
      textAlign="center">
        Password
      </TextInput>
      </View>
      <View style={{padding:16}}>
         </View>
      <View>
        <LoginButton></LoginButton>
      </View>
      <View style={{padding:16}}>
         </View>
      <View>
        <SignupButton></SignupButton>
      </View>
  
      
    </SafeAreaView>
    
    );
};

    const styles = StyleSheet.create({
        centerContainer: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#020945',
          paddingTop: 40,
        },
       signupContainer: {
        flex: 0.15,
        justifyContent: 'center',
        paddingHorizontal: 16,
       },
       input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 1,
          paddingHorizontal: 10,
          color: 'white',
       },
        // Text style with a big white font
        coolText: {
          fontSize: 60,       // Adjust the font size as needed
          fontWeight: 'bold', // Make the text bold (optional)
          color: '#FBEFCD',     // Set the text color to white
          textShadowColor: 'black',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 2,
        },
        text:{
          fontSize: 35
        },
        sectionContainer: {
          marginTop: 32,
          paddingHorizontal: 24,
        },
        sectionTitle: {
          fontSize: 24,
          fontWeight: '600',
        },
        sectionDescription: {
          marginTop: 8,
          fontSize: 18,
          fontWeight: '400',
        },
        highlight: {
          fontWeight: '700',
        },
      });

      export default LoginPage;