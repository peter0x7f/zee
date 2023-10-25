import React from "react";

import LoginButton from '../components/LoginButton';
import { Link } from 'expo-router';
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";

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



const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#FBEFCD',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
    display: 'flex', // Use flex properties
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
  },
  postText: {
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    marginTop: 8, // Add spacing between image and text
  },
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
    postContainer2: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'grey',
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
    postText2: {
      fontSize: 20,       // Adjust the font size as needed
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
  export default styles;