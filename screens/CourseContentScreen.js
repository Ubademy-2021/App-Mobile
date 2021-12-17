
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
import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function ProfileEditionForm ({ navigation }) {

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);
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
    )
}