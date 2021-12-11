import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import { Box, Center, Collapse, Heading, HStack, IconButton, ScrollView } from 'native-base'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import CourseCard from '../components/CourseCard'
import session from '../session/token'
import { useIsFocused } from '@react-navigation/native'
import Notification from '../components/Notification'
import { getResourcesFromApi } from '../common/ApiCommunication'
import AntDesign from 'react-native-vector-icons/AntDesign'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CreatorMyCoursesScreen ({ navigation }) {
  const [searchResults, setSearchResults] = React.useState([])

  const [creatorHasCourses, setCreatorHasCourses] = React.useState(searchResults.length > 0)
  const creatorId = session.userData[0].id

  // const getCreatorCoursesURL = apiGatewayBaseUrl + 'courses?owner_id='
  const getCreatorCoursesURL = 'https://course-service-ubademy.herokuapp.com/api/courses?owner_id='

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const tabIsFocused = useIsFocused()

  React.useEffect(() => {
    async function fetchData () {
      const courses = await getResourcesFromApi(getCreatorCoursesURL + creatorId, tokenHeader, sessionToken, navigation)
      setSearchResults(courses)
      setCreatorHasCourses(courses.length > 0)
    }

    if (tabIsFocused) {
      // getCreatorCourses()
      fetchData()
    }
  }, [tabIsFocused])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <HStack space={3} direction='row-reverse' alignItems="center">
          <IconButton
            key='outline'
            variant='outline'
            _icon={{
              as: AntDesign,
              name: 'plus'
            }}
            onPress={() => {
              navigation.navigate('CreateCourse')
            }}
          />
          <Center w="250">
            <Heading>
              My Courses
            </Heading>
          </Center>
        </HStack>
        <Collapse isOpen={!creatorHasCourses}>
          <Notification
            status='info'
            message={'You have not created any courses yet'}
          />
        </Collapse>
        <ScrollView>
          { searchResults.map(item => {
            return (
              <Pressable
                key={item.id}
                onPress={() => {
                  navigation.navigate('CreatorCourse', { course: item })
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
