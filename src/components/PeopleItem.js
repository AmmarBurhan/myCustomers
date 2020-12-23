import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#587d78',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
    },

    title: {
        top: 20,
        left: 10,
        fontSize: 24,
    },
    
    action: {
        textAlign:'right'
    },
    icon: {
        color: 'white',
    },
});


const PeopleItem = (props) => {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => props.onSelect(props.people.id)}>
                <View style={{flexDirection: "row", marginBottom:5}} >
                    <EvilIcon name={'user'} style={styles.icon} size={100} />
                    <Text style={styles.title}>  {props.people.firstName} {props.people.lastName}</Text>
                </View>
                <Text style = {styles.action} >{props.people.phone} ({props.people.company})</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PeopleItem;
