import {Avatar, ListItem} from "react-native-elements";
import React from 'react'
import session from '../session/token'
const CustomListItem = () => {
    return (
        <ListItem>
            <Avatar
                rounded
                source={require('../assets/avatar.png')}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>

                    Usuario 2
                </ListItem.Title>

                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Hola, como te va?
                </ListItem.Subtitle>


            </ListItem.Content>
        </ListItem>

    );
};

export default CustomListItem;