import React, { Component } from 'react';
import {View, TextInput, Text, Button, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles=StyleSheet.create({
    conainer:{flex:1, padding:10, justifyContent:'space-evenly', backgroundColor:'#587d78', },
    button:{color:'white', fontSize:40},
    rowView:{flexDirection:'row',  height: 50, marginBottom:20},
    txtLabel:{color:'black', marginRight:2, fontSize:20, color:'white'},
    txtInput:{marginEnd:2, backgroundColor:'white', borderBottomWidth:1, borderBottomColor:'black', fontSize:20},
    titleView:{flex:1, justifyContent:'center', alignItems:'flex-end'},
    txtInputView:{flex:2, justifyContent:'center', alignItems:'stretch', },
})

class CustomerForm extends Component {
    constructor (props){
        super(props);
        this.state={
            firstName: '',
            lastName:'',
            phone:'',
            email:'',
            notes:'',
            project:'',
            company:'',
            btnValue:'Add',
            userId:null,
            clientId:null,
        }
    }
    
    handleChange = (newValue, source) => this.setState({[source]:newValue});
    handleClick = () => {
        
        let customer = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email:this.state.email,
            company: this.state.company,
            project:this.state.project,
            notes: this.state.notes,
            path: this.props.action==='Add'? this.state.userId : this.state.userId + '/' + this.state.clientId,
        };

        console.log(customer);
        
        this.props.click(customer);
        
    };

    componentDidMount(){
        console.log('CustomerForm, DidMount method (props)');
        console.log(this.props);

        if (this.props.action === 'Edit')
        {
            //read the rest of the props into the state
            this.setState({
                firstName: this.props.customer.firstName,
                lastName: this.props.customer.lastName,
                phone:this.props.customer.phone,
                email:this.props.customer.email,
                notes:this.props.customer.notes,
                project:this.props.customer.project,
                company:this.props.customer.company,
                //change the button text in case of editing an exiting customer
                btnValue:'Save',
                userId: this.props.customer.userId,
                clientId: this.props.customer.clientId
            });
        }
        else
        {
            console.log('I am in the else part when Add is passed to CustomerForm')
            console.log(this.props);
            this.setState({
                userId: this.props.customer.userId,
            });
        }
    }

    render (){
        // console.log('CustomerForm, Render method (Props)');
        // console.log(this.props);

        console.log('CustomerForm, Render method (State)');
        console.log(this.state);

        console.log('CustomerForm, Render method (Props)');
        console.log(this.props);

        return(
            <View style={styles.conainer}>
                <View style={styles.rowView}>
                    <View style={styles.titleView}>
                        <Text style={styles.txtLabel}>First Name: </Text>
                    </View>
                    <View style={styles.txtInputView}>
                        <TextInput style={styles.txtInput} value= {this.state.firstName} onChangeText={(newValue)=>this.handleChange(newValue, 'firstName')} />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.titleView}>
                        <Text style={styles.txtLabel}>Last Name: </Text>
                    </View>
                    <View style={styles.txtInputView}>
                        <TextInput style={styles.txtInput} value= {this.state.lastName} onChangeText={(newValue)=>this.handleChange(newValue, 'lastName')} />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.titleView}>
                        <Text style={styles.txtLabel}>Phone: </Text>
                    </View>
                    <View style={styles.txtInputView}>
                        <TextInput style={styles.txtInput} value= {this.state.phone} onChangeText={(newValue)=>this.handleChange(newValue, 'phone')} />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.titleView}>
                        <Text style={styles.txtLabel}>Email: </Text>
                    </View>
                    <View style={styles.txtInputView}>
                        <TextInput style={styles.txtInput} value= {this.state.email} onChangeText={(newValue)=>this.handleChange(newValue, 'email')} />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.titleView}>
                        <Text style={styles.txtLabel}>Company: </Text>
                    </View>
                    <View style={styles.txtInputView}>
                        <TextInput style={styles.txtInput} value= {this.state.company} onChangeText={(newValue)=>this.handleChange(newValue, 'company')} />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.titleView}>
                        <Text style={styles.txtLabel}>Project: </Text>
                    </View>
                    <View style={styles.txtInputView}>
                        <TextInput style={styles.txtInput} value= {this.state.project} onChangeText={(newValue)=>this.handleChange(newValue, 'project')} />
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.titleView}>
                        <Text style={styles.txtLabel}>Notes: </Text>
                    </View>
                    <View style={styles.txtInputView}>
                        <TextInput multiline numberOfLines={4} style={[styles.txtInput, {height:90}]} value= {this.state.notes} onChangeText={(newValue)=>this.handleChange(newValue, 'notes')} />
                    </View>
                </View>
                <Button style= {styles.button} title={this.state.btnValue} onPress={this.handleClick} />
            </View>
        )
    }
}

export default CustomerForm;
