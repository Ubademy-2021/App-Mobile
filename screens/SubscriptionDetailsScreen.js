import React from 'react'
import { ImageBackground, View, StyleSheet, Platform , Text} from 'react-native'
import SubscriptionCard from '../components/SubscriptionCard'

import {
    Avatar,
    Box,
    Center,
    VStack,
    IconButton,
    HStack,
    NativeBaseProvider,
    ScrollView,
    Button, Heading
} from 'native-base'
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function StudentCourseDetailsScreen ({ route }) {
    const { subscription } = route.params
    const suscriptionCoursesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/courses?suscription_id=';
    console.log(subscription);
    const localCourses = []
    const [courses, setCourses] = React.useState([])
    const getSuscriptionsCourses = () => {
        console.log("Item key:",subscription.key);
        console.log("URL:",suscriptionCoursesURL + subscription.key);
        return fetch(suscriptionCoursesURL + subscription.key)
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    localCourses.push({ key: json[i].id, courseName: json[i].courseName, duration: json[i].duration })
                }
                setCourses(localCourses);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    React.useEffect(() => {
        getSuscriptionsCourses()
    }, [])

    return (
        <NativeBaseProvider>
            <Box safeArea flex={0} p="2" w="90%" mx="auto" py="8">
                <VStack alignItems="center">
                    <Heading fontSize="xl">{subscription.suscriptionName}</Heading>
                    <Heading fontSize="lg">Price: {subscription.price}</Heading>
                    <Heading fontSize="lg">Price: {subscription.price}</Heading>
                    { courses.map(item => {
                        return (
                                <SubscriptionCard
                                    title={item.courseName}
                                    price={item.duration}
                                    duration={item.id}/>
                        )
                    }) }
                </VStack>
            </Box>
        </NativeBaseProvider>
    )

}