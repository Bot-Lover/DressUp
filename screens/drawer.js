import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Drawer extends React.Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <Text>Hii {/*this.props.screenProps.user.name*/}</Text>
        <TouchableOpacity >
          <Text>Click Here to log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
