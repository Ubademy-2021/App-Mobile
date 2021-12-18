//@refresh reset
import * as firebase from 'firebase'
import 'firebase/firestore'
import React, {useState, useEffect, useCallback} from 'react'
import {StyleSheet, Text, TextInput, View, YellowBox, Button} from 'react-native'
import Firebase from '../config/firebase'
import {GiftedChat} from 'react-native-gifted-chat'
import session from '../session/token'

const db = Firebase.firestore()
const chatsRef = db.collection('chats')

function getChatRef(userId1, userId2) {
    if (userId1 < userId2) {
        return userId1 + '_' + userId2;
    } else {
        return userId2 + '_' + userId1;
    }
};

export default function ConversationScreen ({ navigation, route }) {
    const [user, setUser] = useState(null)
    const [name, setName] = useState(null)
    const [messages, setMessages] = useState([])
    const [conversationID,setConversationID] =useState([])
    const chatId= getChatRef(session.userData[0].id,route.params.receiverId)
    //console.log("Receiver id:",route.params.receiverId)
    //console.log("Sender id:",route.params.senderId)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("FriendProfile",{userInfo: route.params.userInfo})}
                        title="Update count" />
            ),
            title: route.params.userInfo.userName
        });
    }, [navigation]);

    useEffect(() => {
        readUser()

        //On snapshot hace que sea en tiempo real
        const unsubscribe =db.collection('chats').where('user.chatID','==',chatId)
            .onSnapshot(
            (querySnapshot) => {
                const messagesFirestore = querySnapshot
                    .docChanges()
                    .filter(({ type }) => type === 'added')
                    .map(({doc}) => {
                        //console.log("Dato:",doc.data())
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
        const _id=session.userData[0].id
        const chatID=getChatRef(_id,route.params.receiverId)
        const user_={_id,chatID}
        setUser(user_)
    }

    //Me manda los mensajes a la DB
    async function handleSend(messages){
        const writes = messages.map(m => chatsRef.add(m))
        await Promise.all(writes)
    }

    //Al enviar un mensaje, poniendo el _id identifico quien lo esta enviando. Me serve para el display
    return  <GiftedChat messages={messages} user={user} onSend={handleSend}/>
}

//export default ConversationScreen
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