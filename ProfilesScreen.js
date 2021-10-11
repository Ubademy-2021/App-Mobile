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
        /*
        <Icon.Button
            name="chalkboard-teacher"
            //backgroundColor="#3b5998"
            size={30}
        >
            Student Profile
        </Icon.Button>*/
    <NativeBaseProvider>
        <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
            <View style={{justifyContent: 'center',alignItems: 'center'}}>

                <Heading size="md" fontWeight="600" color="coolGray.800">
                    Choose the profile you want to use
                </Heading>
            </View>
            <Text numberOfLines={3}></Text>
            <Icon.Button
                onPress={() => {
                    window.alert("Student profile")
                }
                }
                name="book"
                backgroundColor='rgba(54, 204, 235, 0.8)'
                //backgroundColor="#3b5998"
                size={100}
            >
                Student Profile
            </Icon.Button>
            <Text numberOfLines={2}></Text>
            <Icon.Button
                onPress={() => {
                    window.alert("Collaborator profile")
                }
                }
                name="book-reader"
                backgroundColor='rgba(54, 235, 94, 0.8)'
                //backgroundColor="#3b5998"
                size={100}
            >
                Collaborator Profile
            </Icon.Button>
            <Text numberOfLines={2}></Text>
            <Icon.Button
                onPress={() => {
                    window.alert("Creator profile")
                }
                }
                name="chalkboard-teacher"
                backgroundColor='rgba(235, 73, 52, 0.8)'
                //backgroundColor="#3b5998"
                size={100}
            >
                Creator Profile
            </Icon.Button>

        </Box>
    </NativeBaseProvider>
    )
}
