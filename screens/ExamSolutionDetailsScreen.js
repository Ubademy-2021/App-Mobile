import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Heading, HStack,
  IconButton,
  ScrollView, Spacer,
  TextArea,
  VStack
} from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { postCorrection } from '../common/ApiCommunication'
import session from '../session/token'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function ExamSolutionDetailsScreen ({ navigation, route }) {
  const { exam, solution } = route.params

  for (let i = 0; i < exam.questions.length; i++) {
    solution.answers[i].question = exam.questions[i].question
  }
  const [examAndSolution, setExamAndSolution] = React.useState(solution)
  const [isGraded, setIsGraded] = React.useState(solution.answers[0].correct !== null)
  const [enableGrading, setEnableGrading] = React.useState(false)
  const [validCorrection, setValidCorrection] = React.useState(false)
  const [pressedButton, setPressedButton] = React.useState(false)

  const postCorrectionURL = apiGatewayBaseUrl + 'solutions/corrections'

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const solutionIsCorrectedRender = (solution, isGraded) => {
    if (isGraded) {
      let correctAnswers = 0
      for (let i = 0; i < solution.answers.length; i++) {
        if (solution.answers[i].correct === true) {
          correctAnswers++
        }
      }
      return (
        <Heading>Correct answers: {correctAnswers}/{solution.answers.length}</Heading>
      )
    } else {
      return (
        <Button onPress={() => {
          setEnableGrading(true)
        }}>
          Grade
        </Button>
      )
    }
  }

  const handleSubmit = () => {
    const results = []
    for (let i = 0; i < examAndSolution.answers.length; i++) {
      results.push({ number: examAndSolution.answers[i].number, correct: examAndSolution.answers[i].correct })
    }
    postCorrection(postCorrectionURL, tokenHeader, sessionToken, examAndSolution, results, navigation)
    setEnableGrading(false)
    setIsGraded(true)
  }

  React.useEffect(() => {
    function aux () {
      for (let i = 0; i < examAndSolution.answers.length; i++) {
        if (examAndSolution.answers[i].correct === null) {
          return false
        }
      }
      return true
    }

    setValidCorrection(aux)
  }, [pressedButton])

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
          <VStack width="80%" space={4}>
            { examAndSolution.answers.map(item => {
              return (
                <FormControl key={item.number}>
                  <FormControl.Label>{item.number + '. ' + item.question}</FormControl.Label>
                  <HStack key={item.number} alignItems="center">
                    <TextArea
                      isDisabled={true}
                      defaultValue={item.answer}
                      w={{
                        base: '85%'
                      }}
                    />
                    <Spacer/>
                    <Collapse isOpen={enableGrading}>
                      <IconButton
                        size='sm'
                        variant={item.correct === true ? 'solid' : 'outline'}
                        colorScheme='success'
                        _icon={{
                          as: AntDesign,
                          name: 'check'
                        }}
                        onPress={() => {
                          console.log('correct')
                          item.correct = true
                          setPressedButton(!pressedButton)
                        }}
                      />
                    </Collapse>
                    <Collapse isOpen={enableGrading}>
                      <IconButton
                        size='sm'
                        variant={item.correct === false ? 'solid' : 'outline'}
                        colorScheme='danger'
                        _icon={{
                          as: AntDesign,
                          name: 'close'
                        }}
                        onPress={() => {
                          console.log('incorrect')
                          item.correct = false
                          setPressedButton(!pressedButton)
                        }}
                      />
                    </Collapse>
                  </HStack>
                </FormControl>
              )
            })}
          </VStack>
        </Box>
        <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
          <Collapse isOpen={!enableGrading}>
            {solutionIsCorrectedRender(examAndSolution, isGraded)}
          </Collapse>
          <Collapse isOpen={enableGrading}>
            <Button isDisabled={!validCorrection} onPress={() => { handleSubmit() }}>
              Submit Grading
            </Button>
          </Collapse>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  )
}
