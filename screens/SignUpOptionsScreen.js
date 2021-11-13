import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  IconButton,
  HStack,
  Divider
} from 'native-base'
import * as Facebook from 'expo-facebook'
import session from '../session/token'

export default function SignUpOptionsScreen ({ navigation }) {
  let email
  let username
  const postUser = (callback) => {
    fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // TODO: Poner username y password
      body: JSON.stringify({
        email: email,
        userName: username,
        name: 'null',
        surname: 'null',
        phoneNumber: 'null',
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

  const onLoginWithFacebookPress = async () => {
    await Facebook.initializeAsync({
      appId: '396374185541511'
    })
    try {
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      })
      if (type === 'success') {
        /* TODO: Este token lo tiene que recibir el back */
        // facebookToken = token;
        session.facebookToken = token
        /* En esta url, con el token, obtengo los datos del usuario */
        const response = await fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${session.facebookToken}`)
        const jsonData = (await response.json())
        email = jsonData.email
        username = jsonData.name
        postUser((response) => { navigation.navigate('Location', { user: response }) })
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  return (
      <NativeBaseProvider>
        <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
          <Text numberOfLines={1}></Text>
          <Text numberOfLines={1}></Text>
          <Text numberOfLines={1}></Text>
          <Text numberOfLines={1}></Text>
          <Button
              mt="2"
              colorScheme="indigo"
              onPress={() => {
                navigation.navigate('Signup')
              }
              }
          >
            Sign up with e-mail
          </Button>
          <Text numberOfLines={9}></Text>
          <Button
              mt="2"
              colorScheme="blue"

              onPress={() => {
                onLoginWithFacebookPress()
              }
              }
          >
            Sign up with Facebook
          </Button>
        </Box>
      </NativeBaseProvider>
  )
}
