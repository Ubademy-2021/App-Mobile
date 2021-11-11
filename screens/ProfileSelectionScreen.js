import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
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
  IconButton,
  HStack,
  Divider
} from 'native-base'

export default function ProfileSelectionScreen ({ navigation }) {
  return (
    <NativeBaseProvider>
        <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <Heading size="md" fontWeight="600" color="coolGray.800">
                    Choose the profile you want to use
                </Heading>
            </View>
            <Text numberOfLines={3}></Text>
            <Icon.Button
                onPress={() => {
                    navigation.navigate("ProfileInfo",{ profile: "Student Profile" });
                }
                }
                name="book"
                backgroundColor='rgba(54, 204, 235, 0.8)'
                size={100}
            >
                Student Profile
            </Icon.Button>
            <Text numberOfLines={2}></Text>
            <Icon.Button
                onPress={() => {
                    navigation.navigate("ProfileInfo",{ profile: "Collaborator Profile" });
                }
                }
                name="book-reader"
                backgroundColor='rgba(82, 0, 167, 0.8)'
                size={100}
            >
                Collaborator Profile
            </Icon.Button>
            <Text numberOfLines={2}></Text>
            <Icon.Button
                onPress={() => {
                    navigation.navigate("ProfileInfo",{ profile: "Creator Profile" });
                }
                }
                name="chalkboard-teacher"
                backgroundColor='rgba(0, 57, 143, 0.8)'
                size={100}
            >
                Creator Profile
            </Icon.Button>

        </Box>
    </NativeBaseProvider>
  )
}
