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
import Notification from '../components/Notification'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

const paymentsServiceUrl = 'https://ubademy-payments-service.herokuapp.com/deposit'

export default function StudentCourseDetailsScreen ({ navigation, route }) {
  const { subscription } = route.params
  const suscriptionCoursesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/courses?suscription_id='
  const localCourses = []
  const [courses, setCourses] = React.useState([])
  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken
  const [confirmation, setConfirmation] = React.useState(false)
    //const []
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
                <ConfirmationAlert
                    buttonStatus='danger'
                    buttonLabel='Unenroll'
                    header='Unenroll to this course'
                    body='Are u sure u want to unenroll from this course?'
                    confirmButtonLabel='Unenroll'
                    onConfirm={console.log('hola')}
                />
            </View>
    )
  }

  function renderVoid () {

  }

  const onConfirm_ = () => {
      console.log("user id es:",session.userData[0].id)
      console.log("subs id es:",subscription.key)
      fetch(paymentsServiceUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              [tokenHeader]: sessionToken
          },
      body: {
          "senderId": 7,
          "suscriptionId":2
      }
      })
          .then((response) => {
              if (!response.ok) {
                  console.log("Status:",response.status)
              } else {
                  console.log("POST OK");
              }
          })
          .then((json) => {
              //console.log("json:",json)
          })
          .catch((error) => {
              console.error(error)
          })
    /* ACA LE TENGO QUE MANDAR AL BACK QUE QUIERO PAGAR */
    //navigation.navigate('ProfileSelection')
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

                            <ConfirmationAlert
                                buttonStatus='primary'
                                buttonLabel='Subscribe'
                                header='Subscription to this course'
                                body='Are u sure u want to pay this subscription?'
                                confirmButtonLabel='Subscribe'
                                onConfirm={onConfirm_}
                            />
                        </VStack>
                    </Box>
                </Collapse>

                </ScrollView>
        </NativeBaseProvider>
  )
}
