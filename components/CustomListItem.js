import {Avatar, ListItem} from "react-native-elements";
import React from 'react'
import session from '../session/token'
const CustomListItem = ({senderId, receiverId, username, enterChat}) => {
    return (
        <ListItem onPress={() => enterChat(senderId,receiverId)} bottomDivider>
            <Avatar
                rounded
                source={require('../assets/avatar.png')}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>
                    {username}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Tap to chat
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    );
};

export default CustomListItem;