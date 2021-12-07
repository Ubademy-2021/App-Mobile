import * as React from 'react'
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider'
import {
  Alert,
  Box,
  Button,
  CloseIcon,
  Collapse,
  Heading,
  HStack,
  IconButton,
  ScrollView,
  Text,
  VStack
} from 'native-base'
import SelectMultipleGroupButton from 'react-native-selectmultiple-button/libraries/SelectMultipleGroupButton'
import session from '../session/token'
import getResourcesFromApi from '../common/ApiCommunication'
import { formatForCategories } from '../common/Format'

const postCategoriesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/categories/user'
const getCategoriesURL = 'https://ubademy-api-gateway.herokuapp.com/api-gateway/categories/'

export default function InterestsScreen ({ navigation, route }) {
  const [selectedCateogries, setSelectedCategories] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const { userId } = route.params
  const [showNotificaction, setShowNotification] = React.useState(false)
  const [disableHomeButton, setDisableHomeButton] = React.useState(true)
  const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
  const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken

  const handleSubmit = () => {
    for (let i = 0; i < selectedCateogries.length; i++) {
      fetch(postCategoriesURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          [tokenHeader]: sessionToken
        },
        body: JSON.stringify({
          userId: userId,
          categoryId: selectedCateogries[i]
        })
      })
    }

    setDisableHomeButton(false)
    setShowNotification(true)
  }

  React.useEffect(() => {
    async function fetchData () {
      const cats = await getResourcesFromApi(getCategoriesURL, tokenHeader, sessionToken, navigation)
      setCategories(formatForCategories(cats))
    }

    fetchData()
  }, [])
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
                        <Button
                            onPress={() => navigation.navigate('Login')}
                            colorScheme="success"
                            isDisabled={disableHomeButton}
                        >Home</Button>
                    </Button.Group>
                </Box>
                <Box>
                  <Collapse isOpen={showNotificaction}>
                    <Alert w="100%" status='success'>
                      <VStack space={2} flexShrink={1} w="100%">
                      <HStack flexShrink={1} space={2} justifyContent="space-between">
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                          <Text fontSize="md" color="coolGray.800">
                            User registered successfully
                          </Text>
                      </HStack>
                        <IconButton
                          variant="unstyled"
                          icon={<CloseIcon size="3" color="coolGray.600" />}
                          onPress={() => setShowNotification(false)}
                        />
                      </HStack>
                      </VStack>
                    </Alert>
                  </Collapse>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
  )
}
