import React, {useCallback, useState} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import { Heading } from 'native-base'
import YoutubePlayer from "react-native-youtube-iframe";

export default function CustomVideo (props) {
    const [playing, setPlaying] = useState(false);



    return (
        <YoutubePlayer
            height={300}
            play={playing}
            videoId={props.videoId}
            onChangeState={onStateChange}
        />
    )
}