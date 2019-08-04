
import React from 'react';
import {View, Text, Dimensions, Image, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('window');

class ItemHint extends React.Component {
  constructor(props){
    super(props);
    this.state = {data:null};
    this.fetchData();
  }
  fetchData = () => {
    fetch('https://dressup-854e9.firebaseapp.com/itemHint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key:this.props.iid})
    }).then(reply=>reply.json()).then(reply => {
      if(reply && !reply.error) this.setState({data:reply});
    });
  }
  render() {
    return this.state.data?(
      <TouchableOpacity onPress={() =>this.props.onItem(this.props.iid)} style={{height:height/2, width:width/2, padding:1, borderWidth:2, borderColor:'#fff'}}>
        <Image
        style={{width:width/2, height:height/2}}
          source={{uri: this.state.data.uri}}
        />
        <View style={{position:'absolute', bottom:0, backgroundColor:'#fff9', width:width/2-2, marginLeft:1, paddingHorizontal:5}}>
          <Text numberOfLines={1} style={{fontSize:16,fontWeight:'bold', flex:1}}>{this.state.data.brand}</Text>
          <Text style={{marginTop:-2}} numberOfLines={1}>{this.state.data.caption}</Text>
          <Text style={{color:'#a00', marginRight:8}}>₹ {this.state.data.cost}</Text>
        </View>
      </TouchableOpacity>
    ):<View style={{height:height/2, width:width/2, alignItems:'center', justifyContent:'center'}}><ActivityIndicator /></View>;
  }
}
export default class Row extends React.Component {
  render() {
    return (
      <View style={{flexDirection:'row',height:height/2, width}}>
        <ItemHint onItem={this.props.onItem} iid={this.props.data[0]} /><ItemHint onItem={this.props.onItem} iid={this.props.data[1]} />
      </View>
    );
  }
}

// export default class app extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {urls:null};
//     this.fetchData();
//   }
//   fetchData = () => {
//     fetch('https://dressup-854e9.firebaseapp.com/items', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({key:'thaakkol'})
//     }).then(reply=>{console.log(JSON.stringify(reply));return reply.json();}).then(reply => {
//       if(reply && !reply.error) this.setState({urls:reply});
//       console.log('Reply', JSON.stringify(reply))
//     });
//   }
//   render() {
//     return this.state.urls?(
//       <ScrollView style={{flex:1}}>
//         {/*<Row data={['ammachan@gmail%2Ecom_27ObA8Jw', 'ammachan@gmail%2Ecom_AP6Skv5f']} />*/}
//         {this.state.urls.map((item, index) => {
//           if(index%2===0){
//             return <Row data={[this.state.urls[index],this.state.urls[index+1]]} />;
//           }else return null;
//         })}
//       </ScrollView>
//     ):<View style={{flex:1, alignItems:'center', justifyContent:'center'}}><ActivityIndicator /></View>;
//   }
// }