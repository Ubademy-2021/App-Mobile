import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Heading } from 'native-base'

export default function CourseCard () {
    {/*const [subscription, setSubscription] = React.useState('None')*/}


    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Heading fontSize="md">2</Heading>
                <Heading fontSize="sm">Price: 3</Heading>
                <Heading fontSize="sm">Duration: 7</Heading>
                <Heading fontSize="sm">Subscription: 9</Heading>
            </View>
        </View>
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