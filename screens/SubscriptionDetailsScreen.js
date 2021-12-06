import React from 'react'
import { Text, View } from 'react-native'
import CourseInSubscriptionCard from '../components/CourseInSubscriptionCard'
import ConfirmationAlert from '../components/ConfirmationAlert'
import {
  Box,
  VStack,
  NativeBaseProvider,
  Button, Heading,
  ScrollView,
  Collapse
} from 'native-base'
import session from '../session/token'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function StudentCourseDetailsScreen ({ navigation, route }) {
  const { subscription } = route.params
  const suscriptionCoursesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/courses?suscription_id='
  const localCourses = []
  const [courses, setCourses] = React.useState([])
  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken
  const [confirmation, setConfirmation] = React.useState(false)
  const getSuscriptionsCourses = () => {
    return fetch(suscriptionCoursesURL + subscription.key,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            window.alert('Session expired')
            session.facebookSession = false
            session.firebaseSession = false
            navigation.navigate('Login')
            /* No se recibe un navigation para ir al login */
          } else {
            window.alert('There was an error while handling your request')
          }
        } else {
          return response.json()
        }
      })
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          localCourses.push({ key: json[i].id, courseName: json[i].courseName, duration: json[i].duration, price: json[i].inscriptionPrice })
        }
        setCourses(localCourses)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    const isMounted = true
    getSuscriptionsCourses()
  }, [])

  function renderConfirmation () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text>Detalles</Text>
            </View>
    )
  }

  function renderVoid () {

  }

  return (
        <NativeBaseProvider>
            <ScrollView>
                <Collapse isOpen={confirmation}>
                    {confirmation ? renderConfirmation() : renderVoid()}
                </Collapse>
                <Collapse isOpen={!confirmation}>
                    <Box safeArea flex={0} p="2" w="90%" mx="auto" py="8">
                        <VStack alignItems="center">
                            <Heading fontSize="xl">{subscription.suscriptionName}</Heading>
                            <Heading fontSize="lg">Subscription price: {subscription.price}</Heading>
                            <Text numberOfLines={1}></Text>
                            <Heading fontSize="lg">Courses included in this subscription:</Heading>
                            <Text numberOfLines={1}></Text>
                            <Text numberOfLines={1}></Text>

                            { courses.map(item => {
                              return (
                                    <CourseInSubscriptionCard
                                        key={item.key}
                                        title={item.courseName}
                                        price={item.price}
                                        duration={item.duration}/>
                              )
                            }) }
                            <Text numberOfLines={1}></Text>
                            <Text numberOfLines={1}></Text>
                            <Button
                                onPress={() => {
                                  setConfirmation(true)
                                  // Aca hago un post, y obtengo si se pudo suscribir o no
                                }
                                }
                            >
                                Subscribe
                            </Button>
                        </VStack>
                    </Box>
                </Collapse>

                </ScrollView>
        </NativeBaseProvider>
  )
}
