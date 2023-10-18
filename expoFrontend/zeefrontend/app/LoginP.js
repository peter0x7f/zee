import {React, useState} from "react";
import axios from 'axios'

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
import react from "react";
import styles from "./stylefile";
const screenWidth = Dimensions.get('window').width;


const AxoisReq = () => {
  axios.get('http://127.0.0.1:8000/login/')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
}
const LoginP = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleLogin = () => {
    
    const userData = {
      username,
      password
    };
 
    axios.post('http://127.0.0.1:8000/register/', userData)
        .then(response => {console.log('SUCCESS (I THINK)')})
        .catch(error => {console.log('ERROR') });
  };



    return (
        <GluestackUIProvider config = {config}>
           <SafeAreaView style = {styles.centerContainer}>
           <Center>
     <ZeeHeader></ZeeHeader>
     <View style = {{padding:12}}></View>
     </Center>
     <Input 
     width = '$3/5'
      variant="rounded"
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      >
<InputField  
onChangeText={text => setUsername(text)}
placeholder='Username'
color = '$amber100'>
</InputField>
     </Input>

  <View style = {{padding:12}}></View>

     <Input 
     width = '$3/5'
     type="password"
      variant="rounded"
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      >

<InputField 
onChangeText={text => setPassword(text)}
placeholder='Password'
type='password'
color = '$amber100'>
</InputField>

     </Input>
     <View style = {{padding:12}}></View>
     <Center>
     <Button 
         bg="$backgroundDark0"
  size="md"
  variant="outline"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress ={handleLogin}
>
  <ButtonText color="black">Login </ButtonText>
  
</Button>
      <View style = {{padding:6}}></View>
      <CreateAcB></CreateAcB>
            </Center>
            <Button onPress={AxoisReq}
            >
              
            </Button>
           </SafeAreaView>
                
            
           

        </GluestackUIProvider>
    );
};



const CreateAcB = () => {
  return(
    <Link href="/SignupPage" asChild>
<Button 
         bg="$backgroundDark0"
  size="md"
  variant="outline"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress={() => {
    
   }}
>
  <ButtonText color="black">Sign Up</ButtonText>
  
</Button>
    </Link>
    

  );
};

const ZeeHeader = () => {
  return(
<Heading style = {styles.coolText} paddingTop= '$1/6'>
                ZEE
            </Heading>
  );
};


  
  
  



export default LoginP;