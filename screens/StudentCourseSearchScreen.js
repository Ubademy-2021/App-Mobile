import {
  Box,
  Divider,
  Heading,
  Input,
  VStack,
  Icon,
  Text,
  Button,
  Collapse, ScrollView
} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import CourseCard from '../components/CourseCard'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Notification from '../components/Notification'
import session from '../session/token'
import SelectDropdownList from '../components/SelectDropdownList'
import { formatForCategories, formatForSubscriptions } from '../common/Format'
import { getResourcesFromApi } from '../common/ApiCommunication'

const apiGatewayBaseUrl = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/'

function SearchBar () {
  return (
    <VStack
      space={5}
      width="100%"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }>
      <VStack width="100%" space={5} alignItems="center">
        <Heading fontSize="lg">Courses</Heading>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          bg="transparent"
          borderRadius="10"
          py="1"
          px="2"
          placeholderTextColor="gray.500"
          _hover={{ bg: 'gray.200', borderWidth: 0 }}
          borderWidth="0"
          _web={{
            _focus: { style: { boxShadow: 'none' } }
          }}
          InputLeftElement={
            <Icon
              ml="2"
              size="5"
              color="gray.500"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
    </VStack>
  )
}

export default function StudentCourseSearchScreen ({ navigation }) {
  const [categories, setCategories] = React.useState([])
  const [subscriptions, setSubscriptions] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState('Any')
  const [selectedSubscription, setSelectedSubscription] = React.useState('Any')
  const [searchResults, setSearchResults] = React.useState([])
  const [searchSubmitted, setSearchSubmitted] = React.useState(false)

  const getCategoriesURL = apiGatewayBaseUrl + 'categories'
  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  const getCoursesURL = apiGatewayBaseUrl + 'courses'
  const getCoursesByCatURL = apiGatewayBaseUrl + 'courses?category_id='
  const getCoursesBySubURL = apiGatewayBaseUrl + 'courses?suscription_id='
  const getRecommendationsURL = apiGatewayBaseUrl + 'courses/recommendation/'

  const studentId = session.userData[0].id
  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  function getCoursesWithCategoryFromApi (selectedCategory) {
    return fetch(getCoursesByCatURL + selectedCategory,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            window.alert('Session expired')
            session.facebookSession = false
            session.firebaseSession = false
            navigation.navigate('Login')
          } else {
            window.alert('There was an error while handling your request')
          }
        } else {
          return response.json()
        }
      })
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getCoursesWithSubscriptionFromApi (selectedSubscription) {
    return fetch(getCoursesBySubURL + selectedSubscription,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            window.alert('Session expired')
            session.facebookSession = false
            session.firebaseSession = false
            navigation.navigate('Login')
          } else {
            window.alert('There was an error while handling your request')
          }
        } else {
          return response.json()
        }
      })
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getCoursesFromApi () {
    return fetch(getCoursesURL,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            window.alert('Session expired')
            session.facebookSession = false
            session.firebaseSession = false
            navigation.navigate('Login')
          } else {
            window.alert('There was an error while handling your request')
          }
        } else {
          return response.json()
        }
      })
      .then((json) => {
        // setSearchResults(json)
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getRecommendationsFromApi () {
    return fetch(getRecommendationsURL + studentId,
      { headers: { [tokenHeader]: sessionToken } })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            window.alert('Session expired')
            session.facebookSession = false
            session.firebaseSession = false
            navigation.navigate('Login')
          } else {
            window.alert('There was an error while handling your request')
          }
        } else {
          return response.json()
        }
      })
      .then(async (json) => {
        setSearchResults(await json)
        // return json
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function arrayInnerJoin (arr1, arr2) {
    const result = []
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i].id === arr2[j].id) {
          result.push(arr1[i])
        }
      }
    }
    return result
  }

  const handleSubmit = async () => {
    if (selectedCategory !== 'Any' && selectedSubscription !== 'Any') {
      setSearchResults(arrayInnerJoin(await getCoursesWithCategoryFromApi(selectedCategory), await getCoursesWithSubscriptionFromApi(selectedSubscription)))
    } else if (selectedCategory !== 'Any') {
      setSearchResults(await getCoursesWithCategoryFromApi(selectedCategory))
    } else if (selectedSubscription !== 'Any') {
      setSearchResults(await getCoursesWithSubscriptionFromApi(selectedSubscription))
    } else {
      setSearchResults(await getCoursesFromApi())
    }
    setSearchSubmitted(true)
  }

  React.useEffect(() => {
    async function fetchData () {
      const subs = await getResourcesFromApi(getSubscriptionsURL, tokenHeader, sessionToken, navigation)
      const cats = await getResourcesFromApi(getCategoriesURL, tokenHeader, sessionToken, navigation)
      subs.unshift({
        description: 'Any',
        id: 0,
        price: 0
      })
      cats.unshift({
        name: 'Any',
        id: 0
      })

      setSubscriptions(formatForSubscriptions(subs))
      setCategories(formatForCategories(cats))
      console.log(categories)
    }

    fetchData()
    getRecommendationsFromApi()
  }, [])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Heading fontSize="lg">Filter by</Heading>
        <Text>Category</Text>
        <SelectDropdownList items={categories} var={selectedCategory} setter={setSelectedCategory} defaultValue='Any'/>
        <Text>Subscription</Text>
        <SelectDropdownList items={subscriptions} var={selectedSubscription} setter={setSelectedSubscription} defaultValue='Any'/>
        <Button onPress={handleSubmit}>
          Search
        </Button>
        {searchSubmitted === true ? <Heading fontSize="lg">Search Results</Heading> : <Heading fontSize="lg">Recommendations</Heading>}
        <Collapse isOpen={searchSubmitted && searchResults.length === 0}>
          <Notification
            status='error'
            message={'The are no courses that match the given parameters'}
          />
        </Collapse>
        <ScrollView>
          { searchResults.map(item => {
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
                  subscription={item.suscriptions[0].description} />
              </Pressable>
            )
          }) }
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  )
}
