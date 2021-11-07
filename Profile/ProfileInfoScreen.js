import React from 'react'
import { ImageBackground, View, StyleSheet, Image } from 'react-native'
import session from '../session/token'
import "./AvatarLetters"
import logo from '../assets/backgroundProfile.jpg'
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
    console.log(session.userData[0]);
    var capitalLetters=getCapitalLetters(session.userData[0].userName);
    return (
        <NativeBaseProvider>
            <ImageBackground source={logo} resizeMode="cover" style={styles.image}>
            <HStack>
                <Center flex={1} px="3">

                    <Avatar
                        mr={1}
                        source={{
                            uri: "https://bit.ly/broken-link",
                        }}
                        size="2xl"
                    >
                        {capitalLetters}
                    </Avatar>

                </Center>
            </HStack>
            </ImageBackground>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});
