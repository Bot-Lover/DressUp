// import React from 'react';
// import { View, ActivityIndicator, AsyncStorage } from 'react-native';

// import SignUp from './screens/signup';
// import Login from './screens/login';
// import Main from './screens/main';

// class Signer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.signup = 0;
//     this.login = 1;
//     this.state = {state:this.login, user:{}};
//   }
//   render() {
//     switch(this.state.state) {
//       case this.signup:
//         return <SignUp onCancel={() => this.setState({state:this.login})} onSignedUp={this.props.onLoggedIn} />;
//       case this.login:
//         return <Login onLoggedIn={user => this.props.onLoggedIn(user)} onCreate={() => this.setState({state:this.signup})} />;
//     }
//   }
// }

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.loggedIn = 0;
//     this.notLoggedIn = 1;
//     this.loading = 2;
//     this.state = {state: this.loading, user:{}};
//     this.onOpen();
//   }
//   onOpen = async() => {
//     const user = await AsyncStorage.getItem('user');
//     console.log("opened, data is =", user)
//     if(user) {
//       this.setState({state:this.loggedIn, user});
//     }
//     else {
//       this.setState({state:this.notLoggedIn});
//     }
//   };
//   onLoggedIn = user => {
//     AsyncStorage.setItem('user', JSON.stringify(user))
//     this.setState({state:this.loggedIn, user})
//   };
//   onLoggedOut = () => {
//     AsyncStorage.removeItem('user');
//     this.setState({state:this.notLoggedIn, user:{}})
//   };
//   render() {
//     switch(this.state.state) {
//       case this.loading:
//         return <View style={{justifyContent:'center', alignItems:'center'}}><ActivityIndicator size='large'/></View>;
//       case this.loggedIn:
//         return <Main screenProps={{onLoggedOut:this.onLoggedOut, user:this.state.user}} />;
//       case this.notLoggedIn:
//         return <Signer onLoggedIn={user => this.onLoggedIn(user)} />;
//     }
//   }
// }

import React from 'react';
import {createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Explore from './screens/explore';
import Nearby from './screens/nearby';
import Trending from './screens/trending';
import Drawer from './screens/drawer';
import Item from './screens/item';

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
  Tabs
},{
  contentComponent: Drawer
}));

export default createAppContainer(createStackNavigator({
  Nested:{
    screen:Nested,
    navigationOptions: ({navigation}) => {
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
  },
  Item: {
    screen: Item,
    navigationOptions: {
      header: null
    }
  }
},));
// export default class Main extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {state:0, item:null};
//     this.main = 0;
//     this.item = 1;
//   }
//   render(){
//     switch(this.state.state){
//       case this.main:
//         return <Nested screenProps={{onItem:item=>this.setState({item, state:1})}} />;
//       case this.item:
//         return <Item iid={this.state.item} onBack={() => this.setState({state:this.main, item:null})} />;
//     }
//   }
// }

