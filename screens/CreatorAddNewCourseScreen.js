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
  formatForSelectDropDownList,
  formatForSelectMultipleButton, formatForSubscriptions
} from '../common/Format'
import getResourcesFromApi from '../common/ApiCommunication'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

export default function CreatorAddNewCourseScreen ({ navigation }) {
  const [formData, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [submittedForm, setSubmittedForm] = React.useState(false)
  const [subscriptions, setSubscriptions] = React.useState([])
  const [selectedSubscription, setSelectedSubscription] = React.useState('Any')
  const [categories, setCategories] = React.useState([])
  const [selectedCateogries, setSelectedCategories] = React.useState([])

  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  const getCategoriesURL = apiGatewayBaseUrl + 'categories'

  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const validate = () => {
    if (formData.title === undefined || formData.title.length === 0) {
      setErrors({
        ...errors,
        title: 'Title is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.title
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

    return true
  }

  const onSubmit = () => {
    setSubmittedForm(true)
  }

  React.useEffect(() => {
    if (submittedForm) {
      setSubmittedForm(false)
      if (validate()) {
        console.log('Formulario exitoso')
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
             <FormControl isRequired isInvalid={'title' in errors}>
               <FormControl.Label>Title</FormControl.Label>
               <Input
                 placeholder="Python 101"
                 onChangeText={(value) => setData({ ...formData, title: value })}
               />
               <FormControl.HelperText>
                 Write a title for the course
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.title}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isRequired isInvalid={'description' in errors}>
               <FormControl.Label>Description</FormControl.Label>
               <TextArea
                 placeholder="In this course you will learn the python basics"
                 onChangeText={(value) => setData({ ...formData, description: value })}
               />
               <FormControl.HelperText>
                 Description should contain at least 20 characters.
               </FormControl.HelperText>
               <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
             </FormControl>
             <FormControl isInvalid={'subscription' in errors}>
               <FormControl.Label>Subscription</FormControl.Label>
               <SelectDropdownList items={subscriptions} var={selectedSubscription} setter={setSelectedSubscription} defaultValue='Basic Suscription'/>
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
           <Button onPress={onSubmit} >
             Create
           </Button>
         </Box>
       </ScrollView>
     </NativeBaseProvider>
  )
}
