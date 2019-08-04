import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Button extends React.Component {
  render() {
    const {onPress, enabled, title} = this.props;
    return (
      <TouchableOpacity style={{backgroundColor:enabled?'#fff5':'#dddd', paddingVertical:10, alignItems:'center', marginBottom:15}} onPress={onPress} disabled={!enabled}>
        <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>{title}</Text>
      </TouchableOpacity>
    );
  }
}