//@refresh reset
import * as firebase from 'firebase'
import 'firebase/firestore'
import React, {useState, useEffect, useCallback} from 'react'
//import AsyncStorage from '@react-native-community/async-storage'
import { AsyncStorage}  from "react-native";
import {StyleSheet, Text, TextInput, View, YellowBox, Button} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import Firebase from '../config/firebase'
import {GiftedChat} from 'react-native-gifted-chat'
import session from '../session/token'

const db = Firebase.firestore()
const chatsRef = db.collection('chats')


const App = () => {
    const [user, setUser] = useState(null)
    const [user2, setUser2] = useState(null)
    const [name, setName] = useState(null)
    const [realName, setRealName] = useState(null)
    const [messages, setMessages] = useState([])
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);

    useEffect(() => {
        readUser()

        const unsubscribe =chatsRef.where('user.senderId','==',52)
            .onSnapshot(
            (querySnapshot) => {
                const messagesFirestore = querySnapshot
                    .docChanges()
                    .filter(({ type }) => type === 'added')
                    .map(({doc}) => {
                        console.log("Dato:",doc.data())
                        const message = doc.data()
                        return {...message, createdAt: message.createdAt.toDate()}
                    })
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                appendMessages(messagesFirestore)
            });
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser(){
        const senderId=session.userData[0].id
        const receiverId=21
        const user_={senderId, receiverId}
        setUser(user_)
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
    /*if(!user){
        return (
            <View style={styles.container}>
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
                <TextInput style={styles.input} placeholder = "Enter your name" value={name} onChangeText={setName}/>
                <Button onPress={handlePress} title="Enter the chat"/>
            </View>
        )
    }*/
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
})