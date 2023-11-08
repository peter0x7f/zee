import { useState} from "react";
import React from 'react';
import axios from 'axios'
import { Link } from 'expo-router';
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";

import { InputField, Input, Button, ButtonText, ButtonIcon, Heading, Center, Divider } from "@gluestack-ui/themed"

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
  Keyboard
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from "./stylefile";

import { Stack } from 'expo-router/stack';
const screenWidth = Dimensions.get('window').width;

const SignupP = () => {
  const[first_name, setFirstname] = useState('');
  const[last_name, setLastname] = useState('');
  const[email, setEmail] = useState('');
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const[password2, setPassword2] = useState('');

  const handleSignup = async () => {
    let Reg = false;
    const userDataS = {
      
      
      username,
      password,
      password2,
      email,
      first_name,
      last_name,
     
    }
    const userDataRL = {
      username,
      password,
    }
    //Axios requests
      axios.post('http://10.20.141.137:8000/register/', userDataS)
        .then(response => {console.log('SUCCESS');
        Reg = true;
      })
        .catch(error =>  {console.log('ERROR') });
    console.log(userDataS);

    if (Reg)
   {
    await axios.post('http://10.20.141.137:8000/login/', userDataRL)
        .then(response => {console.log('SUCCESS (I THINK)', response.data);

          setToken(response.data);
         console.log('TOKEN: ',Token);
        })
        
        .catch(error => {console.log('ERROR') });
        
        console.log(userDataRL);
        let tokenString = JSON.stringify(Token);
        await SecureStore.setItemAsync('Token', tokenString);
   }
    };
   
    

  return(
    <>
    <Stack.Screen
    options= {{
      headerTitle:'Sign Up',
    }}

    />
    
      <GluestackUIProvider config = {config}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
<SafeAreaView  style = {styles.centerContainer}>
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
  <Center>
  <Input 
     width = '$3/5'
      variant="rounded"
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      >
<InputField  
onChangeText={text => setFirstname(text)}
placeholder='First Name'
color = '$amber100'>
</InputField>
     </Input>

  <View style = {{padding:12}}></View>
  <Input 
     width = '$3/5'
      variant="rounded"
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      >
<InputField  
onChangeText={text => setLastname(text)}
placeholder='Last Name'
color = '$amber100'>
</InputField>
     </Input>

  <View style = {{padding:12}}></View>
  <Input 
     width = '$3/5'
      variant="rounded"
      size="md"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      >
<InputField  
onChangeText={text => setEmail(text)}
placeholder='Email'
color = '$amber100'>
</InputField>
     </Input>

  <View style = {{padding:12}}></View>
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
onChangeText={text => setPassword2(text)}
placeholder= 'Verify Password'
type='password'
color = '$amber100'>
</InputField>

     </Input>
     <View style = {{padding:12}}></View>
  </Center>
      <Button
       
       bg="$backgroundDark0"
       size="md"
       variant="outline"
       action="primary"
       
       isDisabled={false}
       isFocusVisible={false}
       onPress={handleSignup}
     
      >
        <ButtonText color="black">Sign Up</ButtonText>
      </Button>
      <View style = {{padding:12}}></View>
      <Link href="/LoginP" asChild>
<Button 
         bg="$backgroundDark0"
  size="md"
  variant="outline"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress={() => {}}
>
  <ButtonText color="black">Log In</ButtonText>
  
</Button>
    </Link>
      </SafeAreaView>
      </TouchableWithoutFeedback>
      </GluestackUIProvider>
      </>
      
     

     

    );
};

export default SignupP;
