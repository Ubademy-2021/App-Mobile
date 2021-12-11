import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import { Box, Center, Collapse, Heading, ScrollView } from 'native-base'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import CourseCard from '../components/CourseCard'
import session from '../session/token'
import { useIsFocused } from '@react-navigation/native'
import Notification from '../components/Notification'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function StudentMyFavouritesScreen ({ navigation }) {
  const [searchResults, setSearchResults] = React.useState([])

  const [studentHasFavs, setStudentHasFavs] = React.useState(searchResults.length > 0)
  const studentId = session.userData[0].id

  const favsURL = apiGatewayBaseUrl + 'users/favorites'

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const tabIsFocused = useIsFocused()

  const getStudentFavCourses = () => {
    return fetch(favsURL + '/' + studentId,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => response.json())
      .then(async (json) => {
        setSearchResults(await json)
        setStudentHasFavs(json.length > 0)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    if (tabIsFocused) {
      getStudentFavCourses()
    }
  }, [tabIsFocused])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Center>
          <Heading>
            My Favourite Courses
          </Heading>
        </Center>
        <Collapse isOpen={!studentHasFavs}>
          <Notification
            status='info'
            message={'You have not added any course to your favourites yet\nYou can do this by clicking the fav button \nin the course view'}
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
