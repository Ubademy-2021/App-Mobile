
import {
  NativeBaseProvider,
  Heading,
  ScrollView, Text, Center
} from 'native-base'
import { Alert, Clipboard } from 'react-native'
import React, { useState, useCallback } from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'

export default function CourseContentScreen ({ navigation, route }) {
  const [playing, setPlaying] = useState(false)
  const videosInfo = []
  const { course } = route.params
  const videosArray = course.videos.split(':')

  let i = 0
  for (const video in videosArray) {
    videosInfo.push({ key: i, videoId: videosArray[i], videoDescription: 'Class ' + i })
    i++
  }
  const onStateChange = useCallback((state) => {
    console.log('Cambio de estado')
    if (state === 'ended') {
      setPlaying(false)
      Alert.alert('video has finished playing!')
    }
    Clipboard.setString("You can't share this link")
  }, [])
  const togglePlaying = useCallback(() => {
    console.log('playing')
    setPlaying((prev) => !prev)
    Clipboard.setString("You can't share this link")
  }, [])
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
                /> */}
      </ScrollView>
    </NativeBaseProvider>
  )
}
