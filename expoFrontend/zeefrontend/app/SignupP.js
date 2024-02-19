
//Joseph Somogie 2023
import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { GluestackUIProvider, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import * as SecureStore from 'expo-secure-store'
import {
  InputField,
  Input,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Center,
  Divider,
} from '@gluestack-ui/themed'

import {
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
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import styles from './stylefile'

import { Stack } from 'expo-router/stack'
const screenWidth = Dimensions.get('window').width

const SignupP = () => {
  const [first_name, setFirstname] = useState('')
  const [last_name, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  let token = null
  let refresh = null
  const handleSignup = async () => {
    let Reg = false
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
    try {
      const registerResponse = await axios.post('http://' + global.LOCAL_IP + '/register/', userDataS);
      const userId = registerResponse.data.id;
      console.log('SUCCESS');
      // Assuming Reg is a variable declared outside this block
      await axios.post('http://' + global.LOCAL_IP + '/createprofile/', { user_id: userId});
      console.log('Profile created successfully!');
      Reg = true;
    } 
    catch (error) {
        console.error('Error registering user or creating profile:', error);
    }

    if (Reg) {
      await axios
        .post('http://' + global.LOCAL_IP + '/login/', userDataRL)
        .then((response) => {
          console.log('SUCCESS (I THINK)', response.data)
          console.log('RESPONSE: ' + response.data)
          token = response.data.access
          refresh = response.data.refresh

          console.log('TOKEN: ', token)
        })

        .catch((error) => {
          console.log('ERROR')
        })

      console.log(userDataRL)
      if (token != null) {
        let tokenString = JSON.stringify(token)
        let refreshString = JSON.stringify(refresh)
        await SecureStore.setItemAsync('Token', tokenString)
        await SecureStore.setItemAsync('Refresh', refreshString)
        await SecureStore.setItemAsync('username', username)

        router.replace('/Feed')
      } else {
        console.log('Login Redirect Failed!')
      }
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Sign Up',
        }}
      />

      <GluestackUIProvider config={config}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.centerContainer}>
            <View>
              <Center>
                <Heading style={styles.coolText} paddingTop='$1/6'>
                  LBS
                </Heading>
              </Center>
            </View>
            <View style={{ padding: 3 }}></View>
           
            <View style={{ padding: 12 }}></View>
            <Center>
              <Input
              borderColor='silver'
                width='$3/5'
                variant='rounded'
                size='md'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  onChangeText={(text) => setFirstname(text)}
                  placeholder='First Name'
                  color='$amber100'
                ></InputField>
              </Input>

              <View style={{ padding: 12 }}></View>
              <Input
              borderColor='silver'
                width='$3/5'
                variant='rounded'
                size='md'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  onChangeText={(text) => setLastname(text)}
                  placeholder='Last Name'
                  color='$amber100'
                ></InputField>
              </Input>

              <View style={{ padding: 12 }}></View>
              <Input
              borderColor='silver'
                width='$3/5'
                variant='rounded'
                size='md'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  onChangeText={(text) => setEmail(text)}
                  placeholder='Email'
                  color='$amber100'
                ></InputField>
              </Input>

              <View style={{ padding: 12 }}></View>
              <Input
              borderColor='silver'
                width='$3/5'
                variant='rounded'
                size='md'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  onChangeText={(text) => setUsername(text)}
                  placeholder='Username'
                  color='$amber100'
                ></InputField>
              </Input>

              <View style={{ padding: 12 }}></View>
              <Input
              borderColor='silver'
                width='$3/5'
                type='password'
                variant='rounded'
                size='md'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  onChangeText={(text) => setPassword(text)}
                  placeholder='Password'
                  type='password'
                  color='$amber100'
                ></InputField>
              </Input>
              <View style={{ padding: 12 }}></View>
              <Input
              borderColor='silver'
                width='$3/5'
                type='password'
                variant='rounded'
                size='md'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  onChangeText={(text) => setPassword2(text)}
                  placeholder='Verify Password'
                  type='password'
                  color='$amber100'
                ></InputField>
              </Input>
              <View style={{ padding: 12 }}></View>
              <View style={{ padding: 12 }}></View>
            </Center>
            <Button
              bg='$backgroundDark0'
              size='md'
              variant='solid'
              action='primary'
              isDisabled={false}
              isFocusVisible={false}
              onPress={handleSignup}
            >
              <ButtonText color='black'>Sign Up</ButtonText>
            </Button>
            <View style={{ padding: 10 }}></View>
            <Text style={{ color: 'white' }}>Already Have Account?</Text>

            <Button
              bg='transparent'
              size='md'
              variant='link'
              action='primary'
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => {
                router.replace('/LoginP')
              }}
            >
              <ButtonText color='white'>Log In</ButtonText>
            </Button>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </GluestackUIProvider>
    </>
  )
}

export default SignupP
//Joseph Somogie 2023
