
//Joseph Somogie 2023
import { React, useState } from 'react'
import axios from 'axios'
import { Asset } from 'expo-asset'
import { Link, Redirect, router, useRouter } from 'expo-router'
import { Image } from 'react-native'
import { GluestackUIProvider, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import {
  InputField,
  Input,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Center,
} from '@gluestack-ui/themed'
import { Divider } from '@gluestack-ui/themed'
import * as SecureStore from 'expo-secure-store'
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
import react from 'react'
import styles from './stylefile'
import SignupP from './SignupP'

import Feed from './(tabs)/Feed'
import Layout from './_layout'

import { Stack } from 'expo-router/stack'
const screenWidth = Dimensions.get('window').width
//const imageSource = require('../assets/LBS-logoclear.gif') -Get a better logo

const LoginP = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mes, setMes] = useState('')
  const [mesVis, setMesVis] = useState()
  let TOKEN = null
  let REFRESH = null

  const handleLogin = async () => {
    const userDataL = {
      username,
      password,
    }

    await axios
      .post('http://' + global.LOCAL_IP + '/login/', userDataL)
      .then((response) => {
        console.log('SUCCESSFUL POST', response.data)

        TOKEN = response.data.access
        REFRESH = response.data.refresh

        console.log('TOKEN: ', TOKEN)
        setMes('')
        setMesVis(false)
      })

      .catch((error) => {
        console.log('BAD POST ERROR')
        setMes('Credentials Not Found!')
        setMesVis(true)
      })

    console.log(userDataL)

    if (TOKEN != null) {
      let tokenString = JSON.stringify(TOKEN)
      let refreshString = JSON.stringify(REFRESH)
      await SecureStore.setItemAsync('Token', tokenString)
      await SecureStore.setItemAsync('Refresh', refreshString)
      await SecureStore.setItemAsync('username', username)

      router.replace('/Feed')
    } else {
      console.log('Login Redirect Failed!')
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Login',
        }}
      />
      <GluestackUIProvider config={config}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.centerContainer}>
            <Center>
              <ZeeHeader></ZeeHeader>
              <View style={{ padding: 3 }}></View>
              
              <View style={{ padding: 12 }}></View>
            </Center>
            <Input
            borderColor='silver'
              isFocused={false}
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
                color='white'
              ></InputField>
            </Input>

            <View style={{ padding: 6 }}></View>

            <View style={{ padding: 6 }}></View>

            <Input
            borderColor='silver'
              width='$3/5'
              type='password'
              variant='rounded'
              size='md'
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              onFocus={()=>{}}
            >
              <InputField
                onChangeText={(text) => setPassword(text)}
                placeholder='Password'
                type='password'
                color='white'
              ></InputField>
            </Input>
            <View style={{ padding: 12 }}></View>
            {mesVis ? (
              <Text style={{ color: 'red' }}> {mes} </Text>
            ) : null}
            <View style={{ padding: 10 }}></View>
            <Center>
              <Button
                bg='$backgroundDark0'
                size='md'
                variant='rounded'
                action='primary'
                isDisabled={false}
                isFocusVisible={false}
                onPress={handleLogin}
              >
                <ButtonText color='black'>Login </ButtonText>
              </Button>

              <View style={{ padding: 10 }}></View>
              <Text style={{ color: 'white' }}>Don't have an account yet?</Text>

              <Button
                bg='transparent'
                size='md'
                variant='link'
                action='primary'
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => {
                  router.replace('/SignupP')
                }}
              >
                <ButtonText color='white'>Sign Up</ButtonText>
              </Button>
              <View>
                {
                /*<Image
                  source={imageSource}
                  style={{ width: 300, height: 300 }}
                ></Image>*/ }
              </View>
            </Center>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </GluestackUIProvider>
    </>
  )
}

const CreateAcB = () => {
  return (
    <Button
      bg='$backgroundDark0'
      size='md'
      variant='solid'
      action='primary'
      isDisabled={false}
      isFocusVisible={false}
      onPress={router.replace('/SignupP')}
    >
      <ButtonText color='black'>Sign Up</ButtonText>
    </Button>
  )
}

const ZeeHeader = () => {
  return (
    <Heading style={styles.coolText} paddingTop='$1/6'>
      LBS
    </Heading>
  )
}

export default LoginP
//Joseph Somogie 2023