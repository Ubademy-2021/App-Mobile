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
        console.log("user id es:",session.userData[0].id);

        fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/' + session.userData[0].id, {
            method: 'PUT',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: session.userData[0].email,
                userName: session.userData[0].userName,
                name: 'null',
                surname: 'null',
                phoneNumber: 'null',
                city: locationData.city,
                state: 'null',
                country: 'null',
                address: 'null'
            })
        })
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
                                City
                            </FormControl.Label>
                            <Input
                                placeholder="CABA"
                                onChangeText={(value) => setLocationData({ ...locationData, city: value })}
                            />
                        </FormControl>
                        <Button.Group
                            direction="column"
                        >
                            <Button
                                onPress={() => {
                                    window.alert(locationData.city);
                                    putLocation();
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
