import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import { Box, Center, Collapse, Heading, ScrollView } from 'native-base'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import CourseCard from '../components/CourseCard'
import session from '../session/token'
import { useIsFocused } from '@react-navigation/native'
import Notification from '../components/Notification'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function StudentMyCoursesScreen ({ navigation }) {
  const [searchResults, setSearchResults] = React.useState([])

  const [studentHasCourses, setStudentHasCourses] = React.useState(searchResults.length > 0)
  const studentId = session.userData[0].id

  const getStudentCoursesURL = apiGatewayBaseUrl + 'courses?user_id='

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const tabIsFocused = useIsFocused()

  const getStudentCourses = () => {
    return fetch(getStudentCoursesURL + studentId,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => response.json())
      .then(async (json) => {
        setSearchResults(await json)
        setStudentHasCourses(json.length > 0)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    if (tabIsFocused) {
      getStudentCourses()
    }
  }, [tabIsFocused])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Center>
          <Heading>
            My Courses
          </Heading>
        </Center>
        <Collapse isOpen={!studentHasCourses}>
          <Notification
            status='info'
            message={'You have not enrolled to any courses yet\n Go to the search tab to find the course you want to enroll to'}
          />
        </Collapse>
        <ScrollView>
          { searchResults.map(item => {
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  navigation.navigate('StudentCourse', { course: item })
                }}
              >
                <CourseCard
                  key={item.id}
                  title={item.courseName}
                  price={item.inscriptionPrice}
                  duration={item.duration}
                  subscriptions={item.suscriptions} />
              </Pressable>
            )
          }) }
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  )
}
