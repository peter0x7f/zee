import React from 'react';
import App from './App'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import axios from 'axios'
const AxiosReq = () => {
    axios.get('http://')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
const LoginButton = () => {
    return(
        <View>
            <TouchableOpacity
            style={styles.button}
                onPress={AxiosReq}>
                    <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
button: {
    backgroundColor: '#FBEFCD',
    padding: 10,
    borderRadius: 5,
},
buttonText: {
color: 'black',
textAlign:'center',
},
});

export default LoginButton;