
import LogInScreen from './screens/LogInScreen'
import SignUpScreen from './screens/SignUpScreen'
import InterestsScreen from './screens/InterestsScreen'
import LocationScreen from './screens/LocationScreen'
import ProfileSelectionScreen from './screens/ProfileSelectionScreen'
import ProfileInfoScreen from './Profile/ProfileInfoScreen'
import ProfileEditorScreen from './Profile/ProfileEditorScreen'

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SignUpOptionsScreen from './screens/SignUpOptionsScreen'
import StudentCourseSearchScreen from './screens/StudentCourseSearchScreen'
import StudentCourseDetailsScreen from './screens/StudentCourseDetailsScreen'
import StudentMyCoursesScreen from './screens/StudentMyCoursesScreen'
import SubscriptionScreen from './screens/SusbscriptionScreen'
import SubscriptionDetailsScreen from './screens/SubscriptionDetailsScreen'
import ConversationScreen from './screens/ConversationScreen'
import ListOfConversationsScreen from './screens/ListOfConversationsScreen'
import { AntDesign } from '@expo/vector-icons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import StudentMyFavouritesScreen from './screens/StudentMyFavouritesScreen'
import CreatorAddNewCourseScreen from './screens/CreatorAddNewCourseScreen'
import CreatorMyCoursesScreen from './screens/CreatorMyCoursesScreen'
import CreatorCourseDetailsScreen from './screens/CreatorCourseDetailsScreen'
import CollaboratorMyCollaborationsScreen from './screens/CollaboratorMyCollaborationsScreen'
import CourseContentScreen from './screens/CourseContentScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function StudentHome () {
  return (
      <Tab.Navigator initialRouteName='Profile'>
        <Tab.Screen
            name="MyCourses"
            component={StudentMyCoursesScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => { return <MaterialIcons name="class" size={24} color="black" /> }
            }} />
        <Tab.Screen
            name="Search"
            component={StudentCourseSearchScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => { return <AntDesign name="search1" size={24} color="black" /> }
            }}/>
        <Tab.Screen
          name="MyFavourites"
          component={StudentMyFavouritesScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => { return <AntDesign name="staro" size={24} color="black" /> }
          }} />
        <Tab.Screen
          name="Suscribe"
          component={SubscriptionScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => { return <Foundation name="sheriff-badge" size={24} color="black" /> }
          }} />
        <Tab.Screen
          name="Profile"
          component={ProfileInfoScreen} options={{
            headerShown: false,
            tabBarIcon: () => { return <AntDesign name="user" size={24} color="black" /> }
          }}/>
        <Tab.Screen
            name="Messages"
            component={ListOfConversationsScreen} options={{
              headerShown: false,
              tabBarIcon: () => { return <AntDesign name="message1" size={24} color="black" /> }
            }}/>
      </Tab.Navigator>
  )
}

function CreatorHome () {
  return (
      <Tab.Navigator initialRouteName='Profile'>
      <Tab.Screen name="MyCourses" component={CreatorMyCoursesScreen} options={{ headerShown: false, tabBarIcon: () => { return <MaterialIcons name="class" size={24} color="black" /> } }} />
      <Tab.Screen name="Profile" component={ProfileInfoScreen} options={{ headerShown: false, tabBarIcon: () => { return <AntDesign name="user" size={24} color="black" /> } }}/>
      <Tab.Screen
        name="Messages"
        component={ListOfConversationsScreen} options={{
          headerShown: false,
          tabBarIcon: () => { return <AntDesign name="message1" size={24} color="black" /> }
        }}/>
      </Tab.Navigator>
  )
}

function CollaboratorHome () {
  return (
      <Tab.Navigator initialRouteName='Profile'>
          <Tab.Screen name="MyCollaborations" component={CollaboratorMyCollaborationsScreen} options={{ headerShown: false, tabBarIcon: () => { return <MaterialIcons name="class" size={24} color="black" /> } }} />
          <Tab.Screen name="Profile" component={ProfileInfoScreen} options={{ headerShown: false, tabBarIcon: () => { return <AntDesign name="user" size={24} color="black" /> } }}/>
          <Tab.Screen
              name="Messages"
              component={ListOfConversationsScreen} options={{
                headerShown: false,
                tabBarIcon: () => { return <AntDesign name="message1" size={24} color="black" /> }
              }}/>
      </Tab.Navigator>
  )
}

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
              name="StudentHome"
              component={StudentHome}
              options={{ title: 'Student Profile' }}
          />
          <Stack.Screen
              name="CreatorHome"
              component={CreatorHome}
              options={{ title: 'Creator Profile' }}
          />
          <Stack.Screen
              name="CollaboratorHome"
              component={CollaboratorHome}
              options={{ title: 'Collaborator Profile' }}
          />
          <Stack.Screen name="Login" component={LogInScreen} options={{ title: 'Welcome' }}/>
          <Stack.Screen name="SignupOptions" component={SignUpOptionsScreen}/>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Interests" component={InterestsScreen} options={{ title: 'Interests' }}/>
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
          <Stack.Screen name="StudentCourse" component={StudentCourseDetailsScreen} options={{ title: 'Course Details' }}/>
          <Stack.Screen name="ProfileEditor" component={ProfileEditorScreen} />
          <Stack.Screen name="SubscriptionDetail" component={SubscriptionDetailsScreen} />
          <Stack.Screen name="Conversation" component={ConversationScreen} />
          <Stack.Screen name="CreateCourse" component={CreatorAddNewCourseScreen} options={{ title: 'Create Course' }} />
          <Stack.Screen name="CreatorCourse" component={CreatorCourseDetailsScreen} options={{ title: 'Course details' }} />
            <Stack.Screen name="CourseContent" component={CourseContentScreen} options={{ title: 'Course content' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App


/*
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import Firebase from './config/firebase'

const db = Firebase.firestore()
const tokensRef = db.collection('tokensNotif')


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync()
        .then((token) => {
            setExpoPushToken(token);
            console.log("Token aca es", token);
            tokensRef.doc(token).set({
                userId: 3,
                token: token
            }).then(() => {
                console.log("Token added!")
            })
        }
        );

        //Obtiene el token de un usuario en especifico, devuelve un objeto con token y userId si ese user
        //tiene token, sino nada

        tokensRef.where('userId','==',2).get().then(querySnapshot => {

            console.log("TOtal users:",querySnapshot.size);

            querySnapshot.forEach(documentSnapshot => {
                console.log("Datos:",documentSnapshot.data())
            })

        })


        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to Send Notification"
                onPress={async () => {
                    await sendPushNotification(expoPushToken);
                }}
            />
        </View>
    );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}*/



