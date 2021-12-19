
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

export default function ProfileEditionForm ({ navigation, route }) {

    const [playing, setPlaying] = useState(false);

    const { course } = route.params

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
            <ScrollView>
                <Center>
                    <Heading>
                        {course.courseName}
                    </Heading>
                </Center>
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
                <Center>
                    <Heading>
                        Class 01
                    </Heading>
                </Center>
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
                <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={course.videos}
                    onChangeState={onStateChange}
                />
            </ScrollView>
        </NativeBaseProvider>
    )
}