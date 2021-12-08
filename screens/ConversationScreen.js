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
    const [name, setName] = useState(null)
    const [realName, setRealName] = useState(null)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        readUser()

        chatsRef.where('senderId','==',52)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log("Dato:",documentSnapshot.data())
                });
            });

        /*chatsRef.get().then(querySnapshot =>{
            querySnapshot.forEach(documentSnapshot => {
                console.log("Dato:",documentSnapshot.data())
            });
        })*/
        /*const unsubscribe = chatsRef.where('text','===',"Segunda mensaje").get().then(querySnapshot => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .map(({doc}) => {
                    const message = doc.data()

                    const json =JSON.parse(JSON.stringify(message))

                    //console.log("User id:",json['user'])
                    console.log("Sender id:",json['user']['id'])
                    console.log("Receiver id:",json['user']['receiverId'])
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return {...message, createdAt: message.createdAt.toDate()}
                })
            console.log(messagesFirestore);
            appendMessages(messagesFirestore)
        })*/

        /*const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .map(({doc}) => {
                    const message = doc.data()

                    const json =JSON.parse(JSON.stringify(message))

                    //console.log("User id:",json['user'])
                    console.log("Sender id:",json['user']['id'])
                    console.log("Receiver id:",json['user']['receiverId'])
                    if(json['user']['id'] !== 52){
                        continue
                    }
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return {...message, createdAt: message.createdAt.toDate()}
                })
            console.log(messagesFirestore);
            appendMessages(messagesFirestore)
        })*/
        //return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser(){
        //const user= { session.userData[0].id , session.userData[0].username}
        console.log(session.userData[0].id)
        const id=session.userData[0].id
        const receiverId=21
        setRealName(session.userData[0].username)
        const user={id, receiverId}
        setUser(user)
        /*const user = await AsyncStorage.getItem('user')
        if(user){
            setUser(JSON.parse(user));
        }*/
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