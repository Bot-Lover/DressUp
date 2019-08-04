import React from 'react';
import {ScrollView, View, Text, ActivityIndicator} from 'react-native';
import Row from '../components/itemHint';

// const data = [{uri:'http://bongdenledthongminh.com/wp-content/uploads/2019/05/11473928353466-Roadster-Men-Black-Regular-Fit-Checked-Casual-Shirt-4501473928353310-1.jpg', caption:"Men's Casual Checks", cost:884, brand:'Roadster'},{uri:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/1265399/2018/3/30/11522394285273-Highlander-Blue-Slim-Washed-Denim-Casual-Shirt-5701522394285017-1.jpg', caption:"Men Regular Fit Casual Shirt", cost:599, brand:'Highlander'},{uri:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/4451367/2019/5/10/6334e0cb-9112-4c79-93ab-4c97698d9b891557463707108-Roadster-Fast-and-Furious-Men-Blue-Slim-Fit-Mid-Rise-Low-Dis-1.jpg', caption:"Men Slim Fit Jeans", cost:1049, brand:'Roadster Fast&Furius'},{uri:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/7228316/2019/1/30/4d826b89-0119-4c89-8861-4a8cea8ed0691548844555754-DILLINGER-Men-Navy-Blue-Colourblocked-Round-Neck-T-shirt-161-1.jpg', caption:"Color Blocked Round Neck TShirts Navy Blue", cost:359, brand:'DILLINGER'},{uri:'http://bongdenledthongminh.com/wp-content/uploads/2019/05/11473928353466-Roadster-Men-Black-Regular-Fit-Checked-Casual-Shirt-4501473928353310-1.jpg', caption:"Men's Casual Checks", cost:884, brand:'Roadster'},{uri:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/1265399/2018/3/30/11522394285273-Highlander-Blue-Slim-Washed-Denim-Casual-Shirt-5701522394285017-1.jpg', caption:"Men Regular Fit Casual Shirt", cost:599, brand:'Highlander'},{uri:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/4451367/2019/5/10/6334e0cb-9112-4c79-93ab-4c97698d9b891557463707108-Roadster-Fast-and-Furious-Men-Blue-Slim-Fit-Mid-Rise-Low-Dis-1.jpg', caption:"Men Slim Fit Jeans", cost:1049, brand:'Roadster Fast&Furius'},{uri:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/7228316/2019/1/30/4d826b89-0119-4c89-8861-4a8cea8ed0691548844555754-DILLINGER-Men-Navy-Blue-Colourblocked-Round-Neck-T-shirt-161-1.jpg', caption:"Color Blocked Round Neck TShirts Navy Blue", cost:359, brand:'DILLINGER'}];
// export default class app extends React.Component {
//   render() {
//     return (
//       <ScrollView style={{flex:1}}>
//         {data.map((item,index)=> {
//           if(index%2===0 && index!==data.length-1){
//             return <Row data={[data[index], data[index+1]]} />
//           }
//         })}
//       </ScrollView>
//     );
//   }
// }

export default class explore extends React.Component {
  constructor(props){
    super(props);
    this.state = {urls:null};
    this.fetchData();
  }
  fetchData = () => {
    fetch('https://dressup-854e9.firebaseapp.com/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key:'thaakkol'})
    }).then(reply=>{console.log(JSON.stringify(reply));return reply.json();}).then(reply => {
      if(reply && !reply.error) this.setState({urls:reply});
      console.log('Reply', JSON.stringify(reply))
    });
  }
  render() {
    return this.state.urls?(
      <ScrollView style={{flex:1}}>
        {/*<Row data={['ammachan@gmail%2Ecom_27ObA8Jw', 'ammachan@gmail%2Ecom_AP6Skv5f']} />*/}
        {this.state.urls.map((item, index) => {
          if(index%2===0){
            //return <Row data={[this.state.urls[index],this.state.urls[index+1]]} onItem={this.props.screenProps.onItem} />;
            return <Row data={[this.state.urls[index],this.state.urls[index+1]]} onItem={(iid) =>this.props.navigation.navigate("Item", {iid})} />;
          }else return null;
        })}
      </ScrollView>
    ):<View style={{flex:1, alignItems:'center', justifyContent:'center'}}><ActivityIndicator /></View>;
  }
}