import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {text:'', edit:false};
  }
  render(){
    var {placeholder, onChangeText, warning, ready, caption, password} = this.props;
    // placeholder = placeholder?placeholder:'';
    // onChangeText = onChangeText?onChangeText:text=>null;
    // warning = warning?warning:'';
    // ready = ready?ready:text=>true;
    // caption = caption?caption:'';
    // password = password?password:false;
    return (
      <View style={{marginBottom:15}}>
        <Text style={{color:'#fff', fontWeight:'bold'}}>{caption}</Text>
        <View style={{backgroundColor:'#fff', paddingHorizontal:2, marginTop:5, marginBottom:5}}>
          <TextInput secureTextEntry={password} placeholder={this.props.placeholder} onChangeText={text => {this.setState({text, edit:true});onChangeText(text);}} />
        </View>
        {this.state.edit?(ready(this.state.text)?null:<View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center'}}><Ionicons name='ios-warning' size={24} color='#d00' /><Text style={{color:'#fff'}}>  {warning}</Text></View>):null}
      </View>
    );
  }
}