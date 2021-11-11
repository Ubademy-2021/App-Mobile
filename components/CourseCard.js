import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Heading, Pressable } from 'native-base'

export default function CourseCard (props) {
  return (
    <Pressable
      onPress={() => {
        console.log('Hello world')
      }}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Heading fontSize="md">{props.title}</Heading>
          <Heading fontSize="sm">Category: {props.category}</Heading>
          <Heading fontSize="sm">Subscription: {props.subscription}</Heading>
          { props.children }
        </View>
        <Button size='md'>
          Enroll
        </Button>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20
  }
})
