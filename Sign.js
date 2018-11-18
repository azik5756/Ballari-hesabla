import React, {Component} from 'react';
import {Keyboard,TextInput,Alert,Dimensions,Platform, StyleSheet,Animated, Text, View,TouchableWithoutFeedback} from 'react-native';
import styles from '../style/Style';
import Button from 'react-native-button';
import con_base from './Dtbase';

var screena=Dimensions.get('window');


export default class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = {
        marginTopada:0,
        gorsenir:styles.signblock,
        name:"",
        surname:"",
        email:"",
        password:"",
        ustinput:0,
        check:0,
        gi:23
    };
  }
  componentWillMount()
  {

    this.kebshow=Keyboard.addListener('keyboardDidShow',()=>{
      if(this.state.ustinput==0)
      {
        this.setState({
           marginTopada:screena.height*-.48,
           gorsenir:styles.adsoyadgiz
        }); 
      }
     });
     this.gizlen=Keyboard.addListener('keyboardDidHide',()=>{
      if(this.state.ustinput==0)
      { 
      this.setState({
           marginTopada:0,
           gorsenir:styles.signblock
        });
      } 
     });
  }
  addtobase=()=>
  {
    fetch(con_base,{
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify({
       name:this.state.name,
       surname:this.state.surname,
       email:this.state.email,
       password:this.state.password,
       func:'reg',
       vay:''
      })})
    .then((response) => response.json())
    .then((responseJson) => {
        alert(responseJson);
        this.setState({has:'1'});

    })
    .catch((error) =>{
      alert('suka iwde');
    });
  }
  componentWillUnmount()
  {
      this.kebshow.remove();
      this.gizlen.remove();
  }
  render() {
    return (
        <View style={{width:screena.width,alignItems:"center",marginTop:this.state.marginTopada}}>

        <View style={this.state.gorsenir}>
           <TextInput
           style={styles.inputname}
           placeholder='First Name *'
           placeholderTextColor="#98A1AA"
           onFocus={()=>{this.setState({ustinput:1})}}
           onChangeText={(text)=>{this.setState({name:text})}}
           value={this.state.name}
           />
           <TextInput
           style={styles.inputname}
           placeholder='Last Name *'
           placeholderTextColor="#98A1AA"
           onFocus={()=>{this.setState({ustinput:1})}}
           onChangeText={(text)=>{this.setState({surname:text})}}
           />
        </View>
        <TextInput
           style={styles.inputemail}
           placeholder='Email Address *'
           placeholderTextColor="#98A1AA"
           onFocus={()=>{this.setState({ustinput:0})}}
           onChangeText={(text)=>{this.setState({email:text})}}
           keyboardType='email-address'
           />
            <TextInput
           style={styles.inputemail}
           placeholder='Set A Password *'
           placeholderTextColor="#98A1AA"
           onFocus={()=>{this.setState({ustinput:0})}}
           onChangeText={(text)=>{this.setState({password:text})}}
           secureTextEntry={true}
           />
           <Button 
           onPress={this.addtobase}
           style={styles.signbtn}>GET STARTED</Button>
        </View>
    );
  }
}
