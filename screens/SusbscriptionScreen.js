import React, {useRef, useState} from 'react'
import { View } from 'react-native'
import SubscriptionCard from '../components/SubscriptionCard'

import {
  Avatar,
  Box,
  Center,
  Text,
  VStack,
  IconButton,
  HStack,
  NativeBaseProvider,
  ScrollView,
  Button, Heading
} from 'native-base'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import session from '../session/token'
import { useIsFocused } from '@react-navigation/native'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'


const SubscriptionScreen = ({ navigation }) => {


  const [subscriptions, setSubscriptions] = React.useState([])
  const getSuscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  // const suscriptionCoursesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/courses?suscription_id='
  const userSubscriptionURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/suscriptions/inscription/'
  const localSub = []
  const [subscriptionDesc, setSubscriptionDesc] = React.useState([])
  const studentId = session.userData[0].id
  const subscriptionDetails = {}
  let subsDet
  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  fetch(userSubscriptionURL + studentId, { headers: { [tokenHeader]: sessionToken } })
    .then((response) => response.json())
    .then((json) => {
      subscriptionDetails.description = json.description
      subscriptionDetails.id = json.id
      subsDet = JSON.stringify(json.description)
      setSubscriptionDesc(subsDet)
    })
    .catch((error) => {
      console.error(error)
    })

  const getSuscriptions = () => {
    return fetch(getSuscriptionsURL, { headers: { [tokenHeader]: sessionToken } })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            window.alert('Session expired')
            session.facebookSession = false
            session.firebaseSession = false
            navigation.navigate('Login')
          } else {
            window.alert('There was an error while handling your request')
          }
        } else {
          return response.json()
        }
      })
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          //console.log('Currently in subs:', subscriptionDetails.id)
          //console.log('Subscription iterating:', json[i])
          if (json[i].id === subscriptionDetails.id) {
            continue
          }
          localSub.push({ key: json[i].id, suscriptionName: json[i].description, price: json[i].price })
        }
        setSubscriptions(localSub)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function renderCurrentSubs () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text>Hola</Text>
            </View>
    )
  }

  const tabIsFocused = useIsFocused()

  React.useEffect(() => {
    if (tabIsFocused) {
      getSuscriptions()
    }

  }, [tabIsFocused])

  return (
      <NativeBaseProvider>
        <View>
            <ScrollView>
                <Center>
                    <Heading fontSize="lg">Current subscription:</Heading>
                    <Heading fontSize="lg">{JSON.stringify(subscriptionDesc).replace(/[^a-zA-Z 0-9]+/g, '')}</Heading>
                    <Text numberOfLines={1}></Text>
                    <Heading fontSize="lg">Subscriptions available:</Heading>
                </Center>
                { subscriptions.map(item => {
                  return (
                            <Pressable
                                key={item.suscriptionName}
                                onPress={ () => {
                                  navigation.navigate('SubscriptionDetail', { subscription: item })
                                }}
                            >
                                <Heading fontSize="lg">{subsDet}</Heading>
                            <SubscriptionCard
                                key={item.suscriptionName}
                                title={item.suscriptionName}
                                price={item.price}
                                duration={item.key}/>
                            </Pressable>
                  )
                }) }
            </ScrollView>
        </View>
      </NativeBaseProvider>
  )
}
export default SubscriptionScreen
