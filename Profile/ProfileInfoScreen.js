import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import session from '../session/token'
import "./AvatarLetters"
import {
    Avatar,
    Box,
    Center,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    IconButton,
    HStack,
    NativeBaseProvider,
    Divider
} from 'native-base'
import getCapitalLetters from "./AvatarLetters";


export default function ProfileInfo ({ navigation }) {
    console.log(session.userData[0].email);
    var capitalLetters=getCapitalLetters(session.userData[0].username);
    return (
        <NativeBaseProvider>
            <HStack>
                <Center flex={1} px="3">
                    <Avatar
                        mr={1}
                        source={{
                            uri: "https://bit.ly/broken-link",
                        }}
                        size={100}
                    >
                        {capitalLetters}
                    </Avatar>
                </Center>

            </HStack>
            <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                <Text numberOfLines={1}></Text>
                <Text> Profile Information</Text>
                <Text>{session.userData[0].email}</Text>
                <Text>{session.userData[0].address}</Text>
                <Text>{session.userData[0].country}</Text>
                <Text>{session.userData[0].userName}</Text>
                <Text>{session.userData[0].city}</Text>

            </Box>
        </NativeBaseProvider>
    )
}
