import { StyleSheet, Text, View } from "react-native";
import {Link} from 'expo-router'
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage"
import LoginP from "./LoginP";
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
import {axios} from 'axios';
export default function Page() {
  return (
  <GluestackUIProvider config = {config}>
    
    <LoginP></LoginP>
    
  </GluestackUIProvider>
   

   
  
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
