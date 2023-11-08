import {React, useState} from "react";
import axios from 'axios'
import { Asset } from 'expo-asset';
import { Link, Redirect, router, useRouter } from 'expo-router';
import {Image} from 'react-native'
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
//import { Image } from "@gluestack-ui/themed"
import { InputField, Input, Button, ButtonText, ButtonIcon, Heading, Center } from "@gluestack-ui/themed"
import { Divider } from "@gluestack-ui/themed";
import * as SecureStore from 'expo-secure-store';
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
import react from "react";
import styles from "./stylefile";
import SignupP from "./SignupP";
import { useAuth } from "./Contexts/AuthContext";
import { AuthProvider } from "./Contexts/AuthContext";
import Feed from "./(tabs)/Feed";
import { Stack } from 'expo-router/stack';
const screenWidth = Dimensions.get('window').width;




const LoginP = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [mes, setMes] = useState('')
let TOKEN = null;
let REFRESH = null;
   

  const  handleLogin = async () => {
    
    const userDataL = {
      username,
      password
    };

 
    await axios.post('http://10.20.155.128:8000/login/', userDataL)
        .then(response => {console.log('SUCCESSFUL POST', response.data)

          TOKEN = response.data.access;
          REFRESH= response.data.refresh;
         console.log('TOKEN: ',TOKEN);

        })
        
        .catch(error => {console.log('BAD POST ERROR') });
        
        console.log(userDataL);
        

      if(TOKEN != null)
      {
        let tokenString = JSON.stringify(TOKEN);
        let refreshString = JSON.stringify(REFRESH);
        await SecureStore.setItemAsync('Token', tokenString);
        await SecureStore.setItemAsync('Refresh', refreshString);
      
      router.replace('/Feed')
      }
      else
      {
        console.log("Login Redirect Failed!")
      }
      
  };



    return (
      <>
     

      
      <Stack.Screen
      options= {{
        headerTitle:'Login',
      }}

      />
        <GluestackUIProvider config = {config}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <SafeAreaView style = {styles.centerContainer}>
           <Center>
     <ZeeHeader></ZeeHeader>
     <View style = {{padding:3}}></View>
     <Divider width = {screenWidth*0.6}></Divider>
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

  <View style = {{padding:6}}></View>
  
  <View style = {{padding:6}}></View>

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
  variant="rounded"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress ={handleLogin}
>
  <ButtonText color="black">Login </ButtonText>
  
</Button>
     
     
      <View style = {{padding:6}}></View>
      
      <CreateAcB></CreateAcB>
      <View style = {{padding:5}}></View>
  
     <View style = {{padding:5}}></View>
            </Center>
            
            <Center>
            
            
<Button 
         bg="#FBEFCD"
  size="md"
  variant="rounded"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress={() => {router.replace('/WorkoutPage')
    
   }}
>
  <ButtonText color="#020945">Start Training</ButtonText>
  
</Button>
    
            </Center>
           

           </SafeAreaView>
                
           </TouchableWithoutFeedback>
           

        </GluestackUIProvider>
        
        </>
    );
};



const CreateAcB = () => {
  return(
    <Link href="/SignupP" asChild>
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
  <ButtonText color="black">Sign Up</ButtonText>
  
</Button>
    </Link>
    

  );
};

const ZeeHeader = () => {
  return(
<Heading style = {styles.coolText} paddingTop= '$1/6'>
                LBS
            </Heading>
  );
};

/*const LbsLogo = () => {
 
  return(
    <View>
<Image source={require("./assets/lbs-logo.gif")} 
style={{ width: 200, height: 200 }}
></Image>
    </View>

  );
  };*/

  
  
  



export default LoginP;