
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
import CreatorAddNewCourseScreen from './screens/CreatorAddNewCourseScreen'
import CreatorMyCoursesScreen from './screens/CreatorMyCoursesScreen'
import CollaboratorMyCollaborationsScreen from './screens/CollaboratorMyCollaborationsScreen'

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
        <Tab.Screen name="Suscribe" component={SubscriptionScreen} options={{
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
          {/* <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} /> */}
          <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
          {/* <Stack.Screen name="StudentCourseSearch" component={StudentCourseSearchScreen} options={{ title: 'Course Search' }}/> */}
          <Stack.Screen name="StudentCourse" component={StudentCourseDetailsScreen} options={{ title: 'Course Details' }}/>
          <Stack.Screen name="ProfileEditor" component={ProfileEditorScreen} />
          <Stack.Screen name="SubscriptionDetail" component={SubscriptionDetailsScreen} />
          <Stack.Screen name="Conversation" component={ConversationScreen} />
          <Stack.Screen name="CreateCourse" component={CreatorAddNewCourseScreen} options={{ title: 'Create Course' }} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App

/*
//@refresh reset
import * as firebase from 'firebase'
import 'firebase/firestore'
import React, {useState, useEffect, useCallback} from 'react'
//import AsyncStorage from '@react-native-community/async-storage'
import { AsyncStorage}  from "react-native";
import {StyleSheet, Text, TextInput, View, YellowBox, Button} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import Firebase from './config/firebase'
import {GiftedChat} from 'react-native-gifted-chat'

const db = Firebase.firestore()
const chatsRef = db.collection('chats')


const App = () => {
  const [user, setUser] = useState(null)
  const [name, setName] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    readUser()
    console.log(chatsRef.onSnapshot)
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type === 'added')
          .map(({ doc }) => {
            const message = doc.data()
            //createdAt is firebase.firestore.Timestamp instance
            //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
            return { ...message, createdAt: message.createdAt.toDate() }
          })
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, [])

  const appendMessages = useCallback(
      (messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
      },
      [messages]
  )

  async function readUser(){
    const user = await AsyncStorage.getItem('user')
    if(user){
      setUser(JSON.parse(user));
    }
  }

  async function handlePress(){
    const _id = Math.random().toString(36).substring(7) //ID DEL USUARIO DE AUTH
    const user= {_id, name}
    await AsyncStorage.setItem('user',JSON.stringify(user))
    setUser(user)
  }

  //Me manda los mensajes a la DB
  async function handleSend(messages){
  const writes = messages.map(m => chatsRef.add(m))
    await Promise.all(writes)
  }
  if(!user){
    return (
        <View style={styles.container}>
          <Text numberOfLines={1}></Text>
          <Text numberOfLines={1}></Text>
          <Text numberOfLines={1}></Text>
          <TextInput style={styles.input} placeholder = "Enter your name" value={name} onChangeText={setName}/>
          <Button onPress={handlePress} title="Enter the chat"/>
        </View>
          )
  }
  return  <GiftedChat messages={messages} user={user} onSend={handleSend}/>

}
export default App
const styles = StyleSheet.create({
  container_: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
})*/