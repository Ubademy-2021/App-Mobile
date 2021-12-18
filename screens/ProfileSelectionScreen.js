import React, {useEffect, useState} from 'react'
import {Platform, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import session from '../session/token'

import {
  NativeBaseProvider,
  Box,
  Text,
  Heading
} from 'native-base'
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import Firebase from '../config/firebase'

const db = Firebase.firestore()
const tokensRef = db.collection('tokensNotif')

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

export default function ProfileSelectionScreen ({ navigation }) {
    const [expoPushToken, setExpoPushToken] = useState('');


    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => {
                    setExpoPushToken(token);
                    console.log("Token aca es", token);
                    tokensRef.doc(token).set({
                        userId: session.userData[0].id,
                        token: token
                    }).then(() => {
                        console.log("Token added!")
                    })
                }
            );
    })



  return (
    <NativeBaseProvider>
        <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <Heading size="md" fontWeight="600" color="coolGray.800">
                    Choose the profile you want to use
                </Heading>
            </View>
            <Text numberOfLines={3}></Text>
            <Icon.Button
                onPress={() => {
                  // navigation.navigate("ProfileInfo",{ profile: "Student Profile" });
                  navigation.navigate('StudentHome')
                }
                }
                name="book"
                backgroundColor='rgba(54, 204, 235, 0.8)'
                size={100}
            >
                Student Profile
            </Icon.Button>
            <Text numberOfLines={2}></Text>
            <Icon.Button
                onPress={() => {
                  navigation.navigate('CollaboratorHome')
                }
                }
                name="book-reader"
                backgroundColor='rgba(82, 0, 167, 0.8)'
                size={100}
            >
                Collaborator Profile
            </Icon.Button>
            <Text numberOfLines={2}></Text>
            <Icon.Button
                onPress={() => {
                  navigation.navigate('CreatorHome')
                }
                }
                name="chalkboard-teacher"
                backgroundColor='rgba(0, 57, 143, 0.8)'
                size={100}
            >
                Creator Profile
            </Icon.Button>

        </Box>
    </NativeBaseProvider>
  )
}

