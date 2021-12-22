import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import {
  Box,
  CheckIcon, CloseIcon,
  Collapse,
  FormControl, Heading,
  HStack,
  ScrollView,
  Spacer,
  TextArea,
  VStack
} from 'native-base'
import session from '../session/token'
import ConfirmationAlert from '../components/ConfirmationAlert'
import { getStudentSolutionForExam, postSolution } from '../common/ApiCommunication'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export function ExamCompletionScreen ({ navigation, route }) {
  const { exam } = route.params
  const studentId = session.userData[0].id

  const aux = []
  for (let i = 1; i <= exam.questions.length; i++) {
    aux.push({ number: i, answer: 'Not Answered' })
  }
  const [answers, setAnswers] = React.useState(aux)
  const [alreadyAnswered, setAlreadyAnswered] = React.useState(false)
  const [savedSolution, setSavedSolution] = React.useState([{ answers: [{ number: -1, correct: null }], correctAnswers: 0 }])

  const postSolutionURL = apiGatewayBaseUrl + 'solutions'
  // const getStudentSolutionForExamURL = apiGatewayBaseUrl + 'solutions?courseId=' + exam.courseId + '&examNumber=' + exam.number + '&userId=' + studentId
  const getStudentSolutionForExamURL = 'https://exam-service-ubademy.herokuapp.com/api/solutions?courseId=' + exam.courseId + '&examNumber=' + exam.number + '&userId=' + studentId

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const handleSubmit = () => {
    postSolution(postSolutionURL, tokenHeader, sessionToken, exam, studentId, answers, navigation)
  }

  React.useEffect(() => {
    async function fetchData () {
      const result = await getStudentSolutionForExam(getStudentSolutionForExamURL, tokenHeader, sessionToken, exam, studentId, navigation)
      setAlreadyAnswered(result !== null)
      if (result) {
        if (result.length > 0 && result[0].answers[0].correct !== null) {
          let correctAnswers = 0
          for (let i = 0; i < result[0].answers.length; i++) {
            if (result[0].answers[i].correct === true) {
              correctAnswers++
            }
          }
          result[0].correctAnswers = correctAnswers
        }
        setSavedSolution(result)
      }
    }

    fetchData()
  }, [])

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box safeArea flex={0} p="2" w="90%" mx="auto" py="8">
          <VStack width="80%" space={4}>
            { exam.questions.map(item => {
              return (
                <FormControl key={item.number}>
                  <FormControl.Label>{item.number + '. ' + item.question}</FormControl.Label>
                  <HStack alignItems='center'>
                    <TextArea
                      onChangeText={(value) => {
                        answers[item.number - 1] = { number: item.number, answer: value }
                        setAnswers(answers)
                      }}
                      defaultValue={savedSolution[0].answers[0].number !== -1 ? savedSolution[0].answers[exam.questions.indexOf(item)].answer : ''}
                      isDisabled={alreadyAnswered}
                      w={{
                        base: '85%'
                      }}
                    />
                    <Spacer/>
                    <Collapse isOpen={savedSolution[0].answers[0].correct !== null && savedSolution[0].answers[item.number - 1].correct === true}>
                      <CheckIcon size="sm" color='#0F9D58' />
                    </Collapse>
                    <Collapse isOpen={savedSolution[0].answers[0].correct !== null && savedSolution[0].answers[item.number - 1].correct === false}>
                      <CloseIcon size="sm" color='#DB4437' />
                    </Collapse>
                  </HStack>

                </FormControl>
              )
            })}
          </VStack>
          <Collapse isOpen={!alreadyAnswered}>
            <ConfirmationAlert
              buttonStatus='primary'
              buttonLabel='Submit'
              header='Submit Answers'
              body='Are you sure you want to submit your answers? Remember that once you submit your answers you will not be able to change them'
              confirmButtonLabel='Submit'
              onConfirm={handleSubmit}
              hasNecessarySub={true}
            />
          </Collapse>
          <Collapse isOpen={alreadyAnswered}>
            <Heading>
              {savedSolution.length > 0 && savedSolution[0].answers[0].correct === null ? 'Your exam has not been graded yet' : 'Result: ' + savedSolution[0].correctAnswers + '/' + savedSolution[0].answers.length}
            </Heading>
          </Collapse>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  )
}
