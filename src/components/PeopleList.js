import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Alert, ToastAndroid, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PeopleItem from './PeopleItem';
import firebase from 'firebase';

const styles = StyleSheet.create({
    List: {flex: 14,},
    button:{ color:'black',},
    container:{flex:1, },
    containerAdd:{ flex:1,  flexDirection:'row' , justifyContent:'center', alignItems:'center'},
    containerSearch:{ flex:1,  flexDirection:'row' , justifyContent:'flex-start', alignItems:'center', marginTop:20}
});




class PeopleList extends Component {
    constructor (props)
    {
        super(props);
        this.state={userId:null, allClients:[], filteredClients:[], searchWord:''};
    }
    peopleSelected = (id) => {
        // Navigate to Client View
        this.props.navigation.navigate('ClientDetail', {userId: this.state.userId, clientId: id})
    }
    filterList = (searchString) => {
        let filteredList = [];    
        if (searchString.length > 0) {
            filteredList = this.state.allClients.filter ((contact)=>contact.firstName.toLowerCase().search(searchString.toLowerCase())>=0 || contact.lastName.toLowerCase().search(searchString.toLowerCase())>=0 || contact.company.toLowerCase().search(searchString.toLowerCase())>=0);
        }
        
        this.setState({searchWord: searchString, filteredClients: filteredList});
    }

    componentDidMount(){
             
        console.log('PeopleList, Component Did Mount!');
        const clientsList = firebase.database().ref('Users/'+this.props.route.params.userId);
        clientsList.on('value', snapshot => {
            let clientsArray = [];
            snapshot.forEach(child => {
                    let contact = {
                        key: child.key,
                        firstName: child.val().firstName,
                        lastName: child.val().lastName,
                        notes: child.val().notes,
                        company: child.val().company,
                        phone:child.val().phone
                    }
                    clientsArray.push(contact);
                    
                });
                //console.log(clientsArray);
                this.setState({userId: this.props.route.params.userId, allClients: clientsArray});
            }); 
                       
        }  
   
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.containerSearch}>
                    {/* <Icon name='plus-circle' size={30} style={styles.button} onPress={()=> ToastAndroid.show(this.state.userId, ToastAndroid.SHORT)} /></View> */}
                    <TextInput placeholder='Find' onChangeText= {this.filterList} value={this.state.searchString} />
                </View>
                <View style={styles.List}>
                    <FlatList 
                    data={this.state.searchWord.length>0? this.state.filteredClients:this.state.allClients}
                    renderItem={({item}) => <PeopleItem people={item} onSelect={ ()=> this.peopleSelected(item.key)} />}
                    keyExtractor={item => item.key} />
                </View>
                <View style={styles.containerAdd}>
                    <Icon name='plus-circle' size={30} style={styles.button} onPress={()=> this.props.navigation.navigate('AddCustomer', {userId: this.state.userId})} />
                </View>
            </View>
        )
    }
}

export default PeopleList;
