
import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
/* Importo texto para usar texto */
import ImageAnalyticsTagContext from "react-native/Libraries/Image/ImageAnalyticsTagContext";
//Los componentes estan en https://reactnative.dev/docs/components-and-apis

/* Texto Basico sin font */
/*
const App =() =>{
    return <Text> Hello world!!</Text>
};
*/
import logo from './assets/ubademy.png'

const App =() =>{
    return (
    <View style={styles.container}>
        <Text style={styles.title}> La ubademi</Text>
        <Image
            source={logo}
            style={styles.image}
         />
    </View>
    );
};

/*Los estilos le van a pertenecer a las palabras claves siguientes :*/
const styles= StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#292929"},
    title: {fontSize: 30, color: '#fff'},
    image: {height: 100, width:150 }
})
export default App;
