import React from 'react'

import LoginButton from '../components/LoginButton'
import { Link } from 'expo-router'
import { GluestackUIProvider, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'

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
} from 'react-native'

const styles = StyleSheet.create({

  postContainer: {
    backgroundColor: 'black',
    width: 400,
    height: 400,
    padding: 10,
    marginBottom: 5,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },

    image: {
      width: 10, // You can adjust the width as needed
      height: 200, // You can adjust the height as needed
      borderRadius: 10, // Make sure to match the border radius of the container
    },
    elevation: 2,
    display: 'flex', // Use flex properties
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
  },
  ModalContainer: {
    position: 'absolute',
    bottom: 0,
    //left: '50%',
    //transform: [{ translateX: -200 }], // Adjust half of the width
    backgroundColor: 'black',
    //width: 400,
    height: 400,
    padding: 10,
    marginBottom: 5,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postContainer3: {
    backgroundColor: '#3b4045',
    width: 400,
    height: 600,
    padding: 10,
    marginBottom: 3,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    

    image: {
      width: 10, // You can adjust the width as needed
      height: 200, // You can adjust the height as needed
      borderRadius: 10, // Make sure to match the border radius of the container
    },
    elevation: 2,
    display: 'flex', // Use flex properties
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
  },
  CommentContainer: {
    backgroundColor: 'gray',
    height: 100,
    padding: 10,
  },
  descriptionContainer: {
    backgroundColor: '#3b4045', // Color for the description container
    width: '100%', // Full width of the parent container
    padding: 10,
    borderRadius: 10, // You can adjust the border radius as needed
    marginTop: 0, // Spacing between the postContainer and descriptionContainer
  },
  postText: {
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    marginTop: 8, // Add spacing between image and text
    color: 'white',
  },
  button: {
    backgroundColor: '#FBEFCD',
    padding: 10,
    borderRadius: 5,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 40,
  },
  centerContainer2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FBEFCD',
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
  flatListContainer: {
    height: 150, // Set the fixed height for 2-3 items
    // Add any other styles specific to the FlatList container here
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
    fontSize: 60, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold (optional) 
    color: '#8a342d', // Set the text color to light red
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  postText2: {
    fontSize: 20, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold (optional)
    color: '#FBEFCD', // Set the text color to white
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  text: {
    fontSize: 35,
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
  PFPcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundImage: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 50, // This makes the image container round
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },

  commentsList: {
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  coolText2: {
    fontSize: 50, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold (optional)
    color: '#FBEFCD', // Set the text color to white
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  coolText3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Statscontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
  },
  Statstext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Dark gray text color
    marginVertical: 10,
  },
  coolText4: {
    fontSize: 30, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold (optional)
    color: '#FBEFCD', // Set the text color to white
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
})
export default styles
