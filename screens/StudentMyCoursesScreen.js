import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import { Box, ScrollView } from 'native-base'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import CourseCard from '../components/CourseCard'
import session from '../session/token'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function StudentMyCoursesScreen ({ navigation }) {
  const [searchResults, setSearchResults] = React.useState([])

  const [studentCourses, setStudentCourses] = React.useState([])
  const studentId = session.userData[0].id

  const getStudentCoursesURL = apiGatewayBaseUrl + 'courses?user_id='

  const getStudentCourses = () => {
    return fetch(getStudentCoursesURL + studentId)
      .then((response) => response.json())
      .then((json) => {
        const localCourseIds = []
        for (let i = 0; i < json.length; i++) {
          localCourseIds.push(json[i].id)
        }
        setStudentCourses(localCourseIds)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <ScrollView>
          { searchResults.map(item => {
            // console.log(item)
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
