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
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import CourseCard from "../components/CourseCard";

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
                    localSub.push({ key: json[i].id, suscriptionName: json[i].description, price: json[i].price })
                }

                console.log(localSub[0]);
                setSubscriptions(localSub);
                console.log("SLOCAL SUBS:");
                console.log(subscriptions);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    React.useEffect(() => {
        getStudentCourses()
    }, [])

  return (
      <NativeBaseProvider>
        <View>


            <ScrollView>
                { subscriptions.map(item => {
                    // console.log(item)
                    return (
                            <SubscriptionCard
                                title={item.suscriptionName}
                                price={item.price}
                                duration={item.key}/>
                    )
                }) }
            </ScrollView>
        </View>
      </NativeBaseProvider>
  )
}
export default SubscriptionScreen
