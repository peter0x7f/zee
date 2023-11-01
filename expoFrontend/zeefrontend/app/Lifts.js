import {React, useState} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link } from 'expo-router';
import {Image} from 'react-native-svg'
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
//import { Image } from "@gluestack-ui/themed"
import { InputField, Input, Button, ButtonText, ButtonIcon, Heading, Center } from "@gluestack-ui/themed"

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
  Keyboard,
  FlatList
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
import { Select, SelectTrigger, SelectInput, SelectIcon, Icon, ChevronDownIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Divider } from '@gluestack-ui/themed';
const screenWidth = Dimensions.get('window').width;


const Lifts = () => {

    const exercises = {
        Cardio: ["Running", "Swimming", "Cycling", "Jump rope", "Stair climbing"],
        Calisthenics: ["Push-ups", "Pull-ups", "Dips", "Planks", "Burpees"],
        Chest: ["Bench press", "Dumbbell flyes", "Push-ups", "Dumbell press"],
        Arms: ["Bicep curls", "Hammer curls", "Tricep pushdown", "Skull crushers"],
        Shoulders: ["overhead press", "Lateral raises", "Front raises", "Shrugs"],
        Back: [ "Lat pulldowns", "Rows (barbell, dumbbell, cable)", "Deadlifts", "Rear delt flyes"],
        Legs: ["Squats (back squats, front squats)", "Lunges", "Leg press", "Leg Extensions", "Leg Curls (seated, lying)", "Deadlifts (Stiff-Legged, Conventional, Sumo)"]
    };
    let exArr = [
      ["Running", "Swimming", "Cycling", "Jump rope", "Stair climbing"],
      ["Push-ups", "Pull-ups", "Dips", "Planks", "Burpees"],
      ["Bench press", "Dumbbell flyes", "Push-ups", "Dumbell press"],
      ["Bicep curls", "Hammer curls", "Tricep pushdown", "Skull crushers"],
      ["overhead press", "Lateral raises", "Front raises", "Shrugs"],
      [ "Lat pulldowns", "Rows (barbell, dumbbell, cable)", "Deadlifts", "Rear delt flyes"],
      ["Squats (back squats, front squats)", "Lunges", "Leg press", "Leg Extensions", "Leg Curls (seated, lying)", "Deadlifts (Stiff-Legged, Conventional, Sumo)"]
    ]
      
      const exData = [
        {name:'Cardio', val:exArr[0], index:0},
        {name:'Calisthenics', val:exArr[1], index:1},
        {name:'Chest', val:exArr[2], index:2},
        {name:'Arms', val:exArr[3], index:3},
        {name:'Shoulders', val:exArr[4], index:4},
        {name:'Back', val:exArr[5], index:5},
        {name:'Legs', val:exArr[6], index:6},
      ]
    
    const [index, setIndex] = useState(1);
   let exData2 = [
    {name:exArr[index][0]},
    {name:exArr[index][1]},
    {name:exArr[index][2]},
    {name:exArr[index][3]},
    {name:exArr[index][4]}

   ];
   
  
   
    return(
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
          <GluestackUIProvider config = {config}>
            <SafeAreaView style={styles.centerContainer}>
            <View>
  <Center>
  <Heading style = {styles.coolText} paddingTop= '$1/6'>
                LBS
            </Heading>
      </Center>
  </View>

            <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.6}></Divider>
     <View style = {{padding:12}}></View>
     <View style = {styles.flatListContainer}>
     <FlatList data={exData} renderItem={({item}) => ( <Button style={{color:'white'}} width={screenWidth*0.6} 
     onPress = {setIndex(item.index)} >
      <ButtonText>{item.name}</ButtonText>
     </Button> )}
     />
     </View>
     <View style = {{padding:6}}></View>
     <Divider width = {screenWidth*0.6}></Divider>
     <View style = {{padding:6}}></View>
     <View style = {styles.flatListContainer}>
     <FlatList data={exData2} renderItem={({item}) => ( <Button style={{color:'white'}} width={screenWidth*0.6} 
     >
      <ButtonText>{item.name}</ButtonText>
     </Button> )}
     />
     </View>
    
            </SafeAreaView>

          </GluestackUIProvider>
        </TouchableWithoutFeedback>
       
        </>

    );
};
export default Lifts;