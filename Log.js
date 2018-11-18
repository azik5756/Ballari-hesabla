import React, {Component} from 'react';
import {AsyncStorage,Keyboard,TextInput,Alert,Dimensions,Platform, StyleSheet,Animated, Text, View,TouchableWithoutFeedback} from 'react-native';
import styles from '../style/Style';
import Button from 'react-native-button';
import Fenn from './Fenn';
import con_base from './Dtbase';
var screena=Dimensions.get('window');


export default class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        topik:screena.height,
        name:'',
        surname:'',
        id:'',
        fenler:[],
        saatlar:[]
    };
    var  champion=async () => {
        const value = await AsyncStorage.getItem('Kaka');
    
       
    }
    setTimeout(champion,10); 

  }
  _topik_val=new Animated.Value(screena.height);
  
  
  bomba=()=>
  {
    Animated.timing(this._topik_val,{
      toValue:screena.height
    }).start();
  }

  go_to_login=()=>
  {

    fetch(con_base,{
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify({
         email:this.state.email,
         password:this.state.password,
         func:'log',
        })})
      .then((response) => response.json())
      .then((responseJson) => {
           AsyncStorage.setItem('Kaka', responseJson[1]);
           if(responseJson[1]!=null)
           {
            Animated.timing(this._topik_val,{
              toValue:screena.height*-0.25
            }).start();
            this.setState({
              name:responseJson[1],
              surname:responseJson[2],
              id:responseJson[3],
              fenler:responseJson[4],
              saatlar:responseJson[5]  
            });
            let rio=new Fenn();
            rio.love(responseJson[4],responseJson[5]);
           
             
           }
           else
           {
             alert(responseJson[0]);
           }
          })
      .catch((error) =>{
        alert(con_base);
      });
  }
  
  render() {
    return (
        <View style={{width:screena.width,alignItems:"center"}}>
     
        <TextInput
           style={styles.inputemail}
           placeholder='Email Address *'
           placeholderTextColor="#98A1AA"
           onChangeText={(text)=>{this.setState({email:text})}}
           keyboardType='email-address'
           />
            <TextInput
           style={styles.inputemail}
           placeholder='Set A Password *'
           placeholderTextColor="#98A1AA"
           onChangeText={(text)=>{this.setState({password:text})}}
           secureTextEntry={true}
           />
             <Button 
           onPress={this.go_to_login}
           style={styles.signbtn}>Go To Login</Button>
           <Animated.View style={{
             position:'absolute',
             top:this._topik_val,
             width:screena.width,
             height:screena.height*1.2,
             backgroundColor:"#212738"
           }}>
              <Fenn saat={this.state.saatlar} like={this.state.fenler} name={this.state.name} id={this.state.id} surname={this.state.surname} kop={this}></Fenn>
           </Animated.View>
        </View>
    );
  }
}
