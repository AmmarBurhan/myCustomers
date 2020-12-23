import React , {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ToastAndroid} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

const Stack = createStackNavigator();

const styles = new StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        
        alignItems: 'stretch',
        padding:20,
        backgroundColor: "#787878"},

    label:{
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 6,
        backgroundColor: "#6a5acd",
        color: "#20232a",
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold",
        padding:5

    },

    txtInput:{
        backgroundColor:"#ffffff",
        borderRadius:2,
        borderColor:"#3c3c3c",
        marginTop:10,
        marginBottom:10,
        
    },

    btnRegister:{
        backgroundColor: '#ff6347',
        color:'#f0f0f0',
        marginBottom:30,
        
    }
});

class SignIn extends Component
{
    constructor(props){
        super (props);
        this.state={
            email:'',
            password:'',
            
        }
    }
       
    handleEmailChange = (newValue) => {
        this.setState({email: newValue});
    }

    handlePasswordChange = (newValue) => {
        this.setState({password: newValue});
    }

    signIn = () => {
        if (this.state.email.length > 0)
            if (this.state.password.length > 0)
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch(error=> console.log(error));
            
            else
            {
                ToastAndroid.show("Please provide password!", ToastAndroid.SHORT);
                console.log('\n'+this.state.email + ': ' + this.state.email.length+'\n' + this.state.password + ': ' + this.state.password.length);
            }
        
        else 
            ToastAndroid.show("Please provide email", ToastAndroid.SHORT);
    }

    render()
    {
        return(
        <View style={styles.container}>
            
            <Text
            style={styles.label}>
                Email
            </Text>
        
            <TextInput
                style={styles.txtInput}
                keyboardType= 'email-address'
                textContentType='emailAddress'
                onChangeText = {this.handleEmailChange}
                value={this.state.email}
                />
            
            <Text
            style={styles.label}>
                Password
            </Text>
            
            <TextInput
                style={styles.txtInput}
                textContentType='password'
                secureTextEntry={true}
                onChangeText = {this.handlePasswordChange}
                value={this.state.password}
                
                />
            
            <Button
                style={styles.btnRegister}
                title={'Sign In'}
                onPress={this.signIn} />

            <Text style={{marginTop:20,}}>Don't have an account? Please Register</Text>

            <Button title='Register' onPress={() => this.props.navigation.navigate('Register')} />

        </View>
        );
    }
}

class Register extends Component
{
    constructor(props){
        super (props);
        this.state={
            email:'',
            password:'',
            password2:'',
        }
    }
    
    
    
    handleEmailChange = (newValue) => {
        this.setState({email: newValue});
    }

    handlePasswordChange = (newValue) => {
        this.setState({password: newValue});
    }

    handlePassword2Change = (newValue) => {
        this.setState({password2: newValue});
    }

    register = () => {
        if (this.state.email.length>0){
            if (this.state.password.length>0 && this.state.password===this.state.password2)
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .catch(error=> console.log(error));
            else
            {
                ToastAndroid.show("No password or passwords are not matching", ToastAndroid.SHORT);
            }
        }
        else 
        {
            ToastAndroid.show("Please provide email", ToastAndroid.SHORT);
        }
    }

    render()
    {
        return(
        <View style={styles.container}>
            
                <Text
                style={styles.label}>
                    Email
                </Text>
            
                <TextInput
                    style={styles.txtInput}
                    keyboardType= 'email-address'
                    textContentType='emailAddress'
                    onChangeText = {this.handleEmailChange}
                    value={this.state.email}
                    />
                
                <Text
                style={styles.label}>
                    Password
                </Text>
                
                <TextInput
                    style={styles.txtInput}
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText = {this.handlePasswordChange}
                    value={this.state.password}
                    
                    />
                <Text
                style={styles.label}>
                    Repeat Password
                </Text>
                
                <TextInput
                    style={styles.txtInput}
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText = {this.handlePassword2Change}
                    value={this.state.password2}
                    
                    />
                <Button
                    style={styles.btnRegister}
                    title={'Register'}
                    onPress={this.register} />
           
            
                
                    <Text style={{marginTop:20,}}>Already have an account? Please Sign in</Text>
                    <Button title='Sign In' onPress={() => this.props.navigation.navigate('SignIn')} />
                
                
            
        </View>
        );
    }
}

class UserAuth extends Component
{
    componentDidMount()
    {
        //firebase.auth().signOut();
        
        firebase.auth().onAuthStateChanged(firebaseUser=>{
            if (firebaseUser) {
                console.log(firebaseUser.uid);
                this.props.route.params.userSigned(firebaseUser.uid);
            }
            else {
                // do nothing!
                console.log(firebaseUser);
                this.props.route.params.userSigned(null);
                //this.props.navigation.navigate('SignIn');
            }
        })
    }

    render()
    {
        return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={SignIn} name='SignIn' />
            <Stack.Screen component={Register} name='Register' />
        </Stack.Navigator>
        );
    }
}

export default UserAuth;
