import React from 'react'
import { Button, Collapse, Heading } from 'native-base'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import Notification from '../components/Notification'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CourseScreen ({ navigation, route }) {
  const { course } = route.params
  const [subscription, setSubscription] = React.useState('None')
  const [categories, setCategories] = React.useState('None')
  const [activeCourse, setActiveCourse] = React.useState(course.status === 'Active')
  const [successfulInscription, setSuccessfulInscription] = React.useState(false)
  const postCourseInscriptionURL = apiGatewayBaseUrl + 'courses/inscription'

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
  }, [])

  const handleEnrollment = () => {
    fetch(postCourseInscriptionURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 1,
        courseId: course.id
      })
    })
    setSuccessfulInscription(true)
  }

  console.log(course)

  return (
    <NativeBaseProvider>
      <Heading fontSize="md">{course.courseName}</Heading>
      <Heading fontSize="sm">Price: {course.inscriptionPrice}</Heading>
      <Heading fontSize="sm">Duration: {course.duration}</Heading>
      <Heading fontSize="sm">Subscription: {subscription}</Heading>
      <Heading fontSize="sm">Categories: {categories}</Heading>

      <Button
        onPress={handleEnrollment}
        isDisabled={!activeCourse}
      >
        Enroll
      </Button>
      <Collapse isOpen={!activeCourse}>
        <Notification
          status='error'
          message={'This course is no active at the moment'}
        />
      </Collapse>
      <Collapse isOpen={successfulInscription}>
        <Notification
          status='success'
          message={'Your enrrollment was processed successfully'}
        />
      </Collapse>
    </NativeBaseProvider>
  )
}
