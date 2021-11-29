import React from 'react'
import { Box, Button, Collapse, Heading, VStack } from 'native-base'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import Notification from '../components/Notification'
import session from '../session/token'
import { AntDesign } from '@expo/vector-icons'
import EnrrollAndUnenrrollButtonWithConfirmation from '../components/EnrrollAndUnenrrollButtonWithConfirmation'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function StudentCourseDetailsScreen ({ route }) {
  const { course } = route.params
  const studentId = session.userData[0].id

  const [subscription, setSubscription] = React.useState('None')
  const [categories, setCategories] = React.useState('None')
  const [activeCourse, setActiveCourse] = React.useState(course.status === 'Active')
  const [successfulInscription, setSuccessfulInscription] = React.useState(false)
  const [successfulUnenrrolmment, setSuccessfulUnenrrollment] = React.useState(false)
  const [studentCourses, setStudentCourses] = React.useState([])
  const [studentFavCourses, setStudentFavCourses] = React.useState([])
  const [alreadyEnrrolled, setAlreadyEnrolled] = React.useState(false)
  const [favButtonName, setFavButtonName] = React.useState('staro')
  const [addedToFavs, setAddedToFavs] = React.useState(false)

  const postCourseInscriptionURL = apiGatewayBaseUrl + 'courses/inscription'
  const putCancelCourseInscriptionURL = apiGatewayBaseUrl + 'courses/inscription/cancel'
  const getStudentCoursesURL = apiGatewayBaseUrl + 'courses?user_id='

  const favsURL = apiGatewayBaseUrl + 'users/favorites'
  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const getStudentCoursesIds = () => {
    return fetch(getStudentCoursesURL + studentId,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => response.json())
      .then((json) => {
        const localCourseIds = []
        for (let i = 0; i < json.length; i++) {
          localCourseIds.push(json[i].id)
        }
        setStudentCourses(localCourseIds)
        setAlreadyEnrolled(localCourseIds.includes(course.id))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getStudentFavCourses = () => {
    return fetch(favsURL + '/' + studentId,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => response.json())
      .then((json) => {
        const localCourseIds = []
        for (let i = 0; i < json.length; i++) {
          localCourseIds.push(json[i].id)
        }
        setStudentFavCourses(localCourseIds)
        setAddedToFavs(localCourseIds.includes(course.id))
        if (localCourseIds.includes(course.id)) {
          setFavButtonName('star')
        } else {
          setFavButtonName('staro')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    if (course.suscriptions.length > 0) {
      setSubscription(course.suscriptions[0].description)
    }

    if (course.categories.length > 0) {
      let cats = []
      for (let i = 0; i < course.categories.length; i++) {
        cats.push(course.categories[i].name)
      }
      cats = cats.join(', ')
      setCategories(cats)
    }

    getStudentCoursesIds()
    getStudentFavCourses()
  }, [])

  const handleEnrollment = () => {
    fetch(postCourseInscriptionURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        [tokenHeader]: sessionToken
      },
      body: JSON.stringify({
        userId: studentId,
        courseId: course.id
      })
    }).then((response) => response.json())
      .then((json) => {
        setSuccessfulInscription(true)
        setAlreadyEnrolled(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleUnenrollment = () => {
    // Falta el endpoint para cancelar inscripcion a curso
    fetch(putCancelCourseInscriptionURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        [tokenHeader]: sessionToken
      },
      body: JSON.stringify({
        userId: studentId,
        courseId: course.id
      })
    }).then((response) => response.json())
      .then((json) => {
        setSuccessfulUnenrrollment(true)
        setAlreadyEnrolled(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleFavClick = () => {
    if (addedToFavs) {
      setFavButtonName('staro')
      fetch(favsURL, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          [tokenHeader]: sessionToken
        },
        body: JSON.stringify({
          userId: studentId,
          courseId: course.id
        })
      }).then((response) => response.json())
        .then((json) => {
          setAddedToFavs(!addedToFavs)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setFavButtonName('star')
      fetch(favsURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          [tokenHeader]: sessionToken
        },
        body: JSON.stringify({
          userId: studentId,
          courseId: course.id
        })
      }).then((response) => response.json())
        .then((json) => {
          setAddedToFavs(!addedToFavs)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <NativeBaseProvider>
      <Box safeArea flex={0} p="2" w="90%" mx="auto" py="8">
        <VStack alignItems="center">
          <Button
            leftIcon={<AntDesign name={favButtonName} size={24} color="#d4b106" />}
            bg='transparent'
            onPress={handleFavClick}
          />
          <Heading fontSize="xl">{course.courseName}</Heading>
          <Heading fontSize="lg">Price: {course.inscriptionPrice}</Heading>
          <Heading fontSize="lg">Duration: {course.duration} hours</Heading>
          <Heading fontSize="lg">Subscription: {subscription}</Heading>
          <Heading fontSize="lg">Categories: {categories}</Heading>
        </VStack>
      </Box>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <EnrrollAndUnenrrollButtonWithConfirmation
          activeCourse={activeCourse}
          alreadyEnrolled={alreadyEnrrolled}
          handleEnrollment={handleEnrollment}
          handleUnenrollment={handleUnenrollment}
        />
        <Collapse isOpen={successfulInscription && alreadyEnrrolled}>
          <Notification
            status='success'
            message={'Your enrrollment was processed successfully'}
          />
        </Collapse>
        <Collapse isOpen={successfulUnenrrolmment && !alreadyEnrrolled}>
          <Notification
            status='info'
            message={'Your unenrrollment was processed successfully'}
          />
        </Collapse>
      </Box>
    </NativeBaseProvider>
  )
}
