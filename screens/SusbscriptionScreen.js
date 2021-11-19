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
    Button, Heading
} from 'native-base'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import session from "../session/token";

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

const SubscriptionScreen = ({ navigation }) => {

    const [subscriptions, setSubscriptions] = React.useState([])
    const getSuscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
    const suscriptionCoursesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/courses?suscription_id=';
    const userSubscriptionURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/suscriptions/inscription/';
    const localSub = []
    const studentId = session.userData[0].id
    var subscriptionDetails={}
    let subsDet;

    const getStudentCourses = () => {
        return fetch(getSuscriptionsURL)
            .then((response) => response.json())
            .then((json) => {

                for (let i = 0; i < json.length; i++) {
                    localSub.push({ key: json[i].id, suscriptionName: json[i].description, price: json[i].price })
                }

                console.log(localSub[0]);
                setSubscriptions(localSub);
                console.log("LOCAL SUBS:");
                console.log(subscriptions);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const getUserSubscription = () => {

        /* TODO: No hardcodear este fetch */
        return fetch(userSubscriptionURL+'1')
            .then((response) => response.json())
            .then((json) => {
                console.log("URL de suscricpion:",userSubscriptionURL+studentId);
                console.log("Student id:",studentId);
                console.log("Suscripcion:",json);

                subscriptionDetails.description=json.description;
                console.log("Description aca es:",json.description);
                subscriptionDetails.id=json.id;
                subsDet=JSON.stringify(json.description);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function renderCurrentSubs() {
        //await getUserSubscription();
        console.log("SUBSD DET ES:",subsDet);
        return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text>Hola</Text>
            </View>
        )
    }

    React.useEffect(async () => {
        getStudentCourses()
        await getUserSubscription()
    }, [])

  return (
      <NativeBaseProvider>
        <View>

            <ScrollView>
                {renderCurrentSubs()}
                { subscriptions.map(item => {
                    return (

                            <Pressable
                                key={item.suscriptionName}
                                onPress={async () => {
                                    console.log("local sub:", localSub);
                                    console.log("Details es:", subscriptionDetails.description);
                                    console.log("Details es:", subsDet);
                                    //getSuscriptionsCourses(item.key);
                                    navigation.navigate('SubscriptionDetail', {subscription: item});
                                }}
                            >
                                <Heading fontSize="lg">{subsDet}</Heading>
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
