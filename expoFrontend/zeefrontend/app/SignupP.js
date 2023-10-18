import { useState} from "react";
import React from 'react';
import {Axios} from 'axios'
import { Link } from 'expo-router';
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";

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

import styles from "./stylefile";
import ZeeHeader from "./LoginP"
const screenWidth = Dimensions.get('window').width;

const SignupP = () =>
{
    return(
      <GluestackUIProvider config = {config}>\
      <Center>
      <ZeeHeader></ZeeHeader>
      </Center>

      </GluestackUIProvider>

    );
};


