import * as React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import { Box, Button, Heading, ScrollView, VStack } from 'native-base'
import SelectMultipleGroupButton from 'react-native-selectmultiple-button/libraries/SelectMultipleGroupButton'

const getCategoriesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/categories'
const postCategoriesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/categories/user'

export default function InterestsScreen ({ navigation }) {
  const [selectedCateogries, setSelectedCategories] = React.useState([])
  const [categories, setCategories] = React.useState([])

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

  const handleSubmit = () => {
    for (let i = 0; i < selectedCateogries.length; i++) {
      fetch(postCategoriesURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1,
          categoryId: selectedCateogries[i]
        })
      })
    }
    navigation.navigate('Login')
  }

  getCategoriesFromApi()
  return (
        <NativeBaseProvider>
            <ScrollView>
                <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
                    <VStack alignItems="center">
                        <Heading size="lg" color="coolGray.800" fontWeight="600" textalign="center">
                            Sign Up
                        </Heading>
                        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs" textalign="center">
                            Step 3: What are you interested in?
                        </Heading>
                    </VStack>
                </Box>
                <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
                    <VStack alignItems="center">
                        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs" textalign="center">
                            Please select the topics of your interest
                        </Heading>
                    </VStack>
                    <SelectMultipleGroupButton
                        group={categories}
                        onSelectedValuesChange={(values) => setSelectedCategories(values)}
                    />
                </Box>
                <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
                    <Button.Group
                        direction="column"
                    >
                        <Button
                            onPress={handleSubmit}
                        >Finish</Button>
                        <Button onPress={() => navigation.navigate('Login')} colorScheme="danger">Cancel</Button>
                    </Button.Group>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
  )
}
