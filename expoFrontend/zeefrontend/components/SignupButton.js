import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const SignupButton = () => {
    return(
        <View>
            <TouchableOpacity
            style={styles.button}
                onPress={() => {
                 console.log('Signup Button Pressed');
                }}>
                    <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignupButton;