import React from 'react'
import { Box, Button, Collapse, Heading, VStack } from 'native-base'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import Notification from '../components/Notification'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function StudentCourseScreen ({ route }) {
  const { course } = route.params
  // Aca deberia recibir por parametro el id del usuario/estudiante
  const studentId = 2
  const [subscription, setSubscription] = React.useState('None')
  const [categories, setCategories] = React.useState('None')
  const [activeCourse, setActiveCourse] = React.useState(course.status === 'Active')
  const [successfulInscription, setSuccessfulInscription] = React.useState(false)
  const [successfulUnenrrolmment, setSuccessfulUnenrrollment] = React.useState(false)
  const [studentCourses, setStudentCourses] = React.useState([])
  const [alreadyEnrrolled, setAlreadyEnrolled] = React.useState(false)
  const postCourseInscriptionURL = apiGatewayBaseUrl + 'courses/inscription'
  const putCancelCourseInscriptionURL = apiGatewayBaseUrl + 'courses/inscription/cancel'
  const getStudentCoursesURL = apiGatewayBaseUrl + 'courses?user_id='
  // const getStudentCoursesURL = 'https://course-service-ubademy.herokuapp.com/api/courses?user_id='

  const getStudentCourses = () => {
    return fetch(getStudentCoursesURL + studentId)
      .then((response) => response.json())
      .then((json) => {
        const localCourseIds = []
        for (let i = 0; i < json.length; i++) {
          localCourseIds.push(json[i].id)
        }
        console.log(localCourseIds)
        console.log(course.id)
        setStudentCourses(localCourseIds)
        setAlreadyEnrolled(localCourseIds.includes(course.id))
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

    // getStudentCourses()
  }, [])

  const handleEnrollment = () => {
    fetch(postCourseInscriptionURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: studentId,
        courseId: course.id
      })
    })
    setSuccessfulInscription(true)
    setAlreadyEnrolled(true)
  }

  const handleUnenrollment = () => {
    fetch(putCancelCourseInscriptionURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: studentId,
        courseId: course.id
      })
    })
    setSuccessfulUnenrrollment(true)
    setAlreadyEnrolled(false)
  }

  return (
    <NativeBaseProvider>
      <Box safeArea flex={0} p="2" w="90%" mx="auto" py="8">
        <VStack alignItems="center">
          <Heading fontSize="xl">{course.courseName}</Heading>
          <Heading fontSize="lg">Price: {course.inscriptionPrice}</Heading>
          <Heading fontSize="lg">Duration: {course.duration} hours</Heading>
          <Heading fontSize="lg">Subscription: {subscription}</Heading>
          <Heading fontSize="lg">Categories: {categories}</Heading>
        </VStack>
      </Box>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Button
          onPress={handleEnrollment}
          isDisabled={!activeCourse || alreadyEnrrolled}
        >
          Enroll
        </Button>
        <Button
          onPress={handleUnenrollment}
          isDisabled={!alreadyEnrrolled}
          colorScheme='danger'
        >
          Unenroll
        </Button>
        <Collapse isOpen={!activeCourse}>
          <Notification
            status='error'
            message={'This course is not active at the moment'}
          />
        </Collapse>
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
