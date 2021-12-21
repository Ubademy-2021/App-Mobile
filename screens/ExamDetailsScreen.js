import {
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  ScrollView,
  Spacer, Text,
  VStack
} from 'native-base'
import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Notification from '../components/Notification'
import { getResourcesFromApi, publishExam } from '../common/ApiCommunication'
import session from '../session/token'
import { useIsFocused } from '@react-navigation/native'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function ExamDetailsScreen ({ navigation, route }) {
  const { exam } = route.params
  console.log(exam)

  const [solutions, setSolutions] = React.useState([])
  const [students, setStudents] = React.useState([])
  const [isPublished, setIsPublished] = React.useState(exam.published)

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const getSolutionsURL = 'https://exam-service-ubademy.herokuapp.com/api/solutions?courseId=' + exam.courseId + '&examNumber=' + exam.number
  const publishExamURL = 'https://exam-service-ubademy.herokuapp.com/api/exams/publish?courseId=' + exam.courseId + '&examNumber=' + exam.number

  const tabIsFocused = useIsFocused()

  const solutionIsCorrectedRender = (solution) => {
    if (solution.answers[0].correct !== null) {
      let correctAnswers = 0
      for (let i = 0; i < solution.answers.length; i++) {
        if (solution.answers[i].correct === true) {
          correctAnswers++
        }
      }
      return (
        <Text>Correct answers: {correctAnswers}/{solution.answers.length}</Text>
      )
    } else {
      return (
        <Text>Not graded yet</Text>
      )
    }
  }

  const publish = () => {
    publishExam(publishExamURL, tokenHeader, sessionToken, navigation).then(setIsPublished(true)).then(exam.published = true)
  }

  React.useEffect(() => {
    async function fetchData () {
      const sols = await getResourcesFromApi(getSolutionsURL, tokenHeader, sessionToken, navigation)
      const aux = []
      for (let i = 0; i < sols.length; i++) {
        const getStudentURL = apiGatewayBaseUrl + 'users?user_id=' + sols[i].userId
        const stud = await getResourcesFromApi(getStudentURL, tokenHeader, sessionToken, navigation)
        aux.push({ ...sols[i], studentInfo: stud })
      }
      setSolutions(aux)
    }

    if (tabIsFocused) {
      fetchData()
    }
  }, [tabIsFocused])

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
          <Heading>
            Description
          </Heading>
          <Box
            safeArea p="2" w="100%"
            bg='transparent'
            borderColor="gray.900"
            rounded="4"
          >
            <Text
              _dark={{
                color: 'warmGray.50'
              }}
              color="coolGray.800"
              bold
            >
              {exam.description}
            </Text>
          </Box>
          <Heading>
            Questions
          </Heading>
          <VStack width="80%" space={4}>
            { exam.questions.map(item => {
              return (
                  <Box
                    key={item.number}
                    safeArea p="2" w="100%"
                    bg='transparent'
                    borderColor="gray.900"
                    rounded="4"
                  >
                    <Text
                      _dark={{
                        color: 'warmGray.50'
                      }}
                      color="coolGray.800"
                      bold
                    >
                      Question {item.number}:
                    </Text>
                    <Text
                    _dark={{
                      color: 'warmGray.50'
                    }}
                    color="coolGray.800"
                    bold
                    >
                        {item.question}
                    </Text>
                  </Box>
              )
            }) }
          </VStack>
          <Collapse isOpen={!isPublished}>
            <VStack space={1}>
              <Button onPress={() => { navigation.navigate('ExamEdit', { exam: exam }) }}>
                Edit
              </Button>
              <Spacer/>
              <Button onPress={() => { publish() }}>
                Publish
              </Button>
            </VStack>
          </Collapse>
          <Heading>
            Solutions
          </Heading>
          <VStack width="80%" space={4}>
            { solutions.map(item => {
              // eslint-disable-next-line no-lone-blocks
              return (
                <Pressable
                  key={item.userId}
                  onPress={() => {
                    navigation.navigate('ExamSolution', { exam: exam, solution: item })
                  }}
                >
                  <Box
                    safeArea flex={1} p="3" w="90%"
                    bg='transparent'
                    borderColor="gray.900"
                    rounded="4"
                  >
                    <HStack key={item.userId} space={1} justifyContent="space-between">
                      <Text
                        _dark={{
                          color: 'warmGray.50'
                        }}
                        color="coolGray.800"
                        bold
                      >
                        Completed By {item.studentInfo[0].name !== 'null' ? item.studentInfo[0].name + ' ' + item.studentInfo[0].surname : item.studentInfo[0].userName }
                      </Text>
                      <Spacer/>
                      {solutionIsCorrectedRender(item)}
                    </HStack>
                  </Box>
                </Pressable>
              )
            }) }
          </VStack>
          <Collapse isOpen={solutions.length === 0}>
            <Notification
              status='info'
              message='Currently there are no solutions for this exam'
            />
          </Collapse>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  )
}
