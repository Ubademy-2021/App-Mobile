
import * as React from 'react'

import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  ScrollView
} from 'native-base'

import { StyleSheet } from 'react-native'

export default function SignUpForm ({ navigation, route }) {
  const { user } = route.params

  const [locationData, setLocationData] = React.useState({
  })
  const [errors, setErrors] = React.useState({
  })

  const putLocation = () => {
    fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/' + user.id, {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        userName: user.userName,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        address: locationData.address
      })
    })
  }

  const validate = () => {
    if (locationData.country === undefined) {
      setErrors({
        ...errors,
        country: 'Country is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.country
      setErrors(copyErrors)
    }

    if (locationData.state === undefined) {
      setErrors({
        ...errors,
        state: 'State is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.state
      setErrors(copyErrors)
    }

    if (locationData.city === undefined) {
      setErrors({
        ...errors,
        city: 'City is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.city
      setErrors(copyErrors)
    }

    if (locationData.address === undefined) {
      setErrors({
        ...errors,
        address: 'Address is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.address
      setErrors(copyErrors)
    }

    return true
  }

  return (
        <NativeBaseProvider>
            <ScrollView>
                <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
                    <VStack alignItems="center">
                        <Heading size="lg" color="coolGray.800" fontWeight="600" textalign="center">
                            Sign Up
                        </Heading>
                        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs" textalign="center">
                            Step 2: Location data
                        </Heading>
                    </VStack>

                    <VStack space={3} mt="5">
                        <FormControl isRequired isInvalid={'country' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Country
                            </FormControl.Label>
                            <Input
                                placeholder="Ex: Argentina"
                                onChangeText={(value) => setLocationData({ ...locationData, country: value })}
                            />
                            {'country' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.country}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'state' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                State/Province
                            </FormControl.Label>
                            <Input
                                placeholder="Ex: Buenos Aires"
                                onChangeText={(value) => setLocationData({ ...locationData, state: value })}
                            />
                            {'state' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.state}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'city' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                City
                            </FormControl.Label>
                            <Input
                                placeholder="Ex: CABA"
                                onChangeText={(value) => setLocationData({ ...locationData, city: value })}
                            />
                            {'city' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.city}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'address' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Address Line
                            </FormControl.Label>
                            <Input
                                placeholder="Ex: Juncal 521"
                                onChangeText={(value) => setLocationData({ ...locationData, address: value })}
                            />
                            {'address' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.address}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <Button.Group
                            direction="column"
                        >
                            <Button
                                onPress={() => {
                                  if (validate()) {
                                    putLocation()
                                    navigation.navigate('Interests', { userId: user.id })
                                  }
                                }
                                }
                            >
                                Continue
                            </Button>
                        </Button.Group>
                    </VStack>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  formControlText: { color: '#444444', fontWeight: '500' }
})
