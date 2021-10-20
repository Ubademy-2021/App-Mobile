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

export default function SignUpOptionsScreen ({ navigation }) {
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
              onPress={() => window.alert('Not implemented yet')}
          >
            Sign up with Facebook
          </Button>
        </Box>
      </NativeBaseProvider>
  )
}
