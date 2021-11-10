
/*
import React from 'react';
import {
    VStack,
    Button,
    FormControl,
    Input,
    NativeBaseProvider,
    Center
} from 'native-base';

function validation(formData,errors,setErrors){
    if (formData.name === undefined) {
        setErrors({
            ...errors,
            name: 'Name is required',
        });
        return false;
    } else if (formData.name.length < 3) {
        setErrors({
            ...errors,
            name: 'Name is too short',
        });
        return false;
    }
    return true;
}

function BuildingAFormExample() {
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const onSubmit = () => {
        validation(formData,errors,setErrors) ? console.log('Submitted') : console.log('Validation Failed');
    };

    return (
        <VStack width="90%" mx="3">
            <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label _text={{bold: true}}>Country/Region</FormControl.Label>
                <Input
                    placeholder="Argentina"
                    onChangeText={(value) => setData({ ...formData, name: value })}
                />
                <FormControl.Label _text={{bold: true}}>Locality</FormControl.Label>
                <Input
                    placeholder="C.A.B.A"
                    onChangeText={(value) => setData({ ...formData, locality: value })}
                />
                <FormControl.Label _text={{bold: true}}>Street</FormControl.Label>
                <Input
                    placeholder="Moldes"
                    onChangeText={(value) => setData({ ...formData, street: value })}
                />
                {'name' in errors ?
                    <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>Error</FormControl.ErrorMessage>
                    :

                    <FormControl.HelperText _text={{fontSize: 'xs'}}>
                        Name should contain at least 3 characters.
                    </FormControl.HelperText>
                }
            </FormControl>
            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Submit
            </Button>
        </VStack>
    );
}
export default function () {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <BuildingAFormExample />
            </Center>
        </NativeBaseProvider>
    );
}
*/
/*
import React from "react"
import {
    FormControl,
    Input,
    Stack,
    Center,
    NativeBaseProvider,
} from "native-base"
export const Example = () => {
    return (
        // Con FormControl isRequired isInvalid=true> , seteo tod.o lo del error
        // Con FormControl isDisabled>,o  Con FormControl isRequired isInvalid=false>
        // deshabilito to.do lo que se seteaba con el error
        <FormControl isRequired isInvalid={false}>
            <Stack mx={4}>
                <FormControl.Label>Favorite framework</FormControl.Label>
                <Input p={2} placeholder="Is it react?" />
                <FormControl.HelperText>
                    We'll keep this between us.
                </FormControl.HelperText>
                <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
        </NativeBaseProvider>
    )
}
*/

import * as React from 'react'

import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  ScrollView
} from 'native-base'

import { StyleSheet } from 'react-native'

function isEmpty (str) {
  return (!str || str.length === 0)
}

export default function SignUpForm ({ navigation, route }) {
  const { user } = route.params

  const [locationData, setLocationData] = React.useState({
  })
  const [errors, setErrors] = React.useState({
  })

  const putLocation = () => {
      console.log("USER ID ACA ES:",user.id);
    fetch('https://ubademy-api-gateway.herokuapp.com/api-gateway/users/' + user.id, {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        userName: user.userName,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        address: locationData.address
      })
    })
  }

  const validate = () => {
    if (locationData.country === undefined) {
      setErrors({
        ...errors,
        country: 'Country is required'
      })
      return false
    }
    if (locationData.state === undefined) {
      setErrors({
        ...errors,
        state: 'State is required'
      })
      return false
    }
    if (locationData.city === undefined) {
      setErrors({
        ...errors,
        city: 'City is required'
      })
      return false
    }
    if (locationData.address === undefined) {
      setErrors({
        ...errors,
        address: 'Address is required'
      })
      return false
    }
    return true
  }

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
                        <FormControl isRequired isInvalid={'country' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Country
                            </FormControl.Label>
                            <Input
                                placeholder="Argentina"
                                onChangeText={(value) => setLocationData({ ...locationData, country: value })}
                            />
                            {'country' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.country}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'state' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                State/Province
                            </FormControl.Label>
                            <Input
                                placeholder="Buenos Aires"
                                onChangeText={(value) => setLocationData({ ...locationData, state: value })}
                            />
                            {'state' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.state}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'city' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                City
                            </FormControl.Label>
                            <Input
                                placeholder="CABA"
                                onChangeText={(value) => setLocationData({ ...locationData, city: value })}
                            />
                            {'city' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.city}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <FormControl isRequired isInvalid={'address' in errors}>
                            <FormControl.Label
                                _text={styles.formControlText}>
                                Address Line
                            </FormControl.Label>
                            <Input
                                placeholder="Juncal 521"
                                onChangeText={(value) => setLocationData({ ...locationData, address: value })}
                            />
                            {'address' in errors
                              ? <FormControl.ErrorMessage _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>{errors.address}</FormControl.ErrorMessage>
                              : <FormControl.HelperText>
                                </FormControl.HelperText>
                            }
                        </FormControl>
                        <Button.Group
                            direction="column"
                        >
                            <Button
                                onPress={() => {
                                  if (validate()) {
                                    putLocation()
                                    navigation.navigate('Interests', { userId: user.id })
                                  }
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
