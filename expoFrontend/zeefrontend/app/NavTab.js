import {React, useState} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link } from 'expo-router';
import {Image} from 'react-native'
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
import LoginP from "./LoginP";
import WorkoutPage from "./WorkoutPage";

const screenWidth = Dimensions.get('window').width;

const NavTab = () =>
{
    return(
<GluestackUIProvider config={config}>
<View>
    <Divider/>
    <Button></Button> 
</View>

</GluestackUIProvider>
    );
};
export default NavTab;