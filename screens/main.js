
import React from 'react';
import {createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Explore from './explore';
import Nearby from './nearby';
import Trending from './trending';
import Drawer from './drawer';
import Item from './item';

const Tabs = createAppContainer(createMaterialTopTabNavigator({
  Explore, Nearby, Trending
},{
  tabBarOptions: {
    style:{
      backgroundColor:'#008b8b'
    },
  }
}));
const Stack = createAppContainer(createStackNavigator({
  Tabs
},{
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerTitle:'DressUp',
      headerStyle:{
        backgroundColor:'#008b8b'
      },
      headerTitleStyle: {
        marginLeft: 0,
      },
      headerTintColor:'#fff',
      headerLeft: (
        <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.toggleDrawer()}><Ionicons name='md-menu' color='#fff' size={25} /></TouchableOpacity>
      )
    };
  }
}))
const Nested = createAppContainer(createDrawerNavigator({
  Stack
},{
  contentComponent: Drawer
}));

export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {state:0, item:null};
    this.main = 0;
    this.item = 1;
  }
  render(){
    switch(this.state.state){
      case this.main:
        return <Nested screenProps={{onItem:item=>this.setState({item, state:1})}} />;
      case this.item:
        return <Item iid={this.state.item} />;
    }
  }
}