import * as React from 'react'
import session from '../session/token'
import {
    NativeBaseProvider,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    ScrollView, Text
} from 'native-base'
import {StyleSheet} from "react-native";



export default function ProfileEditionForm ({ navigation }) {

    var newUserData={};
    var newUserName, newName
    function reAssignUserData(data){
        session.userData[0].userName=data.userName;
        session.userData[0].name=data.name;
        session.userData[0].surname=data.surname;
        session.userData[0].phoneNumber=data.phoneNumber;
        session.userData[0].city=data.city;
        session.userData[0].state=data.state;
        session.userData[0].country=data.country;
        session.userData[0].address=data.address;
    }

    const putLocation = () => {


        newUserData.newUserName= (locationData.userName===undefined) ? session.userData[0].userName : locationData.userName;
        newUserData.newName= (locationData.name===undefined) ? session.userData[0].name : locationData.name;
        newUserData.newSurname= (locationData.surname ===undefined) ? session.userData[0].surname : locationData.surname;
        newUserData.newPhoneNumber= (locationData.phoneNumber === undefined) ? session.userData[0].phoneNumber : locationData.phoneNumber;
        newUserData.newCity = (locationData.city === undefined) ? session.userData[0].city : locationData.city;
        newUserData.newState = (locationData.state === undefined) ? session.userData[0].state : locationData.state;
        newUserData.newCountry = (locationData.country === undefined) ? session.userData[0].country : locationData.country;
        newUserData.newAddress = (locationData.address === undefined ) ? session.userData[0].address : locationData.address;

        fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/' + session.userData[0].id, {
            method: 'PUT',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
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
        }).then(response => response.json())
            .then(data => {
                reAssignUserData(data);
                console.log("data:",data)
                console.log("session es:",session.userData[0]);
            }) // En data va a estar el nuevo "user" con sus campos, si to.do sale bien
            .catch(err => window.alert("An error occurred while processing your request"))
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
                            Sign Up
                        </Heading>
                        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs" textalign="center">
                            Step 2: Location data
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
                                    putLocation();
                                    navigation.navigate("ProfileInfo");
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
