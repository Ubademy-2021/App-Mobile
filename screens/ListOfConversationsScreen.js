import React from 'react'
import {StyleSheet, Text, TextInput, View, YellowBox, Button} from 'react-native'
import session from '../session/token'
import {ListItem, Avatar} from "react-native-elements"
import CustomListItem from "../components/CustomListItem"

import {
ScrollView,
    NativeBaseProvider
} from 'native-base'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'
const getUsersUrl = 'https://ubademy-user-service.herokuapp.com/api/users'
const ListOfConversationsScreen = ({ navigation }) => {
    const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
    const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken
    console.log('session token:', sessionToken)
    console.log('Header:', tokenHeader)


    fetch(getUsersUrl,
        {headers: {[tokenHeader]: sessionToken}})
        .then((response) => response.json())
        .then((json) => {
            console.log("Users:",json)
        })
        .catch((error) => {
            console.error(error)
        })

    const enterChat = () => {
        navigation.navigate("Conversation");
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <CustomListItem
                enterChat = {enterChat}
                />
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default ListOfConversationsScreen;