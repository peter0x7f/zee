import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';


const LoginButton = () => {
    return(
        <View>
            <TouchableOpacity
            style={styles.button}
                onPress={() => {
                 console.log('Login Button Pressed');
                }}>
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