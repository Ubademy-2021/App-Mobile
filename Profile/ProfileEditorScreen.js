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

    const putLocation = () => {

        fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/' + session.userData[0].id, {
            method: 'PUT',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: session.userData[0].email,
                userName: locationData.userName,
                name: session.userData[0].name,
                surname: session.userData[0].surname,
                phoneNumber: session.userData[0].phoneNumber,
                city: locationData.city,
                state: session.userData[0].state,
                country: session.userData[0].country,
                address: session.userData[0].address
            })
        }).then(response => response.json())
            .then(data => console.log("data:",data)) // Manipulate the data retrieved back, if we want to do something with it
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
