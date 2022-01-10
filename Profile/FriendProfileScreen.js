import React from 'react'
import { ImageBackground, View, StyleSheet, Platform } from 'react-native'
import getCapitalLetters from './AvatarLetters'
import logo from '../assets/backgroundProfile.jpg'

import {
  Avatar,
  Box,
  Center,
  Text,
  HStack,
  NativeBaseProvider,
  ScrollView
} from 'native-base'

export default function ProfileInfo ({ navigation, route }) {
  const capitalLetters = getCapitalLetters(route.params.userInfo.userName)
  function renderName () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>Name:</Text>
                <Text style={styles.informationText}>{route.params.userInfo.name}</Text>
            </View>
    )
  }
  function renderSurname () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>Surname:</Text>
                <Text style={styles.informationText}>{route.params.userInfo.surname}</Text>
            </View>
    )
  }
  function renderState () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>State:</Text>
                <Text style={styles.informationText}>{route.params.userInfo.state}</Text>
            </View>
    )
  }

  function renderAddress () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>Address:</Text>
                <Text style={styles.informationText}>{route.params.userInfo.address}</Text>
            </View>
    )
  }
  function renderPhoneNumber () {
    return (
            <View>
                <Text numberOfLines={1}></Text>
                <Text style={styles.fieldHeaderText}>PhoneNumber:</Text>
                <Text style={styles.informationText}>{route.params.userInfo.phoneNumber}</Text>
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
                                <Text style={styles.userNameText}>{route.params.userInfo.userName}</Text>
                                <View style={styles.userAddressRow}>
                                    <View style={styles.userCityRow}>
                                        <Text style={styles.userCityText}>
                                            {route.params.userInfo.city}, {route.params.userInfo.country}
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
                    <Text style={styles.headerText}> Profile Information</Text>
                    {route.params.userInfo.name === 'null' ? renderVoid() : renderName()}
                    {route.params.userInfo.surname === 'null' ? renderVoid() : renderSurname()}
                    <Text numberOfLines={1}></Text>
                    <Text style={styles.fieldHeaderText}>Email:</Text>
                    <Text style={styles.informationText}>{route.params.userInfo.email}</Text>
                    {route.params.userInfo.phoneNumber === 'null' ? renderVoid() : renderPhoneNumber()}
                    {route.params.userInfo.state === 'null' ? renderVoid() : renderState()}
                    {route.params.userInfo.address === 'null' ? renderVoid() : renderAddress()}

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
