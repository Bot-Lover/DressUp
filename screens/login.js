
import React from 'react';
import {ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, View, AsyncStorage} from 'react-native';
import Button from '../components/button';
import Input from '../components/input';

export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {pass:'', email:''};
  }
  onPress = () => {
    console.log("Checking,", JSON.stringify({email:this.state.email, password:this.state.pass}));
    fetch("https://dressup-854e9.firebaseapp.com/checkProfile", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:this.state.email, password:this.state.pass})
    }).then(reply=>reply.json()).then(reply => {if(reply && reply.name) this.props.onLoggedIn(reply)});
  }
  render() {
    return (
      <KeyboardAvoidingView enabled behavior='padding' style={{flex:1}}>
        <ScrollView style={{flex:1, justifyContent:'center', backgroundColor:'#008b8b', paddingHorizontal:10}}>
          <Input placeholder='Enter your email here' onChangeText={email=>this.setState({email})} warning='This field is required' ready={email=>email.length>0} caption='Email:' />
          <Input placeholder='Enter a passowrd here' onChangeText={pass=>this.setState({pass})} warning='Atleast 6 digits are required' ready={pass=>pass.length>5} caption='Password:' password />
          <Button onPress={this.onPress} enabled={this.state.pass.length>5&&this.state.email.length>0} title="Login" />
          <Text style={{color:'#fff', marginBottom:15, textAlign:'center'}}>OR</Text>
          <Button onPress={this.props.onCreate} enabled title="Sign Up" />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}