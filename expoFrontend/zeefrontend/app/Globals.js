//Joseph Somogie 2023
import { React, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
//change to your localhost IP to access backend. find local ip with
//terminal command 'ipconfig' (windows) or 'ifconfig' (mac)
// when changing be sure to include port 8000
//sample address should look like: 192.168.1.1:8000
//                                      ^       ^
//                                  address    Port # (always 8000)

global.LOCAL_IP = '10.20.152.236' + ':8000'
//Joseph Somogie 2023
