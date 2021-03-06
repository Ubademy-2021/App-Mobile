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
import Firebase from '../config/firebase.js'

const auth = Firebase.auth()

export default function SignUpScreen ({ navigation }) {
  const [newUser, setNewUser] = React.useState({})
  const [errors, setErrors] = React.useState({})

  const validateData = () => {
    if (newUser.name === undefined) {
      setErrors({
        ...errors,
        name: 'name is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.name
      setErrors(copyErrors)
    }

    if (newUser.surname === undefined) {
      setErrors({
        ...errors,
        surname: 'Surname is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.surname
      setErrors(copyErrors)
    }

    if (newUser.username === undefined) {
      setErrors({
        ...errors,
        username: 'Username is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.username
      setErrors(copyErrors)
    }

    if (newUser.email === undefined) {
      setErrors({
        ...errors,
        email: 'Email is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.email
      setErrors(copyErrors)
    }

    if (newUser.password === undefined) {
      setErrors({
        ...errors,
        password: 'Password is required'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.password
      setErrors(copyErrors)
    }

    if (newUser.repeatPassword === undefined) {
      setErrors({
        ...errors,
        repeatPassword: 'Please type your password again'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.repeatPassword
      setErrors(copyErrors)
    }

    if (newUser.password !== newUser.repeatPassword) {
      setErrors({
        ...errors,
        password: 'Passwords did not match'
      })
      return false
    } else {
      const copyErrors = errors
      delete copyErrors.password
      setErrors(copyErrors)
    }

    return true
  }

  const onHandleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
    } catch (error) {
      window.alert(error.message)
    }
  }
  const postUser = (callback) => {
    if (newUser.phoneNumber === undefined) {
      newUser.phoneNumber = 'null'
    }
    fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: newUser.email,
        userName: newUser.username,
        name: newUser.name,
        surname: newUser.surname,
        phoneNumber: newUser.phoneNumber,
        city: 'null',
        state: 'null',
        country: 'null',
        address: 'null'
      })
    }).then(response => response.json())
      .then(data => {
        callback(data)
      })
      .catch(error => {
        // this.setState({ errorMessage: error.toString() })
        console.error('There was an error!', error)
      })
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
                            Step 1: Personal data
                        </Heading>
                    </VStack>

                    <VStack space={3} mt="5">
                        <FormControl isRequired isInvalid={'name' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Name
                            </FormControl.Label>
                            <Input
                                placeholder='Ex: Jamie'
                                onChangeText={(value) => setNewUser({ ...newUser, name: value })}
                            />
                            {'name' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.name}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'surname' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Surname
                            </FormControl.Label>
                            <Input
                                placeholder='Ex: Banks'
                                onChangeText={(value) => setNewUser({ ...newUser, surname: value })}
                            />
                            {'surname' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.surname}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'username' in errors} >
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Username
                            </FormControl.Label>
                            <Input
                                placeholder='Ex: Jamie_13'
                                onChangeText={(value) => setNewUser({ ...newUser, username: value })}
                            />
                            {'username' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.username}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'email' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Email
                            </FormControl.Label>
                            <Input
                                placeholder='Ex: amiebanks@example.com'
                                onChangeText={(value) => setNewUser({ ...newUser, email: value })}
                            />
                            {'email' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.email}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'password' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Password
                            </FormControl.Label>
                            <Input
                                type="password"
                                onChangeText={(value) => setNewUser({ ...newUser, password: value })}
                            />
                            {'password' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.password}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'repeatPassword' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Confirm Password
                            </FormControl.Label>
                            <Input
                                type="password"
                                onChangeText={(value) => setNewUser({ ...newUser, repeatPassword: value })}
                            />
                            {'repeatPassword' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.repeatPassword}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Phone number
                            </FormControl.Label>
                            <Input
                                onChangeText={(value) => setNewUser({ ...newUser, phoneNumber: value })}
                            />
                        </FormControl>

                        <Button.Group
                            direction="column"
                        >
                            <Button
                            onPress={() => {
                              if (validateData()) {
                                onHandleSignup()
                                postUser((response) => { navigation.navigate('Location', { user: response }) })
                              }
                            }
                            }
                            >Continue</Button>
                            <Button onPress={() => navigation.navigate('Login')} colorScheme="danger">Cancel</Button>
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
