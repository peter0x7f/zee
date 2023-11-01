import {React, useState} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link } from 'expo-router';

import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
//import { Image } from "@gluestack-ui/themed"
import { InputField, Input, Button, ButtonText, ButtonIcon, Heading, Center } from "@gluestack-ui/themed"
import { Divider } from "@gluestack-ui/themed";

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
  FlatList,
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

import LoginP from "../LoginP";
const screenWidth = Dimensions.get('window').width;
const Feed = () =>
{
    const sampleData = [
        {
            id: '1',
            title: 'Overhead Press PR!',
            imageUrl: 'https://rogersathletic.com/wp-content/uploads/2023/04/overhead_press_001.jpg'
        },
        {
            id: '2',
            title: 'Bench PR',
            imageUrl: 'https://www.muscleandfitness.com/wp-content/uploads/2019/02/man-bench-press.jpg?quality=86&strip=all'
        },
        {
            id: '3',
            title: 'Squat Max',
            imageUrl: 'https://www.bodybuilding.com/images/2018/may/skyrocket-your-squat-pr-with-conjugate-training-1-700xh.jpg'
        },
        {
            id: '4',
            title: 'Goofy little weight',
            imageUrl: 'https://d3h9ln6psucegz.cloudfront.net/wp-content/uploads/2022/07/Lift-Weights.jpg'
        },


    ];
    const feedData  = [
        
    ]
    return(
        <GluestackUIProvider config={config}>
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
     <FlatList data={sampleData} renderItem={({item}) => ( <View style = {styles.postContainer}>
        <Image source ={{uri: item.imageUrl}} style = {{height: 300, width: 300 }}></Image>
        <Text style = {styles.postText}>{item.title}</Text>
     </View> )}
     />
     <View style = {{padding:3}}></View>
     <Link href="/LoginP" asChild>
<Button 
         bg="$backgroundDark0"
  size="md"
  variant="solid"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress={() => {
    
   }}
>
  <ButtonText color="black">Sign Out</ButtonText>
  
</Button>
    </Link>
    <View style = {{padding:3}}></View>
            </SafeAreaView>
        </GluestackUIProvider>

    );
};
export default Feed;