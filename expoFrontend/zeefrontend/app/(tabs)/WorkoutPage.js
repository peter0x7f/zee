import {React, useState} from "react";
import { Asset } from 'expo-asset';
import { Link, Redirect, router } from 'expo-router';
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
      console.log(token);
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
 
<Button 
         bg="$backgroundDark0"
  size="md"
  variant="outline"
  action="primary"
  
  isDisabled={false}  
  isFocusVisible={false}
  onPress={() => {
router.replace('/LoginP')
  }}
>
  <ButtonText color="black">Log In</ButtonText>
  
</Button>
  
            </SafeAreaView>
        </GluestackUIProvider>
    );

}
else
router.replace('/LoginP');
}




const ExerciseList = () =>
{
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    Cardio: ["Running", "Swimming", "Cycling", "Jump rope", "Stair climbing"],
    Calisthenics: ["Push-ups", "Pull-ups", "Dips", "Planks", "Burpees"],
    Chest: ["Bench press", "Dumbbell flyes", "Push-ups", "Chest dips"],
    Arms: ["Bicep curls", "Hammer curls", "Tricep dips", "Skull crushers"],
    Shoulders: ["Military press", "Lateral raises", "Front raises", "Shrugs"],
    Back: ["Pull-ups", "Lat pulldowns", "Rows (barbell, dumbbell, cable)", "Deadlifts"],
    Legs: ["Squats (back squats, front squats)", "Lunges", "Leg press", "Leg Extensions", "Leg Curls (seated, lying)", "Deadlifts (Stiff-Legged, Conventional, Sumo)"]
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  let cat = "";

    return(
        <View>
        <Select width = {Dimensions.get('window').width*0.6} onValueChange={handleCategoryChange} category={selectedCategory}>
         
          <SelectTrigger variant="rounded" size="md">
          <SelectInput placeholder="Exercise Category" />
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
            <SelectItem label={categories[0]} value={categories[0]} />
            <SelectItem label={categories[1]} value={categories[1]} />
            <SelectItem
              label={categories[2]}
              value={categories[2]}
              
            />
            <SelectItem label={categories[3]} value={categories[3]} />
            <SelectItem label={categories[4]} value={categories[4]}/>
            <SelectItem label={categories[5]} value={categories[5]} />
            <SelectItem label={categories[6]} value={categories[6]} />
          </SelectContent>
        </SelectPortal>
         
        
        </Select>


        </View>
       
   
        
    );
};

export default WorkoutPage;