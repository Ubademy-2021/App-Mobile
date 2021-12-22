import React from 'react'
import session from '../session/token'
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Heading,
  HStack, IconButton,
  Input,
  ScrollView, Spacer,
  Text,
  TextArea,
  VStack
} from 'native-base'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import SelectDropdownList from '../components/SelectDropdownList'
import {
  getResourcesFromApi, postNewCollaborator,
  putCourseToApi
} from '../common/ApiCommunication'
import { formatForCategories, formatForCollaborations, formatForSubscriptions } from '../common/Format'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Notification from '../components/Notification'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CreatorCourseDetailsScreen ({ navigation, route }) {
  const { course, creator } = route.params

  const [formData, setData] = React.useState(course)
  const [errors, setErrors] = React.useState({})
  const [submittedForm, setSubmittedForm] = React.useState(false)
  const [subscriptions, setSubscriptions] = React.useState([])
  const [selectedSubscription, setSelectedSubscription] = React.useState(course.suscriptions[0].id)
  const [categories, setCategories] = React.useState([])
  const [students, setStudents] = React.useState([])
  const [collaborators, setCollaborators] = React.useState([])
  const [editEnabled, setEditEnabled] = React.useState(false)
  const [addCollaborator, setAddCollaborator] = React.useState(false)
  const [newCollaboratorId, setNewCollaboratorId] = React.useState([])
  const [exams, setExams] = React.useState([])

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  const getCategoriesURL = apiGatewayBaseUrl + 'categories'
  const getCourseStudentsURL = apiGatewayBaseUrl + 'courses/students/'
  const getCollaboratorsURL = apiGatewayBaseUrl + 'collaborators/'
  const getExamsURL = apiGatewayBaseUrl + 'exams?courseId='
  const putCourseURL = apiGatewayBaseUrl + 'courses/' + course.id
  const postNewCollaboratorURL = apiGatewayBaseUrl + 'collaborators'

  const tabIsFocused = useIsFocused()

  const validate = () => {
    if (formData.courseName === undefined || formData.courseName.length === 0) {
      setErrors({
        ...errors,
        courseName: 'Title is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.courseName
      setErrors(copyErrors)
    }

    if (formData.description === undefined || formData.description.length === 0) {
      setErrors({
        ...errors,
        description: 'Description is required'
      })
      return false
    } else if (formData.description.length < 20) {
      setErrors({
        ...errors,
        description: 'Description should have at least 20 characters'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.description
      setErrors(copyErrors)
    }

    if (formData.duration === undefined || formData.duration.length === 0) {
      setErrors({
        ...errors,
        duration: 'Duration is required'
      })
      return false
    } else if (formData.duration[formData.duration.length - 3] !== ':' || formData.duration[formData.duration.length - 6] !== ':') {
      setErrors({
        ...errors,
        duration: 'Duration should have HH:MM:SS format'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.duration
      setErrors(copyErrors)
    }

    return true
  }

  const addNewCollaborator = async () => {
    const status = await postNewCollaborator(postNewCollaboratorURL, tokenHeader, sessionToken, course.id, newCollaboratorId, navigation)
    if (status === 201) {
      const collabs = await getResourcesFromApi(getCollaboratorsURL + course.id, tokenHeader, sessionToken, navigation)
      setCollaborators(formatForCollaborations(collabs))
      setAddCollaborator(false)
    }
  }

  const onSubmit = () => {
    setSubmittedForm(true)
  }

  React.useEffect(() => {
    async function test () {
      const result = await putCourseToApi(putCourseURL, tokenHeader, sessionToken, formData, selectedSubscription, navigation)
    }

    if (submittedForm) {
      setSubmittedForm(false)
      if (validate()) {
        // putCourseToApi(putCourseURL, tokenHeader, sessionToken, formData, selectedSubscription, navigation)
        test()
        setEditEnabled(false)
      }
    }
  }, [submittedForm])

  React.useEffect(() => {
    async function fetchData () {
      const subs = await getResourcesFromApi(getSubscriptionsURL, tokenHeader, sessionToken, navigation)
      const cats = await getResourcesFromApi(getCategoriesURL, tokenHeader, sessionToken, navigation)
      const students = await getResourcesFromApi(getCourseStudentsURL + course.id, tokenHeader, sessionToken, navigation)
      const collabs = await getResourcesFromApi(getCollaboratorsURL + course.id, tokenHeader, sessionToken, navigation)
      const exms = await getResourcesFromApi(getExamsURL + course.id, tokenHeader, sessionToken, navigation)
      setSubscriptions(formatForSubscriptions(subs))
      setCategories(formatForCategories(cats))
      setStudents(students)
      setCollaborators(formatForCollaborations(collabs))
      setExams(exms)
    }

    fetchData()
  }, [])

  React.useEffect(() => {
    async function fetchData () {
      const exms = await getResourcesFromApi(getExamsURL + course.id, tokenHeader, sessionToken, navigation)
      setExams(exms)
    }

    if (tabIsFocused) {
      fetchData()
    }
  }, [tabIsFocused])

  return (
     <NativeBaseProvider>
       <ScrollView>
         <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
           <HStack space={3} alignItems="center">
             <Heading>
               Basic Info
             </Heading>
             <Spacer />
             <Collapse isOpen={creator}>
               <IconButton
                 key='outline'
                 variant='outline'
                 _icon={{
                   as: AntDesign,
                   name: 'edit'
                 }}
                 onPress={() => {
                   setEditEnabled(!editEnabled)
                 }}
               />
             </Collapse>
           </HStack>
           <VStack width="80%" space={4}>
             <FormControl isRequired isDisabled={!editEnabled} isInvalid={'courseName' in errors}>
               <FormControl.Label>Title</FormControl.Label>
               <Input
                 placeholder="Ex:Python 101"
                 onChangeText={(value) => setData({ ...formData, courseName: value })}
                 defaultValue={formData.courseName}
               />
               <FormControl.ErrorMessage>{errors.courseName}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isDisabled={!editEnabled} isInvalid={'description' in errors}>
               <FormControl.Label>Description</FormControl.Label>
               <TextArea
                 placeholder="Ex:In this course you will learn the python basics"
                 onChangeText={(value) => setData({ ...formData, description: value })}
                 defaultValue={formData.description}
               />
               <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isDisabled={!editEnabled} isInvalid={'duration' in errors}>
               <FormControl.Label>Duration</FormControl.Label>
               <Input
                 placeholder="Ex: 22:05:42"
                 onChangeText={(value) => setData({ ...formData, duration: value })}
                 defaultValue={formData.duration}
               />
               <FormControl.ErrorMessage>{errors.duration}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isDisabled={!editEnabled} isInvalid={'subscription' in errors}>
               <FormControl.Label>Subscription</FormControl.Label>
               <SelectDropdownList items={subscriptions} var={selectedSubscription} setter={setSelectedSubscription} defaultValue={formData.suscriptions[0].description}/>
             </FormControl>
             <Collapse isOpen={editEnabled}>
               <Button type='success' onPress={onSubmit}>
                 Confirm Changes
               </Button>
             </Collapse>
             <FormControl>
               <FormControl.Label>Categories</FormControl.Label>
               {/* <Collapse isOpen={editEnabled}>
                 <SelectMultipleGroupButton
                   group={categories}
                   onSelectedValuesChange={(values) => setSelectedCategories(values)}
                 />
               </Collapse> */}
               {/* <Collapse isOpen={!editEnabled}> */}
                 <VStack space={4} alignItems="center">
                   { course.categories.map(item => {
                     return (
                       <Box
                         key={item.id}
                         flex={1} p="1" w="90%"
                         bg='transparent'
                         rounded="4"
                       >
                         <HStack space={3} justifyContent="space-between">
                           <Text
                             fontSize='xs'
                             _dark={{
                               color: 'warmGray.50'
                             }}
                             color="coolGray.800"
                           >
                             - {item.name}
                           </Text>
                         </HStack>
                       </Box>
                     )
                   }) }
                 </VStack>
               {/* </Collapse> */}
             </FormControl>
             <TouchableOpacity
               style={styles.button}
               onPress={ () => {
                 navigation.navigate('CourseContent', { course: course })
               }}
             >
               <Text style={{ color: '#ffffff' }}>Course content</Text>
             </TouchableOpacity>
           </VStack>
         </Box>
         <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
           <Heading>Students</Heading>
           <ScrollView>
              <VStack space={4} >
                { students.map(item => {
                  return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('FriendProfile', { userInfo: item })
                    }}
                  >
                    <Box
                      safeArea flex={1} p="3" w="90%"
                      bg='transparent'
                      borderColor="gray.900"
                      rounded="4"
                    >
                      <HStack space={3} justifyContent="space-between">
                        <Text
                          _dark={{
                            color: 'warmGray.50'
                          }}
                          color="coolGray.800"
                          bold
                          w={{
                            base: '70%'
                          }}
                        >
                          {item.name !== 'null' ? item.name + ' ' + item.surname : item.userName}
                        </Text>
                        <Spacer />
                        <Text
                          _dark={{
                            color: 'warmGray.50'
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start"
                        >
                          User Id: {item.id}
                        </Text>
                      </HStack>
                    </Box>
                  </Pressable>
                  )
                }) }
              </VStack>
              <Collapse isOpen={students.length === 0}>
                <Notification
                  status='info'
                  message='Currently there are no students enrolled to this course'
                />
              </Collapse>
           </ScrollView>
           <HStack>
             <Heading>Collaborators</Heading>
             <Spacer />
             <Collapse isOpen={creator}>
               <IconButton
                 key='outline'
                 size='sm'
                 variant='outline'
                 _icon={{
                   as: AntDesign,
                   name: 'plus'
                 }}
                 onPress={() => {
                   setAddCollaborator(!addCollaborator)
                 }}
               />
             </Collapse>
           </HStack>
           <Collapse isOpen={addCollaborator}>
             <FormControl isRequired isInvalid={'newCollaborator' in errors}>
               <FormControl.Label>User Id</FormControl.Label>
               <Input
                 placeholder="Ex:1"
                 onChangeText={(value) => setNewCollaboratorId(value)}
                 defaultValue='0'
                 keyboardType='numeric'
               />
               <FormControl.ErrorMessage>{errors.newCollaborator}</FormControl.ErrorMessage>
             </FormControl>
             <Button onPress={() => { addNewCollaborator() }}>Add Collaborator</Button>
           </Collapse>
           <ScrollView>
             <VStack space={4} >
               { collaborators.map(item => {
                 return (
                   <Pressable
                     key={item.id}
                     onPress={() => {
                       navigation.navigate('FriendProfile', { userInfo: item })
                     }}
                   >
                     <Box
                       safeArea flex={1} p="3" w="90%"
                       bg='transparent'
                       borderColor="gray.900"
                       rounded="4"
                     >
                       <HStack space={3} justifyContent="space-between">
                         <Text
                           _dark={{
                             color: 'warmGray.50'
                           }}
                           color="coolGray.800"
                           bold
                           w={{
                             base: '70%'
                           }}
                         >
                           {item.name !== 'null' ? item.name + ' ' + item.surname : item.userName}
                         </Text>
                         <Spacer />
                         <Text
                           _dark={{
                             color: 'warmGray.50'
                           }}
                           color="coolGray.800"
                           alignSelf="flex-start"
                         >
                           User Id: {item.id}
                         </Text>
                       </HStack>
                     </Box>
                   </Pressable>
                 )
               }) }
             </VStack>
             <Collapse isOpen={collaborators.length === 0}>
               <Notification
                 status='info'
                 message='Currently there are no collaborators added in this course'
               />
             </Collapse>
           </ScrollView>
           <HStack>
             <Heading>Exams</Heading>
             <Spacer />
             <Collapse isOpen={creator}>
               <IconButton
                 key='outline'
                 size='sm'
                 variant='outline'
                 _icon={{
                   as: AntDesign,
                   name: 'plus'
                 }}
                 onPress={() => {
                   navigation.navigate('CreateExam', { course: course })
                 }}
               />
             </Collapse>
           </HStack>
             <VStack space={4} >
               { exams.map(item => {
                 return (
                   <Pressable
                     key={item.number}
                     onPress={() => {
                       navigation.navigate('ExamDetails', { exam: item })
                     }}
                   >
                     <Box
                       safeArea flex={1} p="3" w="90%"
                       bg='transparent'
                       borderColor="gray.900"
                       rounded="4"
                     >
                       <HStack space={3} justifyContent="space-between">
                         <Text
                           _dark={{
                             color: 'warmGray.50'
                           }}
                           color="coolGray.800"
                           bold
                           w={{
                             base: '70%'
                           }}
                         >
                           Exam {item.number} : {item.description}
                         </Text>
                         <Spacer />
                         <Text
                           _dark={{
                             color: 'warmGray.50'
                           }}
                           color="coolGray.800"
                           alignSelf="flex-start"
                         >
                           Questions: {item.questions.length}
                         </Text>
                       </HStack>
                     </Box>
                   </Pressable>
                 )
               }) }
             </VStack>
             <Collapse isOpen={exams.length === 0}>
               <Notification
                 status='info'
                 message='Currently there are no exams added in this course'
               />
             </Collapse>
         </Box>
       </ScrollView>
     </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5869b6',
    padding: 10,
    color: '#bf2d2d'
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  }
})
