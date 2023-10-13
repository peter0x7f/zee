import React from "react";

import LoginButton from './LoginButton';
import { Link } from 'expo-router';

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
import SignupButton from "./SignupButton";
const screenWidth = Dimensions.get('window').width;
const SignupPage = () => {
    return(
        <SafeAreaView style = {styles.centerContainer}>
    <View>
      <Text style=
          {styles.coolText}> ZEE</Text>
    </View>
    <View>
    <View style={styles.signupContainer}>
    <TextInput
    style = {[styles.input, {width: 0.8*screenWidth}]}
    textAlign="center">
      Name
    </TextInput>
    </View>
    <View style={styles.signupContainer}>
    <TextInput
    style = {[styles.input, {width: 0.8*screenWidth}]}
    textAlign="center">
      Email
    </TextInput>
    </View>
    <View style={styles.signupContainer}>
    <TextInput
    style = {[styles.input, {width: 0.8*screenWidth}]}
    textAlign="center">
      Phone Number
    </TextInput>
    </View>
    <View style={styles.signupContainer}>
    <TextInput
    style = {[styles.input, {width: 0.8*screenWidth}]}
    textAlign="center">
      Credit Card Number
    </TextInput>
    </View>
    <View style={styles.signupContainer}>
  
    </View>
    </View>
    <View>
      <SignupButton></SignupButton>
    </View>
    <View style={{padding:16}}>
         </View>
    <View>
    <Link href= "/LoginPage" style = {styles.button}>Already Have Account? Login</Link>
    </View>
    
  </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FBEFCD',
    padding: 10,
    borderRadius: 5,
},
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

  export default SignupPage;