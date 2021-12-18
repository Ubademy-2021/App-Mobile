import React from 'react'
import { ImageBackground, View, StyleSheet, Platform ,TouchableOpacity} from 'react-native'
import session from '../session/token'
import getCapitalLetters from './AvatarLetters'
import logo from '../assets/backgroundProfile.jpg'

import {
    Avatar,
    Box,
    Center,
    Text,
    VStack,
    IconButton,
    HStack,
    NativeBaseProvider,
    ScrollView
} from 'native-base'

import { FontAwesome5 } from '@expo/vector-icons'

export default function ProfileInfo ({ navigation, route }) {
    console.log("Parametros recibidos:",route.params.userInfo)


    return (
        <NativeBaseProvider>
            <ScrollView>
                <Text>Hola</Text>
            </ScrollView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
        margin: 100
    },
    image: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0'
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 45
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1
            },
            android: {
                alignItems: 'center'
            }
        })
    },
    placeIcon: {
        color: 'white',
        fontSize: 26
    },
    scroll: {
        backgroundColor: '#FFF'
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    userCityRow: {
        backgroundColor: 'transparent'
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center'
    },
    informationText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '600'
    },
    fieldHeaderText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '600',
        textDecorationLine: 'underline'
    },
    headerText: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 22,
        fontWeight: '900'
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center'
    }
})
