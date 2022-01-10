import React, { useRef, useState } from 'react'
import session from '../session/token'
import CustomListItem from '../components/CustomListItem'
import * as Notifications from 'expo-notifications'

import {
  ScrollView,
  NativeBaseProvider
} from 'native-base'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'
const getUsersUrl = 'https://ubademy-user-service.herokuapp.com/api/users'
const ListOfConversationsScreen = ({ navigation }) => {
  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken
  const [chats, setChats] = React.useState([])
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  async function getUsersFromApi () {
    return await fetch(getUsersUrl,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => response.json())
      .then((json) => {
        // const [users_,setUsers_] = React.useState([])
        const users__ = []
        for (const user of json) {
          if (user.id === session.userData[0].id) {
            continue
          }
          users__.push(user)
        }
        // setUsers_(usersIds)
        return users__
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      navigation.navigate('Messages')
    })

    async function fetchData () {
      const users = await getUsersFromApi()
      setChats(users)
    }
    fetchData()
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  const enterChat = (senderId, receiverId, userInfo) => {
    navigation.navigate('Conversation', { senderId: senderId, receiverId: receiverId, userInfo: userInfo })
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

export default ListOfConversationsScreen
