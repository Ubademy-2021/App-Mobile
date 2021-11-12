import { Box, Divider, Heading, Input, VStack, Icon, Select, CheckIcon, Text, Button, Radio } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import CourseCard from '../components/CourseCard'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

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

export const SelectDropdownList = (props) => {
  return (
    <VStack space={4}>
      <Select
        selectedValue={props.var}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />
        }}
        mt={1}
        onValueChange={(itemValue) => props.setter(itemValue)}
        defaultValue = 'Any'
      >
        <Select.Item key='Any' label='Any' value='Any' />
        { props.items.map(item => {
          return (<Select.Item key={item.value} label={item.displayValue} value={item.value} />)
        }) }
      </Select>
    </VStack>
  )
}

export default function StudentCourseSearchScreen ({ navigation }) {
  const [filter, setFilter] = React.useState('None')
  const [categories, setCategories] = React.useState([])
  const [subscriptions, setSubscriptions] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState('Any')
  const [selectedSubscription, setSelectedSubscription] = React.useState('Any')
  const [searchResults, setSearchResults] = React.useState([])
  const getCategoriesURL = apiGatewayBaseUrl + 'categories'
  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'
  const getCoursesByCatURL = apiGatewayBaseUrl + 'courses?category_id='
  const getCoursesBySubURL = apiGatewayBaseUrl + 'courses?suscription_id='
  const getCoursesURL = apiGatewayBaseUrl + 'courses'

  const getCategoriesFromApi = () => {
    return fetch(getCategoriesURL)
      .then((response) => response.json())
      .then((json) => {
        const localCategory = []
        for (let i = 0; i < json.length; i++) {
          localCategory.push({ value: json[i].id, displayValue: json[i].name })
        }
        setCategories(localCategory)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getSubscriptionsFromApi = () => {
    return fetch(getSubscriptionsURL)
      .then((response) => response.json())
      .then((json) => {
        const localSub = []
        for (let i = 0; i < json.length; i++) {
          localSub.push({ value: json[i].id, displayValue: json[i].description })
        }
        setSubscriptions(localSub)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getCoursesWithCategoryFromApi (selectedCategory) {
    console.log('geteo cursos por categoria con id=' + selectedCategory)
    return fetch(getCoursesByCatURL + selectedCategory)
      .then((response) => response.json())
      .then((json) => {
        // setCoursesFilteredByCategory(json)
        // setSearchResults(json)
        // console.log(json)
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getCoursesWithSubscriptionFromApi (selectedSubscription) {
    console.log('geteo cursos por sub')
    return fetch(getCoursesBySubURL + selectedSubscription)
      .then((response) => response.json())
      .then((json) => {
        // setSearchResults(json)
        // console.log(json)
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function getCoursesFromApi () {
    console.log('geteo todos los cursos')
    return fetch(getCoursesURL)
      .then((response) => response.json())
      .then((json) => {
        // setSearchResults(json)
        return json
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
    console.log('cat: ' + selectedCategory)
    console.log('sub: ' + selectedSubscription)

    if (selectedCategory !== 'Any' && selectedSubscription !== 'Any') {
      setSearchResults(arrayInnerJoin(await getCoursesWithCategoryFromApi(selectedCategory), await getCoursesWithSubscriptionFromApi(selectedSubscription)))
    } else if (selectedCategory !== 'Any') {
      setSearchResults(await getCoursesWithCategoryFromApi(selectedCategory))
    } else if (selectedSubscription !== 'Any') {
      setSearchResults(await getCoursesWithSubscriptionFromApi(selectedSubscription))
    } else {
      setSearchResults(await getCoursesFromApi())
    }
  }

  React.useEffect(() => {
    getCategoriesFromApi()
    getSubscriptionsFromApi()
    // La primera vcez que se renderiza la pantalla ,al no haber ninguna busuqeuda en curso se muestran las recomendaciones
    // getRecommendationsFromApi()
  }, [])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Heading fontSize="lg">Filter by</Heading>
        <Text>Category</Text>
        <SelectDropdownList items={categories} var={selectedCategory} setter={setSelectedCategory}/>
        <Text>Membership</Text>
        <SelectDropdownList items={subscriptions} var={selectedSubscription} setter={setSelectedSubscription}/>
        <Button onPress={handleSubmit}>
          Search
        </Button>
        <Heading fontSize="lg">Results</Heading>
        { searchResults.map(item => {
          // console.log(item)
          return (
            <Pressable
              key={item.id}
              onPress={() => {
                navigation.navigate('Course', { course: item })
              }}
            >
              <CourseCard
                key={item.id}
                title={item.courseName}
                price={item.inscriptionPrice}
                duration={item.duration}
                subscriptions={item.suscriptions} />
            </Pressable>
          )
        }) }
      </Box>
    </NativeBaseProvider>
  )
}
