import React from 'react'
import session from '../session/token'
import { Box, Button, FormControl, Heading, HStack, Input, ScrollView, Text, TextArea, VStack } from 'native-base'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import SelectDropdownList from '../components/SelectDropdownList'
import SelectMultipleGroupButton from 'react-native-selectmultiple-button/libraries/SelectMultipleGroupButton'
import { getResourcesFromApi } from '../common/ApiCommunication'
import { formatForCategories, formatForSubscriptions } from '../common/Format'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CreatorCourseDetailsScreen ({ navigation, route }) {
  const { course } = route.params
  const creatorId = session.userData[0].id

  const [editEnabled, setEditEnabled] = React.useState(false)
  const [formData, setData] = React.useState(course)
  const [errors, setErrors] = React.useState({})
  const [submittedForm, setSubmittedForm] = React.useState(false)
  const [subscriptions, setSubscriptions] = React.useState([])
  const [selectedSubscription, setSelectedSubscription] = React.useState('Any')
  const [categories, setCategories] = React.useState([])
  const [selectedCateogries, setSelectedCategories] = React.useState([])
  const [students, setStudents] = React.useState([])

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  const getCategoriesURL = apiGatewayBaseUrl + 'categories'
  const getCourseStudentsURL = apiGatewayBaseUrl + 'courses/students/'

  const onSubmit = () => {
    setSubmittedForm(true)
  }

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
        description: 'Description is too short'
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
        duration: 'Invalid duration format'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.duration
      setErrors(copyErrors)
    }

    return true
  }

  React.useEffect(() => {
    if (submittedForm) {
      setSubmittedForm(false)
      if (validate()) {
        setData({
          ...formData,
          ownerId: creatorId
        })
        // postNewCourseToApi(postNewCourseURL, tokenHeader, sessionToken, formData, navigation)
      }
    }
  }, [submittedForm])

  React.useEffect(() => {
    async function fetchData () {
      const subs = await getResourcesFromApi(getSubscriptionsURL, tokenHeader, sessionToken, navigation)
      const cats = await getResourcesFromApi(getCategoriesURL, tokenHeader, sessionToken, navigation)
      const students = await getResourcesFromApi(getCourseStudentsURL + course.id, tokenHeader, sessionToken, navigation)
      setSubscriptions(formatForSubscriptions(subs))
      setCategories(formatForCategories(cats))
      setStudents(students)
    }

    fetchData()
  }, [])

  return (
     <NativeBaseProvider>
       <ScrollView>
         <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
           <VStack width="80%" space={4}>
             <FormControl isDisabled={!editEnabled} isRequired isInvalid={'courseName' in errors}>
               <FormControl.Label>Title</FormControl.Label>
               <Input
                 placeholder="Python 101"
                 onChangeText={(value) => setData({ ...formData, courseName: value })}
                 defaultValue={formData.courseName}
               />
               <FormControl.HelperText>
                 Choose a name for the course
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.courseName}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isDisabled={!editEnabled} isRequired isInvalid={'description' in errors}>
               <FormControl.Label>Description</FormControl.Label>
               <TextArea
                 placeholder="In this course you will learn the python basics"
                 onChangeText={(value) => setData({ ...formData, description: value })}
                 defaultValue={formData.description}
               />
               <FormControl.HelperText>
                 Description should contain at least 20 characters.
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isDisabled={!editEnabled} isRequired isInvalid={'duration' in errors}>
               <FormControl.Label>Duration</FormControl.Label>
               <Input
                 placeholder="22:05:42"
                 onChangeText={(value) => setData({ ...formData, duration: value })}
                 defaultValue={formData.duration}
               />
               <FormControl.HelperText>
                 Indicate the duration of the course in HH:MM:SS format
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.duration}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isDisabled={!editEnabled} isInvalid={'subscription' in errors}>
               <FormControl.Label>Subscription</FormControl.Label>
               <SelectDropdownList items={subscriptions} var={selectedSubscription} setter={setSelectedSubscription} defaultValue={formData.suscriptions[0].description}/>
               <FormControl.HelperText>
                 Choose the minimum subscription needed to access the course
               </FormControl.HelperText>
             </FormControl>
             <FormControl isDisabled={!editEnabled}>
               <FormControl.Label>Categories</FormControl.Label>
               <SelectMultipleGroupButton
                 group={categories}
                 onSelectedValuesChange={(values) => setSelectedCategories(values)}
               />
               <FormControl.HelperText>
                 Choose the categories this course belongs to
               </FormControl.HelperText>
             </FormControl>
           </VStack>
          <Button type='success' onPress={onSubmit}>
             Confirm Changes
          </Button>
         </Box>
         <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
           <Heading>Students</Heading>
            <ScrollView>
              <VStack space={4} alignItems="center">
                { students.map(item => {
                  return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      console.log('click en usuario')
                    }}
                  >
                    {({ isHovered }) => {
                      return (
                        <Box
                          bg={isHovered ? 'cyan.800' : 'transparent'}
                          p="5"
                          rounded="8"
                        >
                          <Text fontSize="sm">{item.name + ' ' + item.surname}</Text>
                        </Box>
                      )
                    }}
                  </Pressable>
                  )
                }) }
              </VStack>
          </ScrollView>
         </Box>
       </ScrollView>
     </NativeBaseProvider>
  )
}
