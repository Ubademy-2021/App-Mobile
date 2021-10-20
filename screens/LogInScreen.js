import * as React from 'react'
import logo from '../assets/ubademy.png'
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
  HStack, ScrollView, Alert, IconButton, CloseIcon, Collapse
} from 'native-base'

// TODO: Pasar todos los estilos a la style_sheet

/* Se fija si el log in es valido o no, en la practica la condicion
va a ser distinta obviamente
 */
function verifyLogIn (email, password) {
  if (email) {
    window.alert('Valid Log in.')
  } else {
    window.alert('Invalid log in. Please provide a valid username')
  }
}

export default function LogInScreen ({ route, navigation }) {
  const [email, setEmail] = React.useState() /* En email se guardara el email que se ha escrito */
  const [password, setPassword] = React.useState()
  // const signupStatus = route.params
  // TODO add notification behaviour
  const [show, setShow] = React.useState(false)

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
                              verifyLogIn(email, password)
                              navigation.navigate('ProfileSelection')
                            }
                            }
                        >
                            Sign in
                        </Button>
                        <Button
                            mt="2"
                            colorScheme="blue"
                            _text={styles.buttonText}
                            onPress={() => window.alert('Not implemented yet')}
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
                                onPress= {() => navigation.navigate('Signup')}
                            >
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
                <Box>
                    <Collapse isOpen={show}>
                        <Alert w="100%" status={'success'}>
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
                                        onPress={() => setShow(false)}
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

const styles = StyleSheet.create({
  textDefault: { color: '#444444', fontWeight: 'normal' },
  image: { height: 100, width: 156 },
  buttonText: { color: '#ffffff' }
})
