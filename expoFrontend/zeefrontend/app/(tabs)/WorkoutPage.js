import {React, useState} from "react";
import { Asset } from 'expo-asset';
import { Link, Redirect, router } from 'expo-router';
//import {Image} from 'react-native-svg'
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
  Image
  
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import react from "react";
import styles from "../stylefile";
import SignupP from "../SignupP";
import { Select, SelectTrigger, SelectInput, SelectIcon, Icon, ChevronDownIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Divider } from '@gluestack-ui/themed';
import { useAuth, AuthProvider } from "../Contexts/AuthContext";
import * as SecureStore from 'expo-secure-store';
const screenWidth = Dimensions.get('window').width;
const WorkoutPage = () => {
  
 const [token, setToken] = useState('')
    const getToken = async () => {
      let token = await SecureStore.getItemAsync('Token');
      setToken(token);
      //console.log(token);
    }
    getToken();
if(token != null)
{
    return(
        <GluestackUIProvider config={config}>
            <SafeAreaView style = {styles.centerContainer}>
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
 <ExerciseList></ExerciseList>
 
 <View padding = {10}></View>
 

  
            </SafeAreaView>
        </GluestackUIProvider>
    );

}
else
router.replace('/LoginP');
}




const ExerciseList = () =>
{
  const [selectedCategory, setSelectedCategory] = useState("Cardio");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedExerciseDetails, setSelectedExerciseDetails] = useState('');
  const [clear, setClear] = useState(false)
  const categories = [
    "Cardio",
    "Calisthenics",
    "Chest",
    "Arms",
    "Shoulders",
    "Back",
    "Legs"
  ];
  
  const exercisesByCategory = {
    "Cardio": ["Running", "Swimming", "Cycling", "Jump rope", "Stair climbing"],
    "Calisthenics": ["Push-ups", "Pull-ups", "Dips", "Planks", "Burpees"],
    "Chest": ["Bench press", "Dumbbell flyes", "Push-ups", "Chest dips"],
    "Arms": ["Bicep curls", "Hammer curls", "Tricep dips", "Skull crushers"],
    "Shoulders": ["Military press", "Lateral raises", "Front raises", "Shrugs"],
    "Back": ["Pull-ups", "Lat pulldowns", "Rows (barbell, dumbbell, cable)", "Deadlifts"],
    "Legs": ["Squats (back squats, front squats)", "Lunges", "Leg press", "Leg Extensions", "Leg Curls (seated, lying)", "Deadlifts (Stiff-Legged, Conventional, Sumo)"]
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedExercise('');
    setClear(!clear)
  };

  const handleExerciseChange = (exercise) => {
    setSelectedExercise(exercise);
  };

  let cat = "";

    return(
        <View>
        <Center>
        <Select 
        width = {Dimensions.get('window').width*0.6} 
        onValueChange={handleCategoryChange}
        category={selectedCategory}
        >
          <SelectTrigger variant="rounded" size="md">
          <SelectInput placeholder="Category" style={{color : 'white'}} />
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {categories.map((category, index) => (
              <SelectItem key={index} label={category} value={category}/>
            ))}
          </SelectContent>
        </SelectPortal>
        </Select>
              <View style = {{padding:6}}/>
        <Select width= {Dimensions.get('window').width*0.6} onValueChange={handleExerciseChange}>
        <SelectTrigger variant="rounded" size="md">
          <SelectInput placeholder= {"Exercise"} style={{color : 'white'}}/>
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
              {selectedCategory && exercisesByCategory[selectedCategory].map((exercise, index) => (
                <SelectItem key={index} label={ exercise} value={exercise} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        <View style = {{padding:6}}/>
            <Image 
              key = {selectedExercise}
              style={{ height: 300, width: 300 }}
              source={{ uri: 'http://' + global.LOCAL_IP + '/media/' + selectedExercise + '.png' }}
            />
      </Center>
    </View>
    );
};



export default WorkoutPage;