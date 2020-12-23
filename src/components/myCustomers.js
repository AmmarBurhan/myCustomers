import React, {Component} from 'react';
import { createStackNavigator  } from '@react-navigation/stack';

import PeopleList from './PeopleList';
import ClientDetail from './ClientDetail';
import CustomerForm from './CustomerForm';
import firebase from 'firebase';
import { Button, StyleSheet} from 'react-native';

const Stack=createStackNavigator();
const styles=StyleSheet.create({
    button:{margin:40},
})

class AddCustomer extends Component{

    constructor(props){
        super(props);
        this.state={userId:null};
        
    }

    componentDidMount(){
        this.setState({userId: this.props.route.params.userId});
        
    }
    
    addCustomer (customer){
        const {path, ...compactCustomer}=customer;
        firebase.database().ref('Users/'+ path).push(compactCustomer);
    }

    render (){

        return <CustomerForm action = {'Add'} click = {(customer)=>{this.addCustomer(customer); this.props.navigation.goBack();}} customer = {{...this.props.route.params}} />
    }
}

class EditCustomer extends Component{
    constructor(props){
        super(props);
    }

    saveCustomer (customer){
        const {path, ...compactCustomer}=customer;
        firebase.database().ref('Users/'+path).set(compactCustomer);
    }

    componentDidMount(){
        console.log(this.props.route.params);
    }

    render(){
        return(
            <CustomerForm action={'Edit'} customer={this.props.route.params} click = {(customer)=>{this.saveCustomer(customer); this.props.navigation.goBack();}} />
        );
    }
}


class MyCustomers extends Component {
    constructor(props){
        super(props);
        this.state={userId:null};
    }

    componentDidMount(){
        
        this.setState({userId: this.props.route.params.userId});

    }

    deleteCustomer = (path) => {
        //console.log(path);
        let ref = firebase.database().ref('Users/'+path);
        ref.off();
        ref.remove();
        this.props.navigation.navigate('PeopleList', {userId: this.state.userId});
        
    }

    render(){
        this.props.navigation.setOptions ({headerRight:()=><Button style= {styles.button} title='Sign Out'  onPress= {()=>{firebase.auth().signOut();}} />})
        return (
            
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="PeopleList" component={PeopleList} initialParams = {{userId: this.props.route.params.userId}} />
                <Stack.Screen name="ClientDetail" component={ClientDetail} options={{ title: '' }} initialParams={{delete: this.deleteCustomer}}/>
                <Stack.Screen name='AddCustomer' component={AddCustomer} options={{ title: 'New Customer' }} />
                <Stack.Screen name='EditCustomer' component={EditCustomer} options={{ title: 'Edit Customer' }} />
            </Stack.Navigator>
          );
    }
}

export default MyCustomers;
