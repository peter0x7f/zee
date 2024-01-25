
import { Link, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
/*
Simple func signs user out and checks for errors.
*/ 
const SignOut = async () =>
{
  //DELETE AUTH TOKENS
    await SecureStore.deleteItemAsync('Token');
    await SecureStore.deleteItemAsync('Refresh');
    await SecureStore.deleteItemAsync('username');
  //CHECK IF THEY EXIST POST DELETION
    let Token = await SecureStore.getItemAsync('Token');
    let Refresh = await SecureStore.getItemAsync('Refresh');
    let username =  await SecureStore.getItemAsync('username');
  //IF SUCCESSFULY DELETED
    if(Token == null && Refresh == null && username == null){
        console.log("Signout Success")
      router.replace('/LoginP')
    }//IF TOKENS STILL ACCESSIBLE
    else if(Token != null || Refresh != null || username != null)
    {
        console.log("Signout Failed! Token =", JSON.stringify(Token), " Refresh =",  JSON.stringify(Refresh))
    }
}
export default SignOut;