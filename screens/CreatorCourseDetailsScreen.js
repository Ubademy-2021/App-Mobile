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

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CreatorCourseDetailsScreen ({ navigation, route }) {
  const { course } = route.params

  const [formData, setData] = React.useState(course)
  const [errors, setErrors] = React.useState({})
  const [submittedForm, setSubmittedForm] = React.useState(false)
  const [subscriptions, setSubscriptions] = React.useState([])
  const [selectedSubscription, setSelectedSubscription] = React.useState('Any')
  const [categories, setCategories] = React.useState([])
  const [students, setStudents] = React.useState([])
  const [collaborators, setCollaborators] = React.useState([])
  const [editEnabled, setEditEnabled] = React.useState(false)
  const [addCollaborator, setAddCollaborator] = React.useState(false)
  const [newCollaboratorId, setNewCollaboratorId] = React.useState([])

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken
  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  const getCategoriesURL = apiGatewayBaseUrl + 'categories'
  const getCourseStudentsURL = apiGatewayBaseUrl + 'courses/students/'
  const getCollaboratorsURL = apiGatewayBaseUrl + 'collaborators/'
  // const getCourseStudentsURL = 'https://course-service-ubademy.herokuapp.com/api/courses/students/'
  // const putCourseURL = apiGatewayBaseUrl + 'courses/' + course.id
  const putCourseURL = 'https://course-service-ubademy.herokuapp.com/api/courses/' + course.id
  const postNewCollaboratorURL = apiGatewayBaseUrl + 'collaborators'

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
    console.log(status)
    if (status === 201) {
      const collabs = await getResourcesFromApi(getCollaboratorsURL + course.id, tokenHeader, sessionToken, navigation)
      setCollaborators(formatForCollaborations(collabs))
      setAddCollaborator(false)
    }
  }

  const onSubmit = () => {
    setSubmittedForm(true)
  }

  // TODO Revisar el editar porque habia errores
  React.useEffect(() => {
    if (submittedForm) {
      setSubmittedForm(false)
      if (validate()) {
        putCourseToApi(putCourseURL, tokenHeader, sessionToken, formData, selectedSubscription, navigation)
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
      setSubscriptions(formatForSubscriptions(subs))
      setCategories(formatForCategories(cats))
      setStudents(students)
      setCollaborators(formatForCollaborations(collabs))
    }

    fetchData()
  }, [])

  return (
     <NativeBaseProvider>
       <ScrollView>
         <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
           <HStack space={3} alignItems="center">
             <Heading>
               Basic Info
             </Heading>
             <Spacer />
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
           </HStack>
           <VStack width="80%" space={4}>
             <FormControl isRequired isDisabled={!editEnabled} isInvalid={'courseName' in errors}>
               <FormControl.Label>Title</FormControl.Label>
               <Input
                 placeholder="Ej:Python 101"
                 onChangeText={(value) => setData({ ...formData, courseName: value })}
                 defaultValue={formData.courseName}
               />
               <FormControl.ErrorMessage>{errors.courseName}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isDisabled={!editEnabled} isInvalid={'description' in errors}>
               <FormControl.Label>Description</FormControl.Label>
               <TextArea
                 placeholder="Ej:In this course you will learn the python basics"
                 onChangeText={(value) => setData({ ...formData, description: value })}
                 defaultValue={formData.description}
               />
               <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isDisabled={!editEnabled} isInvalid={'duration' in errors}>
               <FormControl.Label>Duration</FormControl.Label>
               <Input
                 placeholder="Ej:22:05:42"
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
                      console.log('click en usuario')
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
                <Text>Currently there are no students enrolled to this course</Text>
              </Collapse>
           </ScrollView>
           <HStack>
             <Heading>Collaborators</Heading>
             <Spacer />
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
           </HStack>
           <Collapse isOpen={addCollaborator}>
             <FormControl isRequired isInvalid={'newCollaborator' in errors}>
               <FormControl.Label>User Id</FormControl.Label>
               <Input
                 placeholder="Ej:1"
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
                       console.log('click en colaborador')
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
               <Text>Currently there are no collaborators added in this course</Text>
             </Collapse>
           </ScrollView>
         </Box>
       </ScrollView>
     </NativeBaseProvider>
  )
}
