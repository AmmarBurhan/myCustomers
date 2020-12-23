import React, { Component,  } from 'react';
import { View, StyleSheet, Linking, Text, Alert, ScrollView , } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import IconAD from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase';

class DetailScreen extends Component {

    constructor (props)
    {
        super (props);
        this.state={userId:null, clientId: null, firstName:'', lastName:'', company:'', phone:'', notes:''};
    }
    
    delete () {
        this.props.route.params.delete(this.state.userId+ '/' + this.state.clientId);
    }

    componentDidMount ()
    {
        
        
        const ref = firebase.database().ref('Users/'+this.props.route.params.userId+'/'+ this.props.route.params.clientId);
        ref.on('value', snapshot=>{
            
            if(!(snapshot===null))
                this.setState({
                    userId: this.props.route.params.userId,
                    clientId: snapshot.key,
                    firstName:snapshot.val().firstName,
                    lastName:snapshot.val().lastName,
                    phone:snapshot.val().phone,
                    company: snapshot.val().company,
                    notes:snapshot.val().notes,
                    email: snapshot.val().email,
                    project:snapshot.val().project
                })
        })        
    }
    componentWillUnmount(){
        
        firebase.database().ref('Users/'+this.props.route.params.userId+'/'+ this.props.route.params.clientId).off();
    }
    render(){
        let customer = {...this.state};
        return (
            <View style={styles.mainContainer}>
                <View  style={styles.detailContainer}>
                    <View style={{ alignItems:'center', backgroundColor:'', marginBottom:30}}>
                        <Icon name='user' size={150} style={{color:'white'}} />
                    </View>
                    <View style={{justifyContent:'space-around',  alignItems:'center'}}>
                        <Text style={styles.txtBigWhite}>{this.state.firstName} {this.state.lastName} </Text>
                    </View>
                    <View style={{justifyContent:'space-around',  alignItems:'stretch', padding:20, }}>
                        <Text style= {styles.txtRow}>Company: {this.state.company}  </Text>
                        <View style={styles.separator} />
                        <Text style= {styles.txtRow}>Email: {this.state.email}  </Text>
                        <View style={styles.separator} />
                        <Text style= {styles.txtRow}>Phone: {this.state.phone}  </Text>
                        <View style={styles.separator} />
                        <Text style= {styles.txtRow}>Project: {this.state.project}  </Text>
                        <View style={styles.separator} />
                        <Text style= {styles.txtRow}>Notes: {this.state.notes}  </Text>
                        <View style={styles.separator} />
                    </View>
                </View>
                <DetailControl navigation={this.props.navigation} phone={this.state.phone} email ={this.state.email} edit = {this.state.userId+'/'+this.state.clientId} delete = {()=>this.delete()} customer={customer} />
            </View>
        )
    }
}

class ClientLocation extends Component {
      render(){
        return (
            <View style={[styles.detailContainer, {justifyContent:'center', alignItems:'center'}]}>
                {/* <Text>Map place holder</Text> */}
            </View>
        )
    }
}

function DetailControl (props) {
    //console.log(props.phone);
return (
        <View style={styles.detailControl}>
            <Icon name='phone' size={35} style={{color:'white'}} onPress={()=>Linking.openURL(`tel: ${props.customer.phone}`)}  /> 
            <Icon name='mail' size={35} style={{color:'white'}} onPress={()=>Linking.openURL(`mailto: ${props.customer.email}`)} /> 
            <Icon name='trash-2' size={35} style={{color:'white'}} onPress={()=> props.delete()} /> 
            <Icon name='map-pin' size={35} style={{color:'white'}} onPress={()=>props.navigation.navigate('ClientLocation')} /> 
            <IconAD name='edit' size={35} style={{color:'white'}} onPress={()=>props.navigation.navigate('EditCustomer', props.customer)} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    detailContainer: {
        flex:7,
        backgroundColor:'#587d78',
    },
    detailControl:{
        flex:1,
        backgroundColor:'#2683b7',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    mainContainer:{
        flex:1,
    },
    txtBigWhite: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
      },
    txtRow:{
        color:'white',
        fontSize: 20,
        marginBottom:2
    },

    separator:{
        backgroundColor:'white',
        height:1,
        marginBottom:10
    }
});

const Stack = createStackNavigator();

class ClientDetails extends Component {
    constructor(props){
        super(props);
        this.state={userId: null, customerId:null};
    }
    componentDidMount(){
        //console.log(this.props);
        this.setState({userId: this.props.route.params.userId, customerId: this.props.route.params.clientId});
    }    
    render (){
        return(
            <Stack.Navigator screenOptions={{headerShown: false}}> 
                <Stack.Screen name='DetailScreen' component={DetailScreen} options={{ title: '' }}  initialParams ={{userId: this.props.route.params.userId, clientId: this.props.route.params.clientId, delete: this.props.route.params.delete}} />
                <Stack.Screen name='ClientLocation' component={ClientLocation} options={{ title: '' }}/>
            </Stack.Navigator> 
        );
    }
}

export default ClientDetails;
