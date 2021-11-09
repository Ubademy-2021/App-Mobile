import { Box, Divider, Heading, Input, VStack, Icon, Select, CheckIcon, Text, Button } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'

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
  const [selectedOption, setSelectedOption] = React.useState('')
  return (
    <VStack space={4}>
      <Select
        selectedValue={selectedOption}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />
        }}
        mt={1}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        defaultValue = 'Any'
      >
        <Select.Item label='Any' value='Any' />
        { props.items.map(item => {
          return (<Select.Item key={item.value} label={item.displayValue} value={item.value} />)
        }) }
      </Select>
    </VStack>
  )
}

export default function StudentCourseSearchScreen () {
  const [searchStatus, setSearchStatus] = React.useState(false)
  const [categories, setCategories] = React.useState([])
  const [subscriptions, setSubscriptions] = React.useState([])
  const getCategoriesURL = apiGatewayBaseUrl + 'categories'
  const getSubscriptionsURL = apiGatewayBaseUrl + 'suscriptions'

  const handleSubmit = () => {

  }

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

  React.useEffect(() => {
    getCategoriesFromApi()
    getSubscriptionsFromApi()
  }, [])

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Heading fontSize="lg">Filter by</Heading>
        <Text>Category</Text>
        <SelectDropdownList items={categories}/>
        <Text>Membership</Text>
        <SelectDropdownList items={subscriptions}/>
        <Button onPressed={handleSubmit}>
          Search
        </Button>
      </Box>
      <Box>

      </Box>
    </NativeBaseProvider>
  )
}
