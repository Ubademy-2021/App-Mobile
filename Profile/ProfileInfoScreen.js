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
    Divider, ScrollView
} from 'native-base'
import getCapitalLetters from "./AvatarLetters";


export default function ProfileInfo ({ navigation }) {
    console.log(session.userData[0]);
    var capitalLetters=getCapitalLetters(session.userData[0].userName);

    const helloMessage= <Text> Hello, JSX!</Text>
    const goodbyeMessage= <Text>Goodbye, JSX!</Text>

    function renderField(fieldToRender){
        return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.informationText}> {fieldToRender}</Text>
            </View>
        )
    }
    function renderVoid(){
        return ;
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <ImageBackground source={logo} resizeMode="cover" style={styles.image}>
                <HStack>
                    <Center flex={1} px="3">
                        <View style={styles.headerColumn}>
                        <Avatar
                            mr={1}
                            source={{
                                uri: "https://bit.ly/broken-link",
                            }}
                            size="2xl"
                        >
                            {capitalLetters}
                        </Avatar>
                            <Text style={styles.userNameText}>{session.userData[0].userName}</Text>
                            <View style={styles.userAddressRow}>
                                <View style={styles.userCityRow}>
                                    <Text style={styles.userCityText}>
                                        {session.userData[0].city}, {session.userData[0].country}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Center>
                </HStack>
                    <Text numberOfLines={1}></Text>
                    <Text numberOfLines={1}></Text>

                </ImageBackground>
                <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                        <Text style={styles.headerText}> Profile Information</Text>
                    <Text numberOfLines={1}></Text>
                    <Text style={styles.informationText}> Email:</Text>
                        <Text style={styles.informationText}>{session.userData[0].email}</Text>
                    <Text numberOfLines={1}></Text>
                    <Text style={styles.informationText}> Address:</Text>
                        <Text style={styles.informationText}>{session.userData[0].address}</Text>
                    <Text numberOfLines={1}></Text>
                    <Text style={styles.informationText}> Username:</Text>
                        <Text style={styles.informationText}>{session.userData[0].userName}</Text>
                    {session.userData[0].name==='null' ? renderVoid() : renderField(session.userData[0].name)}
                    {session.userData[0].surname==='null' ? renderVoid() : renderField(session.userData[0].surname)}
                    {session.userData[0].phoneNumber==='null' ? renderVoid() : renderField(session.userData[0].phoneNumber)}

                </Box>
            </ScrollView>
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
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 45,
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    informationText:{
        color: '#000000',
        fontSize: 18,
        fontWeight: '600',
    },
    headerText:{
        textAlign: "center",
        color: '#000000',
        fontSize: 22,
        fontWeight: '600',
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    }
});

