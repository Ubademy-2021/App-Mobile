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

export default function SignUpScreen ({ navigation }) {
  const [newUser, setNewUser] = React.useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    phoneNumber: ''
  })
  const [errors, setErrors] = React.useState({})

  const handleChange = e => {
    const { name, value } = e.target

    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const validateData = () => {
    if (newUser.name === undefined) {
      setErrors({
        ...errors,
        name: 'name is required'
      })
      return false
    }
    if (newUser.surname === undefined) {
      setErrors({
        ...errors,
        surname: 'Surname is required'
      })
      return false
    }
    if (newUser.username === undefined) {
      setErrors({
        ...errors,
        username: 'Username is required'
      })
      return false
    }
    if (newUser.email === undefined) {
      setErrors({
        ...errors,
        email: 'Email is required'
      })
      return false
    }
    if (newUser.password === undefined) {
      setErrors({
        ...errors,
        password: 'Password is required'
      })
      return false
    }
    if (newUser.repeatPassword === undefined) {
      setErrors({
        ...errors,
        repeatPassword: 'Please type your password again'
      })
      return false
    }

    return true
  }

  const handleSubmit = e => {
    // Validar la informacion ingresada por el usuario
    // Enviar el formulario
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
                        <FormControl isRequired>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Name
                            </FormControl.Label>
                            <Input onChangeText={handleChange}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Surname
                            </FormControl.Label>
                            <Input onChangeText={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Username
                            </FormControl.Label>
                            <Input onChangeText={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Email
                            </FormControl.Label>
                            <Input onChangeText={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Password
                            </FormControl.Label>
                            <Input type="password" onChangeText={handleChange}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Confirm Password
                            </FormControl.Label>
                            <Input type="password" onChangeText={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Phone number
                            </FormControl.Label>
                            <Input onChangeText={handleChange} />
                        </FormControl>

                        <Button.Group
                            direction="column"
                        >
                            <Button >Continue</Button>
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
