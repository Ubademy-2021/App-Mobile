import React from 'react'
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Heading,
  HStack,
  IconButton,
  ScrollView,
  Spacer,
  Text, TextArea, VStack
} from 'native-base'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { postExam } from '../common/ApiCommunication'
import session from '../session/token'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function ExamCreationScreen ({ navigation, route }) {
  const { course } = route.params

  const [errors, setErrors] = React.useState({})
  const [questions, setQuestions] = React.useState([])
  const [newQuestion, setNewQuestion] = React.useState({ question: '' })
  const [deletedQuestion, setDeletedQuestion] = React.useState({})
  const [description, setDescription] = React.useState('')
  let keys = 0

  const postExamURL = apiGatewayBaseUrl + 'exams'

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const handleCreation = () => {
    postExam(postExamURL, tokenHeader, sessionToken, description, course, questions, navigation)
  }

  React.useEffect(() => {
    function aux () {
      const q = questions
      const index = q.indexOf(deletedQuestion)
      if (index >= 0) {
        q.splice(index, 1)
      }
      return q
    }

    setQuestions(aux)
  }, [deletedQuestion])

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
          <FormControl isRequired>
            <FormControl.Label>Description</FormControl.Label>
            <TextArea
              placeholder="Ex:Flow control structures"
              onChangeText={(value) => setDescription(value)}
              w={{
                base: '85%'
              }}
            />
            <FormControl.HelperText>
              Enter a description for the exam
            </FormControl.HelperText>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>New question</FormControl.Label>
            <HStack alignItems='center'>
              <TextArea
                placeholder="Ex:What is the result of 2*2?"
                onChangeText={(value) => setNewQuestion({ question: value })}
                w={{
                  base: '85%'
                }}
                value={newQuestion.question}
              />
              <Spacer />
              <Collapse isOpen={newQuestion.question !== undefined && newQuestion.question.length > 0}>
                <IconButton
                  key='outline'
                  size='sm'
                  variant='outline'
                  _icon={{
                    as: AntDesign,
                    name: 'plus'
                  }}
                  onPress={() => {
                    console.log('add question')
                    questions.push(newQuestion)
                    setNewQuestion({})
                  }}
                />
              </Collapse>
            </HStack>
            <FormControl.HelperText>
              Add questions to the exam
            </FormControl.HelperText>
            <FormControl.ErrorMessage>{errors.courseName}</FormControl.ErrorMessage>
          </FormControl>

          <Heading>Questions</Heading>
          <VStack space={4} >
            { questions.map(item => {
              keys++
              return (

                  <HStack key={keys} alignItems='center'>
                    <Text
                      _dark={{
                        color: 'warmGray.50'
                      }}
                      color="coolGray.800"
                      bold
                      w={{
                        base: '85%'
                      }}
                    >
                      {item.question ? item.question : 'nada'}
                    </Text>
                    <Spacer/>
                    <IconButton
                      key='outline'
                      size='sm'
                      variant='outline'
                      colorScheme='danger'
                      _icon={{
                        as: AntDesign,
                        name: 'delete'
                      }}
                      onPress={() => {
                        setDeletedQuestion(item)
                      }}
                    />
                  </HStack>

              )
            }) }
            </VStack>
            <Button isDisabled={questions.length === 0 || description.length === 0} onPress={() => { handleCreation() }}>
              Create
            </Button>
          </Box>
      </ScrollView>
    </NativeBaseProvider>
  )
}
