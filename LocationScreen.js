import React from "react";
import {
    VStack,
    FormControl,
    Input,
    NativeBaseProvider,
    Center
} from "native-base";

function BuildingAFormExample() {
    const [formData, setData] = React.useState({});

    return (
        <VStack width="90%" mx="3">
            <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>Name</FormControl.Label>
                <Input
                    placeholder="John"
                    onChangeText={(value) => setData({ ...formData, name: value })}
                />
                <FormControl.HelperText _text={{fontSize: 'xs'}}>
                    Name should contain atleast 3 character.
                </FormControl.HelperText>
                <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>Error Name</FormControl.ErrorMessage>
            </FormControl>
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
