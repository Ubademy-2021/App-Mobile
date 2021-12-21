
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
import CourseInSubscriptionCard from "../components/CourseInSubscriptionCard";
import CustomVideo from "../components/CustomVideo"

export default function CourseContentScreen ({ navigation, route }) {

    const [playing, setPlaying] = useState(false);
    //const [videosArrayInfo, setVideosArrayInfo] =useState([]);
    const videosInfo= [];
    const { course } = route.params
    const videosArray=course.videos.split(":");

    var i=0;
    for (var video in videosArray){
        videosInfo.push({key: i, videoId: videosArray[i], videoDescription: "Class "+i})
        i++;
    }
    console.log("Videos info es",videosInfo);
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
                <Text numberOfLines={1}></Text>
                <Center>
                    <Heading>
                        {course.courseName}
                    </Heading>
                </Center>
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
                <Heading>
                    Class Videos
                </Heading>
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
                { videosInfo.map(item => {
                    return (
                        <YoutubePlayer
                            key={item.key}
                            height={300}
                            play={playing}
                            videoId={item.videoId}
                            onChangeState={onStateChange}
                        />
                    )
                }) }
                <Text numberOfLines={1}></Text>
                <Text numberOfLines={1}></Text>
{/*                <YoutubePlayer
                    key={4}
                    height={300}
                    play={playing}
                    videoId="z1QZqYuiGa8"
                    onChangeState={onStateChange}
                />*/}
            </ScrollView>
        </NativeBaseProvider>
    )
}