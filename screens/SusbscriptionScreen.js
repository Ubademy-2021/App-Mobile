import React from 'react'
import { ImageBackground, View, StyleSheet, Platform } from 'react-native'
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
    Button
} from 'native-base'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

const SubscriptionScreen = () => {


    const getSuscriptionsURL = apiGatewayBaseUrl + 'suscriptions'

    const getStudentCourses = () => {
        return fetch(getSuscriptionsURL)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                console.error(error)
            })
    }

  return (
      <NativeBaseProvider>
        <View>
            <SubscriptionCard
                title="title"
                price="price"
                duration="duration"/>
            <Button
                onPress={() => {
                    getStudentCourses();
                }
                }
            >
                Continue
            </Button>
          <Text>Not implemented yet</Text>
        </View>
      </NativeBaseProvider>
  )
}
export default SubscriptionScreen
