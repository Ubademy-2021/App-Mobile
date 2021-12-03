import * as React from 'react'
import logo from '../assets/ubademy.png'
import { View, StyleSheet, Image } from 'react-native'
import * as Facebook from 'expo-facebook'
import Firebase from '../config/firebase.js'

import session from '../session/token'
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
  HStack, ScrollView
} from 'native-base'

const auth = Firebase.auth()

export default function LogInScreen ({ navigation }) {
  const [email, setEmail] = React.useState() /* En email se guardara el email que se ha escrito */
  const [password, setPassword] = React.useState()
  // TODO add notification behaviour
  const [loginError, setLoginError] = React.useState('')
    session.firebaseSession=false
    session.facebookSession=false
  // asd
  const getLogInFacebook = () => {
    // console.log(session.token)
    return fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/login',
      { headers: { facebook_authentication: session.facebookToken } })
      .then((response) => response.json())
      .then((json) => {
          console.log("Response:",json);
        if (json[0].isBlock === true) {
          window.alert('This user has been blocked')
        } else {
            session.facebookSession=true;
          session.userData = json
          navigation.navigate('ProfileSelection')
        }
      })
      .catch((error) => {
        /* NO SE PUDO LOGGEAR, MOSTRAR MENSAJE */
        window.alert('Invalid user')
        console.error(error)
      })
  }

  const onLogin = async (email, password) => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password)
        const aux = await Firebase.auth().currentUser.getIdTokenResult()
        session.token = aux.token
        console.log(session.token)
        getLogIn()
      }
    } catch (error) {
      setLoginError(error.message)
      window.alert('Invalid user')
    }
  }

  const getLogIn = async () => {
      const response = await fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/login',
          {headers: {firebase_authentication: session.token}});
      console.log("Response status:",response.status);
      if(response.status===200){
          response.json().then(data => {

              console.log('json nuevo:', data)
              session.userData = data
              session.firebaseSession=true;
              // console.log(session.userData)
              navigation.navigate('ProfileSelection')

          })
      }
      else{
          window.alert('Invalid user')
      }
/*
      return fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/login',
          {headers: {firebase_authentication: session.token}})
          .then(response => {
              console.log("Response:", response);
              if (!response.ok) throw Error(response.status)
              response.json()
          })
          .then(data => {
                  console.log("data:", data);
                  //console.log("response:",response);
                  /*
              if (json[0].isBlock === true) {
                window.alert('This user has been blocked')
              } else {
                console.log('json nuevo:', json)
                session.userData = json
                  session.firebaseSession=true;
                // console.log(session.userData)
                navigation.navigate('ProfileSelection')
              }
          )
          .catch((error) => {
              window.alert('Invalid user')
              console.error(error)
          })*/
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
        session.facebookToken = token
        console.log(session.facebookToken)
        /* En esta url, con el token, obtengo los datos del usuario */
        const response = await fetch(`https://graph.facebook.com/me?access_token=${session.facebookToken}`)
        // window.alert(`Hi ${(await response.json()).name}!`)
        getLogInFacebook()
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  return (
        <NativeBaseProvider>
            <ScrollView>
                <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={logo}
                            style={styles.image}
                        />

                        <Heading size="lg" fontWeight="600" color="coolGray.800">
                            Welcome to Ubademy!
                        </Heading>
                        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
                            Sign in to continue
                        </Heading>
                    </View>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label
                                _text={styles.textDefault}>
                                Email ID
                            </FormControl.Label>
                            <Input
                                value={email}
                                onChangeText={(anything) => setEmail(anything)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.textDefault}>
                                Password
                            </FormControl.Label>
                            <Input
                                type="password"
                                value={password}
                                onChangeText={(anything) => setPassword(anything)}
                            />
                        </FormControl>
                        <Button
                            mt="2"
                            colorScheme="indigo"
                            _text={styles.buttonText}
                            onPress={() => {
                              session.token = 'invalid'
                              // verifyLogIn(email, password)
                              onLogin(email, password)
                              // get login con el token -> ERROR O USUARIO
                              // navigation.navigate('ProfileSelection')
                            }
                            }
                        >
                            Sign in
                        </Button>
                        <Button
                            mt="2"
                            colorScheme="blue"
                            _text={styles.buttonText}
                            onPress={onLoginWithFacebookPress}
                        >
                            Sign in with Facebook
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="muted.700" fontWeight={400}>
                                I'm a new user.{' '}
                            </Text>
                            <Link
                                _text={{
                                  color: 'indigo.500',
                                  fontWeight: 'medium',
                                  fontSize: 'sm'
                                }}
                                onPress= {() => navigation.navigate('SignupOptions')}
                            >
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  textDefault: { color: '#444444', fontWeight: 'normal' },
  image: { height: 100, width: 156 },
  buttonText: { color: '#ffffff' }
})
