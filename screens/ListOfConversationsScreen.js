import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet, Text, TextInput, View, YellowBox, Button} from 'react-native'
import session from '../session/token'
import {ListItem, Avatar} from "react-native-elements"
import CustomListItem from "../components/CustomListItem"
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import {
ScrollView,
    NativeBaseProvider
} from 'native-base'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'
const getUsersUrl = 'https://ubademy-user-service.herokuapp.com/api/users'
const ListOfConversationsScreen = ({ navigation }) => {
    const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
    const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken
    const [chats, setChats] = React.useState([])
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    async function getUsersFromApi() {
        return await fetch(getUsersUrl,
            {headers: {[tokenHeader]: sessionToken}})
            .then((response) => response.json())
            .then((json) => {
                //const [users_,setUsers_] = React.useState([])
                const users__ = []
                for (const user of json){
                    if(user.id === session.userData[0].id){
                        continue
                    }
                    users__.push(user)
                    //console.log("Username: userId:",user.userName, user.id)
                }
                //setUsers_(usersIds)
                return users__
            })
            .catch((error) => {
                console.error(error)
            })
    }

    React.useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
            //navigation.navigate("Conversation", { senderId: 4, receiverId: session.userData[0].id });
            navigation.navigate("Messages");
            //console.log("ACA REDIRECCIONO")
        });

        async function fetchData(){
            const users= await getUsersFromApi();
            setChats(users);
        }
        fetchData()
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

    const enterChat = (senderId,receiverId, userInfo) => {
        //console.log("SENDER ID:",senderId,receiverId)
        navigation.navigate("Conversation", { senderId: senderId, receiverId: receiverId, userInfo: userInfo });
    }

    return (
        <NativeBaseProvider>
            <ScrollView>

                {chats.map(item => (
                    <CustomListItem
                        key={item.id}
                    senderId={session.userData[0].id}
                    receiverId={item.id}
                        username={item.userName}
                        userInfo={item}
                    enterChat = {enterChat}
                    />
                    ))}

            </ScrollView>
        </NativeBaseProvider>
    )
}

export default ListOfConversationsScreen;