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
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

const SubscriptionScreen = ({ navigation }) => {

    const [subscriptions, setSubscriptions] = React.useState([])
    const getSuscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
    const suscriptionCoursesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/courses?suscription_id=';
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

    const getSuscriptionsCourses = (itemKey) => {
        console.log("Item key:",itemKey);
        console.log("URL:",suscriptionCoursesURL + itemKey);
        return fetch(suscriptionCoursesURL + itemKey)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
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
                    return (
                            <Pressable
                                key={item.suscriptionName}
                                onPress={() => {
                                    //getSuscriptionsCourses(item.key);
                                    navigation.navigate('SubscriptionDetail',{ subscription: item });
                                }}
                            >
                            <SubscriptionCard
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
