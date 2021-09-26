import * as React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import logo from './assets/ubademy.png'
import {View, StyleSheet, Image} from 'react-native'
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
    Icon,
    IconButton,
    HStack,
    Divider,
} from 'native-base';

/* Se fija si el log in es valido o no, en la practica la condicion
va a ser distinta obviamente
 */
function verifyLogIn(email,password){
    if(email){
        window.alert("Valid Log in.")
    }
    else{
        window.alert("Invalid log in. Please provide a valid username");
    }
}


export default function LogInScreen() {
    const [email, setEmail] = React.useState(); /*En email se guardara el email que se ha escrito */
    const [password, setPassword] = React.useState();
    return (
        <NativeBaseProvider>
            <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <Image
                        source={logo}
                        style={{height: 100, width:156 }}
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
                            _text={{
                                color: 'coolGray.800',
                                fontSize: 'xs',
                                fontWeight: 500,
                            }}>
                            Email ID
                        </FormControl.Label>
                        <Input
                            value={email}
                            onChangeText={(anything) => setEmail(anything)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.800',
                                fontSize: 'xs',
                                fontWeight: 500,
                            }}>
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
                        _text={{ color: 'white' }}
                        onPress={() =>{
                            verifyLogIn(email,password);
                        }
                        }
                    >
                        Sign in
                    </Button>
                    <Button
                        mt="2"
                        colorScheme="blue"
                        _text={{ color: 'white' }}
                        onPress={() => window.alert("Not implemented yet")}
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
                                fontSize: 'sm',
                            }}
                            href="#">
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}
