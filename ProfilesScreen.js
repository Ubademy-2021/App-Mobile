import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import logo from './assets/ubademy.png'
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    IconButton,
    HStack,
    Divider,
} from 'native-base';




export default function ProfilesScreen() {
    return(
        <Icon.Button
            name="chalkboard-teacher"
            //backgroundColor="#3b5998"
            size={30}
        >
            Student Profile
        </Icon.Button>
    )
}
