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
import NavTab from "./NavTab";
import Feed from "./Feed";
const screenWidth = Dimensions.get('window').width;
let address;

const AxoisReq = () => {
  axios.get('http://google.com  ')
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
    
    const userDataL = {
      username,
      password
    };

 
    axios.post('http://192.168.1.13:8000/login/', userDataL)
        .then(response => {console.log('SUCCESS (I THINK)')})
        .catch(error => {console.log('ERROR') });

        

        console.log(userDataL);
  };



    return (
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
      <Link href="/Feed" asChild>
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
      </Link>
     
      <View style = {{padding:6}}></View>
      
      <CreateAcB></CreateAcB>
      <View style = {{padding:5}}></View>
  
     <View style = {{padding:5}}></View>
            </Center>
            
            <Center>
            
            <Link href="/WorkoutPage" asChild>
<Button 
         bg="#FBEFCD"
  size="md"
  variant="rounded"
  action="primary"
  
  isDisabled={false}
  isFocusVisible={false}
  onPress={() => {
    
   }}
>
  <ButtonText color="#020945">Start Training</ButtonText>
  
</Button>
    </Link>
            </Center>

           </SafeAreaView>
                
           </TouchableWithoutFeedback>
           

        </GluestackUIProvider>
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