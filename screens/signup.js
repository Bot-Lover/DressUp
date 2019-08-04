import React from 'react';
import {ScrollView, KeyboardAvoidingView, TouchableOpacity, Text} from 'react-native';
import Button from '../components/button';
import Input from '../components/input';

export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {name:'', email:'', pass:'', conf:''};
  }

  onPress=() => {
    fetch('https://dressUp-854e9.firebaseapp.com/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:this.state.name, email:this.state.email, password:this.state.pass})
    }).then(reply=>reply.text()).then(reply=>{
      console.log(reply, " is the reply.")
      if(reply) {
        if(reply !== 'no') this.props.onSignedUp({name:this.state.name, email:this.state.email, uid:reply});
        else alert("Account already exists");
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior='padding' style={{flex:1}}>
        <ScrollView style={{flex:1, justifyContent:'center', backgroundColor:'#008b8b', paddingHorizontal:10}}>
          <Input placeholder='Enter your name here.' onChangeText={name=>this.setState({name})} warning='This field is required' ready={name=>name.length>0} caption='Name:' />
          <Input placeholder='Enter your email here.' onChangeText={email=>this.setState({email})} warning='This field is required' ready={email=>email.length>0} caption='Email:' />
          <Input placeholder='Enter a passowrd here.' onChangeText={pass=>this.setState({pass})} warning='Atleast 6 digits are required' ready={pass=>pass.length>5} caption='Password:' password />
          <Input placeholder='Re-enter the passowrd here.' onChangeText={conf=>this.setState({conf})} warning='Passwords are not equal' ready={conf=>conf===this.state.pass} caption='Confirm password:' password />
          <Button onPress={this.onPress} enabled={this.state.name.length>0&&this.state.email.length>0&&this.state.pass.length>5&&this.state.conf===this.state.pass} title="Sign Up" />
          <TouchableOpacity onPress={this.props.onCancel} style={{alignItems:'center'}}>
            <Text style={{color:'#fff'}}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}