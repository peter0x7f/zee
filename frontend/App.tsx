
import React from 'react';

import type {PropsWithChildren} from 'react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  
  return (
    <NavigationContainer>{
      <View style={styles.sectionContainer}>
    <Text
      style={[
        styles.sectionTitle,
        {
          color: isDarkMode ? Colors.white : Colors.black,
        },
      ]}>
      {title}
    </Text>
    <Text
      style={[
        styles.sectionDescription,
        {
          color: isDarkMode ? Colors.light : Colors.dark,
        },
      ]}>
      {children}
    </Text>
  </View>
  }</NavigationContainer>
    
  );
}
const screenWidth = Dimensions.get('window').width; //way to size text inputs
const Stack = createNativeStackNavigator(); //Creation of Stack navigation
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
 <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginPage}/>  
    <Stack.Screen name="Signup" component={SignupPage}/>
  </Stack.Navigator>
 </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 40,
  },
 signupContainer: {
  flex: 0.15,
  justifyContent: 'center',
  paddingHorizontal: 16,
 },
 input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 1,
    paddingHorizontal: 10,
    color: 'white',
 },
  // Text style with a big white font
  coolText: {
    fontSize: 60,       // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold (optional)
    color: 'white',     // Set the text color to white
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  text:{
    fontSize: 35
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
