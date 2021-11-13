import React from 'react'
import { ImageBackground, View, StyleSheet, Platform } from 'react-native'
import session from '../session/token'
import getCapitalLetters from './AvatarLetters'
import logo from '../assets/backgroundProfile.jpg'

import {
  Avatar,
  Box,
  Center,
  Text,
  VStack,
  IconButton,
  HStack,
  NativeBaseProvider,
  ScrollView
} from 'native-base'

import { FontAwesome5 } from '@expo/vector-icons'

export default function ProfileInfo ({ navigation }) {
  const capitalLetters = getCapitalLetters(session.userData[0].userName)
  function renderName () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>Name:</Text>
                <Text style={styles.informationText}>{session.userData[0].name}</Text>
            </View>
    )
  }
  function renderSurname () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>Surname:</Text>
                <Text style={styles.informationText}>{session.userData[0].surname}</Text>
            </View>
    )
  }
  function renderState () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>State:</Text>
                <Text style={styles.informationText}>{session.userData[0].state}</Text>
            </View>
    )
  }
  function renderPhoneNumber () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>PhoneNumber:</Text>
                <Text style={styles.informationText}>{session.userData[0].phoneNumber}</Text>
            </View>
    )
  }
  function renderVoid () {

  }

  return (
        <NativeBaseProvider>
            <ScrollView>
                <ImageBackground source={logo} resizeMode="cover" style={styles.image}>
                <HStack>
                    <Center flex={1} px="3">
                        <View style={styles.headerColumn}>
                        <Avatar
                            mr={1}
                            size="2xl"
                        >
                            {capitalLetters}
                        </Avatar>
                            <Text style={styles.userNameText}>{session.userData[0].userName}</Text>
                            <View style={styles.userAddressRow}>
                                <View style={styles.userCityRow}>
                                    <Text style={styles.userCityText}>
                                        {session.userData[0].city}, {session.userData[0].country}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Center>
                </HStack>
                    <Text numberOfLines={1}></Text>
                    <Text numberOfLines={1}></Text>

                </ImageBackground>
                <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                    <VStack space={4} alignItems="flex-end">
                            <IconButton
                                colorScheme="indigo"
                                variant="solid"
                                _icon={{
                                  as: FontAwesome5,
                                  name: 'pen'
                                }}
                                onPress={() => {
                                  navigation.navigate('ProfileEditor')
                                }}
                            />
                    </VStack>
                    <Text style={styles.headerText}> Profile Information</Text>

                    {session.userData[0].name === 'null' ? renderVoid() : renderName()}
                    {session.userData[0].surname === 'null' ? renderVoid() : renderSurname()}
                    <Text numberOfLines={1}></Text>
                    <Text style={styles.fieldHeaderText}>Email:</Text>
                    <Text style={styles.informationText}>{session.userData[0].email}</Text>
                    {session.userData[0].phoneNumber === 'null' ? renderVoid() : renderPhoneNumber()}

                    {session.userData[0].state === 'null' ? renderVoid() : renderState()}

                    <Text numberOfLines={1}></Text>
                    <Text style={styles.fieldHeaderText}>Address:</Text>
                    <Text style={styles.informationText}>{session.userData[0].address}</Text>

                </Box>
            </ScrollView>
        </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    margin: 100
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0'
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1
      },
      android: {
        alignItems: 'center'
      }
    })
  },
  placeIcon: {
    color: 'white',
    fontSize: 26
  },
  scroll: {
    backgroundColor: '#FFF'
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  userCityRow: {
    backgroundColor: 'transparent'
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  },
  informationText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600'
  },
  fieldHeaderText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
  headerText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 22,
    fontWeight: '900'
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center'
  }
})
