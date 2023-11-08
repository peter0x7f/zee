import { StyleSheet, Text, View } from "react-native";
import {Link} from 'expo-router'

import LoginP from "./LoginP";
import { GluestackUIProvider,  Box } from "@gluestack-ui/themed";
import { config} from "@gluestack-ui/config";
import {axios} from 'axios';
import {Redirect} from 'expo-router'; 
import { useAuth } from "./Contexts/AuthContext";
import { AuthProvider } from "./Contexts/AuthContext";
export default function Page() {
  return (
  <AuthProvider>
    <LoginP></LoginP>
  </AuthProvider>
   

   
  
 
  );
}

