
import session from '../session/token'
import {
    NativeBaseProvider,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    ScrollView, Text, Center
} from 'native-base'
import { StyleSheet , View, Alert} from 'react-native'
import WebView from "react-native-webview";
import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function ProfileEditionForm ({ navigation }) {
    /*
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }  }, []);
    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <Heading>
                        Python course content
                    </Heading>
                </Center>
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
                <Center>
                    <Heading>
                        Class 01 - Dictionary in Python
                    </Heading>
                </Center>
                <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={"2IsF7DEtVjg"}
                    onChangeState={onStateChange}
                />

                <Center>
                    <Heading>
                        Class 02 - Concurrency in Python
                    </Heading>
                </Center>
                <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={"gCCVsvgR2KU"}
                    onChangeState={onStateChange}
                />
            </View>
        </NativeBaseProvider>
    );*/

    const newUserData = {}

  function reAssignUserData (data) {
    session.userData[0].userName = data.userName
    session.userData[0].name = data.name
    session.userData[0].surname = data.surname
    session.userData[0].phoneNumber = data.phoneNumber
    session.userData[0].city = data.city
    session.userData[0].state = data.state
    session.userData[0].country = data.country
    session.userData[0].address = data.address
  }

  function dataToSend () {
    newUserData.newUserName = (locationData.userName === undefined) ? session.userData[0].userName : locationData.userName
    newUserData.newName = (locationData.name === undefined) ? session.userData[0].name : locationData.name
    newUserData.newSurname = (locationData.surname === undefined) ? session.userData[0].surname : locationData.surname
    newUserData.newPhoneNumber = (locationData.phoneNumber === undefined) ? session.userData[0].phoneNumber : locationData.phoneNumber
    newUserData.newCity = (locationData.city === undefined) ? session.userData[0].city : locationData.city
    newUserData.newState = (locationData.state === undefined) ? session.userData[0].state : locationData.state
    newUserData.newCountry = (locationData.country === undefined) ? session.userData[0].country : locationData.country
    newUserData.newAddress = (locationData.address === undefined) ? session.userData[0].address : locationData.address
  }

  const putLocation = async () => {
    const tokenHeader = (session.firebaseSession) ? 'firebase_authentication' : 'facebook_authentication'
    const sessionToken = (session.firebaseSession) ? session.token : session.facebookToken
    dataToSend()

    const response = await fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/' + session.userData[0].id, {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        [tokenHeader]: sessionToken
      },
      body: JSON.stringify({
        email: session.userData[0].email,
        userName: newUserData.newUserName,
        name: newUserData.newName,
        surname: newUserData.newSurname,
        phoneNumber: newUserData.newPhoneNumber,
        city: newUserData.newCity,
        state: newUserData.newState,
        country: newUserData.newCountry,
        address: newUserData.newAddress
      })
    })
    if (response.status === 200) {
      response.json().then(data => {
        reAssignUserData(data)
        window.alert('Profile saved')
        // console.log("New data es:",session.userData[0]);
      })
    } else {
      if (response.status === 403) {
        window.alert('Session expired')
        session.facebookSession = false
        session.firebaseSession = false
        navigation.navigate('Login')
      } else {
        window.alert('An error occurred while processing your request')
      }
    }
  }

  const [locationData, setLocationData] = React.useState({
  })
  const [errors, setErrors] = React.useState({
  })

  return (
        <NativeBaseProvider>
            <ScrollView>
                <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
                    <VStack alignItems="center">
                        <Heading size="lg" color="coolGray.800" fontWeight="600" textalign="center">
                            Profile Editor
                        </Heading>
                    </VStack>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Username
                            </FormControl.Label>
                            <Input
                                placeholder="Jorge06"
                                onChangeText={(value) => setLocationData({ ...locationData, userName: value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Name
                            </FormControl.Label>
                            <Input
                                placeholder="Jorge"
                                onChangeText={(value) => setLocationData({ ...locationData, name: value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Surname
                            </FormControl.Label>
                            <Input
                                placeholder="Perez"
                                onChangeText={(value) => setLocationData({ ...locationData, surname: value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Address
                            </FormControl.Label>
                            <Input
                                placeholder="Moldes 2032"
                                onChangeText={(value) => setLocationData({ ...locationData, address: value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                City
                            </FormControl.Label>
                            <Input
                                placeholder="CABA"
                                onChangeText={(value) => setLocationData({ ...locationData, city: value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                State
                            </FormControl.Label>
                            <Input
                                placeholder="Buenos Aires"
                                onChangeText={(value) => setLocationData({ ...locationData, state: value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Country
                            </FormControl.Label>
                            <Input
                                placeholder="Argentina"
                                onChangeText={(value) => setLocationData({ ...locationData, country: value })}
                            />
                        </FormControl>
                        <Button.Group
                            direction="column"
                        >
                            <Button
                                onPress={() => {
                                  putLocation()
                                  navigation.goBack()
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
