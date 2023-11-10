import {React, useState} from "react";
//change to your localhost IP to access backend. find local ip with
//terminal command 'ipconfig' (windows) or 'ifconfig' (mac)
// when changing be sure to include port 8000
//sample address should look like: 192.168.1.1:8000
//                                      ^       ^
//                                  address    Port # (always 8000)

global.LOCAL_IP = '192.168.1.13:8000' // <- set as string