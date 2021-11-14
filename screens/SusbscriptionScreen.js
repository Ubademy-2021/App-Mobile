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

    const [subscriptions, setSubscriptions] = React.useState([])
    const getSuscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
    const localSub = []
    const getStudentCourses = () => {
        return fetch(getSuscriptionsURL)
            .then((response) => response.json())
            .then((json) => {

                for (let i = 0; i < json.length; i++) {
                    localSub.push({ id: json[i].id, suscriptionName: json[i].description, price: json[i].price })
                }
                console.log("SLOCAL SUBS:");
                console.log(localSub[0]);
                console.log(localSub[0].id);
                setSubscriptions(localSub);
                console.log(localSub);
            })
            .catch((error) => {
                console.error(error)
            })
    }

  return (
      <NativeBaseProvider>
        <View>
            <SubscriptionCard
                title="asd"
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
