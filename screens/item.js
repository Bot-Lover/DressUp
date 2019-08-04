import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, PanResponder, Image, Dimensions, Animated} from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

class Header extends React.Component {
  render() {
    return (
      <View style={{height:50, width, backgroundColor:'#0000', flexDirection:'row', alignItems:'center', paddingHorizontal:15, position:'absolute',marginTop:Constants.statusBarHeight}}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Ionicons size={25} color='#fff' name='md-arrow-back' />
        </TouchableOpacity>
        <View style={{flex:1}} />
        <TouchableOpacity onPress={this.props.bookmark} style={{marginRight:30}}>
          <Ionicons size={25} color='#fff' name='ios-bookmark' />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.share}>
          <Ionicons size={25} color='#fff' name='md-share' />
        </TouchableOpacity>
      </View>
    );
  }
}
class Pics extends React.Component{
  constructor(props){
    super(props);
    this.state = {pos: new Animated.Value(0), mpos:0, tillNow:0, diff:0, current:0};
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({tillNow: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        var pos = this.state.mpos;
        const drag = gestureState.dx;
        pos += drag-this.state.tillNow
        pos = pos>0?0:pos;
        pos = pos<(1-this.props.pics.length)*width?(1-this.props.pics.length)*width:pos;
        this.setState({tillNow:drag,mpos:pos, diff:drag-this.state.tillNow});
        this.move(pos, 0);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // var current = Math.round((this.state.mpos/width)/2);
        // console.log(current, this.state.mpos, width);
        // current = this.state.diff<0?(current-1)*2 :(current+1)*2;
        // console.log(current, this.state.diff);
        // this.setState({current, mpos:current*width});
        // this.move(current*width, 100);
        //if(this.state.tillNow<0 && this.state.tillNow)
        var current = this.state.current;
        if(this.state.tillNow<0 && this.state.diff<0) current -= 1;
        else if(this.state.tillNow>0 && this.state.diff>0) current += 1;
        current = current<1-this.props.pics.length?1-this.props.pics.length:current;
        current = current>0?0:current;
        this.setState({current, mpos:current*width});
        this.move(current*width, 100);
        // this.move(-(this.props.pics.length-1)*width>0?-height+70:-Constants.statusBarHeight, 200);
        // this.setState({mpos:this.state.diff>0?-height+70:-Constants.statusBarHeight})
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
    this.move = (toValue, duration)=>{
      
      Animated.timing(                  // Animate over time
        this.state.pos,            // The animated value to drive
        {
          toValue,                   // Animate to opacity: 1 (opaque)
          duration,              // Make it take a while
        }
      ).start();
    };
  }
  bgc = (index, bg) => (index === -this.state.current?(bg?'#000':'#fff'):(bg?'#fff':'#000'));
  
  render(){
    return (
      <View>
        <Animated.View {...this._panResponder.panHandlers} style={{position:'absolute', top:0, left:this.state.pos, flexDirection:'row'}}>
          {this.props.pics.map((item, index)=><Image source={{uri:this.props.pics[index]}} style={{height:height-85-Constants.statusBarHeight, width}} />)}
        </Animated.View>
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:3, position:'absolute', top:height-Constants.statusBarHeight-120, width}}>
          {this.props.pics.map((item, i)=><View style={{backgroundColor:this.bgc(i, true), height:6, width:6, borderRadius:3, borderWidth:1, borderColor:this.bgc(i, false), marginHorizontal:3}} />)}
        </View>
      </View>
    );
  }
}
class Mover extends React.Component {
  constructor(props){
    super(props);
    this.state = {pos: new Animated.Value(-height+70), mpos:-height+70, tillNow:0, diff:0, lines:2};
    // this.state = {pos: new Animated.Value(-Constants.statusBarHeight), mpos:-height+70, tillNow:0, diff:0};
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({tillNow: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        var pos = this.state.mpos;
        const drag = gestureState.dy;
        pos -= drag-this.state.tillNow
        pos = pos>-Constants.statusBarHeight?-Constants.statusBarHeight:pos;
        pos = pos<-height+70?-height+70:pos;
        this.setState({tillNow:drag,mpos:pos, diff:drag-this.state.tillNow});
        this.move(pos, 0);
      },//
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.move(this.state.diff>0?-height+this.hgt:-Constants.statusBarHeight, 200);
        this.setState({mpos:this.state.diff>0?-height+this.hgt:-Constants.statusBarHeight, lines:this.state.diff>0?2:1})
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return false;
      },
    });
    this.move = (toValue, duration)=>{
      
      Animated.timing(                  // Animate over time
        this.state.pos,            // The animated value to drive
        {
          toValue,                   // Animate to opacity: 1 (opaque)
          duration,              // Make it take a while
        }
      ).start();
    };
  }
  componentDidMount(){
    setTimeout(() => this.caps.measure( (fx, fy, wdth, hgt, px, py) => {
      //this.seventy = height;
      this.hgt = hgt;
      this.setState({pos:new Animated.Value(-height+hgt), mpos:-height+hgt})
    }),0);
  }
  render() {
    return (
      <Animated.View style={{width, height, position:'absolute', bottom:this.state.pos}}>
        <View {...this._panResponder.panHandlers} style={{backgroundColor:'#eee', paddingHorizontal:15, paddingVertical:8, justifyContent:'center', borderBottomWidth:1, borderColor:'#f00'}} ref={ref=>this.caps=ref}>
            <Text numberOfLines={1} style={{color:'#000', fontSize:20, fontWeight:'bold'}}>{this.props.brand}</Text>
          <Text style={{fontSize:17}} numberOfLines={this.state.lines}>{this.props.caption}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:'#f00'}}>Rs. {this.props.cost}</Text>
          </View>
        </View>
        {this.props.children}
      </Animated.View>
    );
  }
}
class Saler extends React.Component {
  render() {
    return (
      <View style={{backgroundColor:'#eee', marginTop:5, justifyContent:'space-around', paddingHorizontal:10, paddingVertical:5, flexDirection:'row'}}>
        <TouchableOpacity style={{backgroundColor:'#eee', marginHorizontal:3, paddingHorizontal:15, paddingVertical:5, alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1, borderWidth:1, borderColor:'#008b8b'}}>
          <Ionicons size={25} name='ios-bookmark' color='#008b8b' /><View style={{flex:1}} />
          <Text style={{color:'#008b8b', fontSize:16}}>Add to Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#008b8b', flex:1, marginHorizontal:3, paddingHorizontal:15, paddingVertical:5, alignItems:'center', justifyContent:'center', flexDirection:'row', borderWidth:0}}>
          <Ionicons size={25} name='md-cart' color='#eee' /><View style={{flex:1}} />
          <Text style={{color:'#eee', fontSize:16}}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class Sizes extends React.Component {
  constructor(props){
    super(props);
  }
  sizes = () => {
    var boxes = [];
    var i = null;
    for(i in this.props.sizes){
      const data = this.props.sizes[i];
      const key = i;
      boxes.push((
        <TouchableOpacity style={{alignItems:'center'}} onPress={() =>this.props.onPopup(data)}>
          <View style={{width:50, height:50, marginHorizontal:5, marginTop:5, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', borderWidth:1, borderRadius:10}}>
            <Text style={{color:'#008b8b'}}>{key}</Text>
          </View>
          {data.left===0?<Ionicons size={20} color='#f00' name='ios-close' />:(data.left<5?<Text style={{color:'#990'}}>{data.left} Left</Text>:null)}
        </TouchableOpacity>
      ));
    }
    return boxes;
  }
  render(){
    return (
      <View>
        <View style={{backgroundColor:'#eee', marginTop:5, paddingHorizontal:10, paddingVertical:5}}>
          <Text style={{fontWeight:'bold'}}>Sizes</Text>
          <ScrollView horizontal style={{flexDirection:'row'}}>
              {this.sizes()}
          </ScrollView>
        </View>
      </View>
    );
  }
}
class SizeNotify extends React.Component {
  split = (data) => {
    return data.split(', ').map((item, index) => {
      return <Text>{item}</Text>
    })
  }
  render() {
    return this.props.popped?(
      <TouchableOpacity style={{position:'absolute', alignItems:'center', height, width, backgroundColor:'#0007'}} onPress={() => this.props.onBack()}>
        <View style={{backgroundColor:'#fff', paddingHorizontal:30, borderRadius:10,position:'absolute', top:height/2-80, width:width-40, paddingVertical:10, justifyContent:'center'}}>
          <Text style={{fontWeight:'bold'}}>Garment Measurements</Text>
          {this.split(this.props.popped.measure)}
          {this.props.popped.left>5?<Text style={{color:'#0d0', textAlign:'center'}}>In Stock</Text>:(this.props.popped.left===0?<Text style={{color:'#f00', textAlign:'center'}}>Stock empty</Text>:<Text style={{color:'#990', textAlign:'center'}}>{'Only '+this.props.popped.left+' left'}</Text>)}
        </View>
      </TouchableOpacity>
    ):null;
  }
}
class Specs extends React.Component {
  constructor(props){
    super(props);
    this.state = {limit:Object.keys(props.specs).length>8?7:Object.keys(props.specs).length, more:false};
  }
  specifications = () => {
    var specs = [];
    var index = 0;
    for(var i in this.props.specs) {
      if(index>=this.state.limit){
        specs.push((
          <TouchableOpacity onPress={()=>this.setState({limit:Object.keys(this.props.specs).length, more:true})} style={{flexDirection:'row', marginBottom:10}}>
            <Text style={{flex:1, color:'#009'}}>See More</Text>
          </TouchableOpacity>
        ));
        return specs;
      }
      index++;
      specs.push((
        <View style={{flexDirection:'row', marginBottom:10}}>
          <Text style={{width:150, color:'#666'}}>{i}</Text>
          <Text style={{color:'#666'}}>{this.props.specs[i]}</Text>
        </View>
      ));
    }
    if(this.state.more){
      specs.push((
        <TouchableOpacity onPress={()=>this.setState({limit:7, more:false})} style={{flexDirection:'row', marginBottom:10}}>
          <Text style={{flex:1, color:'#009'}}>See Less</Text>
        </TouchableOpacity>
      ));
    }
    return specs;
  }
  render() {
    return (
      <View style={{backgroundColor:'#eee', marginTop:5, paddingHorizontal:10, paddingVertical:5}}>
        <Text style={{fontWeight:'bold', marginBottom:10}}>Specifications</Text>
        {this.specifications()}
      </View>
    );
  }
}
class MnC extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  split = (data) => {
    return data.split('\\n').map((item, index)=> {
      console.log(item)
      return (<Text>{item+(index!==data.split('\\n').length-1?'\n':'')}</Text>);
    });
  }
  render() {
    return (
      <View style={{backgroundColor:'#eee', marginTop:5, paddingHorizontal:10, paddingVertical:10}}>
        <Text style={{fontWeight:'bold'}}>Material and Care</Text>
        <Text>{this.split(this.props.data)}</Text>
      </View>
    );
  }
}
const Details = ({data}) => {
  <View style={{backgroundColor:'#eee', marginTop:5, paddingHorizontal:10, paddingVertical:10}}>
    <Text style={{fontWeight:'bold'}}>Product Details</Text>
    <Text> {data}</Text>
  </View>
}
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {popped:null};
  }
  render() {
    return this.props.data?(
      <View style={{backgroundColor:'#008b8b', flex:1, paddingTop:Constants.statusBarHeight}}>
        <Pics count={0} pics={this.props.data.pics} />
        <Header onBack={this.props.onBack} bookmark={this.props.bookmark} share={this.props.share} />
        <Mover cost={this.props.data.cost} caption={this.props.data.caption} brand={this.props.data.brand}>
          <ScrollView style={{backgroundColor:'#fff', flex:1}}>
            <Saler />
            <Details data={this.props.data.details} />
            <Sizes sizes={this.props.data.sizes} onPopup={(popped) => this.setState({popped})} />
            <MnC data={this.props.data.materialncare} />
            <Specs specs={this.props.data.specifications} />
            <View style={{height:Constants.statusBarHeight+10}} />
          </ScrollView>
        </Mover>
        <SizeNotify popped={this.state.popped} onBack={()=>this.setState({popped:null})} />
      </View>
    ):<View style={{flex:1, backgroundColor:'#008b8b'}} />;
  }
}

export default class ItemView extends React.Component {
  constructor(props){
    super(props);
    this.state ={data:null};
    this.fetchData()
  }
  fetchData = () => {
    console.log(this.props.navigation.getParam('iid', "No maan"));
    fetch('https://dressup-854e9.firebaseapp.com/getItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key:this.props.navigation.getParam('iid', 'ammachan@gmail%2Ecom_27ObA8Jw')})
    }).then(reply=>reply.json()).then(reply => {
      if(reply && !reply.error) this.setState({data:reply});
    });
  }
  render() {
    return this.state.data?<Item data={this.state.data} onBack={() => this.props.navigation.goBack()} />:<View style={{flex:1, backgroundColor:'#008b8b'}} />;
  }
}

// export default class App extends React.Component {
//   render() {
//     return <ItemView iid="ammachan@gmail%2Ecom_27ObA8Jw" />;
//   }
// }