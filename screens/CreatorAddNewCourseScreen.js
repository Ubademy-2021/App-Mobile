import React from 'react'
import {
  VStack,
  Button,
  FormControl,
  Input,
  NativeBaseProvider, Box, TextArea, ScrollView
} from 'native-base'
import SelectDropdownList from '../components/SelectDropdownList'

import session from '../session/token'
import SelectMultipleGroupButton from 'react-native-selectmultiple-button/libraries/SelectMultipleGroupButton'
import {
  formatForCategories,
  formatForSubscriptions
} from '../common/Format'
import { getResourcesFromApi, postNewCourseToApi } from '../common/ApiCommunication'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CreatorAddNewCourseScreen ({ navigation }) {
  const [formData, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [submittedForm, setSubmittedForm] = React.useState(false)
  const [subscriptions, setSubscriptions] = React.useState([])
  const [selectedSubscription, setSelectedSubscription] = React.useState(1)
  const [categories, setCategories] = React.useState([])
  const [selectedCateogries, setSelectedCategories] = React.useState([])
  const creatorId = session.userData[0].id

  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  const getCategoriesURL = apiGatewayBaseUrl + 'categories'
  const postNewCourseURL = apiGatewayBaseUrl + 'courses'
  // const postNewCourseURL = 'https://course-service-ubademy.herokuapp.com/api/courses'

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

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
    if (formData.videosId === undefined || formData.videosId.length === 0) {
      setErrors({
        ...errors,
        videosId: 'videosId is required'
      })
      return false
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

  const onSubmit = () => {
    setSubmittedForm(true)
  }

  React.useEffect(() => {
    if (submittedForm) {
      setSubmittedForm(false)
      if (validate()) {
        postNewCourseToApi(postNewCourseURL, tokenHeader, sessionToken, formData, creatorId, selectedSubscription, selectedCateogries, navigation)
      }
    }
  }, [submittedForm])

  React.useEffect(() => {
    async function fetchData () {
      const subs = await getResourcesFromApi(getSubscriptionsURL, tokenHeader, sessionToken, navigation)
      const cats = await getResourcesFromApi(getCategoriesURL, tokenHeader, sessionToken, navigation)
      setSubscriptions(formatForSubscriptions(subs))
      setCategories(formatForCategories(cats))
    }

    fetchData()
  }, [])

  return (
     <NativeBaseProvider>
       <ScrollView>
         <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
           <VStack width="80%" space={4}>
             <FormControl isRequired isInvalid={'courseName' in errors}>
               <FormControl.Label>Title</FormControl.Label>
               <Input
                 placeholder="Ej:Python 101"
                 onChangeText={(value) => setData({ ...formData, courseName: value })}
               />
               <FormControl.HelperText>
                 Choose a name for the course
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.courseName}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isInvalid={'description' in errors}>
               <FormControl.Label>Description</FormControl.Label>
               <TextArea
                 placeholder="Ej:In this course you will learn the python basics"
                 onChangeText={(value) => setData({ ...formData, description: value })}
               />
               <FormControl.HelperText>
                 Description should contain at least 20 characters.
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isInvalid={'duration' in errors}>
               <FormControl.Label>Duration</FormControl.Label>
               <Input
                 placeholder="Ej:22:05:42"
                 onChangeText={(value) => setData({ ...formData, duration: value })}
               />
               <FormControl.HelperText>
                 Indicate the duration of the course in HH:MM:SS format
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.duration}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isInvalid={'videosId' in errors}>
               <FormControl.Label>Video</FormControl.Label>
               <Input
                   placeholder="2IsF7DEtVjg"
                   onChangeText={(value) => setData({ ...formData, videosId: value })}
               />
               <FormControl.HelperText>
                 Indicate the id of the video you want to add to the course
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.videosId}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isInvalid={'subscription' in errors}>
               <FormControl.Label>Subscription</FormControl.Label>
               <SelectDropdownList items={subscriptions} var={selectedSubscription} setter={setSelectedSubscription} defaultValue='Basic'/>
               <FormControl.HelperText>
                 Choose the minimum subscription needed to access the course
               </FormControl.HelperText>
             </FormControl>
             <FormControl>
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
         </Box>
         <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
          <Button onPress={onSubmit}>
             Create
          </Button>
         </Box>
       </ScrollView>
     </NativeBaseProvider>
  )
}
