import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import { Box, Center, Collapse, Heading, ScrollView } from 'native-base'
import CourseCard from '../components/CourseCard'
import session from '../session/token'
import { useIsFocused } from '@react-navigation/native'
import Notification from '../components/Notification'
import { getResourcesFromApi } from '../common/ApiCommunication'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CollaboratorMyCollaborationsScreen ({ navigation }) {
  const [searchResults, setSearchResults] = React.useState([])

  const [collaboratorHasCourses, setCollaboratorHasCourses] = React.useState(searchResults.length > 0)
  const collaboratorId = session.userData[0].id

  // const getCollaboratorCoursesURL = apiGatewayBaseUrl + 'courses?collaborator_id='
  const getCollaboratorCoursesURL = 'https://course-service-ubademy.herokuapp.com/api/courses?collaborator_id='

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const tabIsFocused = useIsFocused()

  React.useEffect(() => {
    async function fetchData () {
      const courses = await getResourcesFromApi(getCollaboratorCoursesURL + collaboratorId, tokenHeader, sessionToken, navigation)
      // Hago esto para quedarme solo en los que colabora,porque el creador esta tambien incluido dentro de los colaboradores
      // El creador siempre es el primero en el array de colaboradores,por eso me fijo que sea distinto a ese
      const auxCourses = []
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].collaborators[0].userId !== collaboratorId) {
          auxCourses.push(courses[i])
        }
      }
      setSearchResults(auxCourses)
      setCollaboratorHasCourses(auxCourses.length > 0)
    }

    if (tabIsFocused) {
      // getCollaboratorCourses()
      fetchData()
    }
  }, [tabIsFocused])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Center>
          <Heading>
            My Collaborations
          </Heading>
        </Center>
        <Collapse isOpen={!collaboratorHasCourses}>
          <Notification
            status='info'
            message={'You are not collaborating in any course yet'}
          />
        </Collapse>
        <ScrollView>
          { searchResults.map(item => {
            return (
            /* <Pressable
              key={item.id}
              onPress={() => {
                navigation.navigate('CreatorCourse', { course: item })
              }}
            > */
              <CourseCard
                key={item.id}
                title={item.courseName}
                price={item.inscriptionPrice}
                duration={item.duration}
                subscription={item.suscriptions[0].description} />
            // </Pressable>
            )
          }) }
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  )
}
