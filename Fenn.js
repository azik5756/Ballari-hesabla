import React, {Component} from 'react';
import {AsyncStorage,FlatList,Keyboard,TextInput,Alert,Dimensions,Platform, StyleSheet,Animated, Text, View,TouchableWithoutFeedback} from 'react-native';
import styles from '../style/Style';
import Button from 'react-native-button';
import con_base from './Dtbase';


var screena=Dimensions.get('window');
var koko=[];
var tuk=[];
var id;
var nac=1;
var check123=1;
var hamisi={
    name:'',
    seminar:'',
    seminar_kol:'',
    pilus:0,
    plus123:0,
    qulu:'',
    kolokvim13:0,
    serbest:0,
    qayib:0,
    devam:0,
    hour:0,
    labaro:0,
    balim:0
}
class FlatItem extends Component {

    constructor(props)
    {
      super(props);
      this.state={
          hour:'',
          hours:tuk
      };
    }
   
    render() {
      
      return (
        <View>
            <TouchableWithoutFeedback 
            onPress={()=>{
               check123=0;
               hamisi.name=this.props.item;
               fetch(con_base,{
                method: "POST",
                headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json"
                },
               body: JSON.stringify({
                 id:this.props.iden,
                 func:'urok',
                 name:hamisi.name,
                })})
              .then((response) => response.json())
              .then((responseJson) => {
                   hamisi.seminar=responseJson[1];
                   hamisi.qulu=responseJson[2];
                   hamisi.serbest=responseJson[3];
                   hamisi.qayib=responseJson[5];
                   hamisi.hour=responseJson[6];
                   hamisi.labaro=responseJson[4];
                   var tut=responseJson[1].split(',');
                   var s=0;
                   var bolme=tut.length-1;
                   for(var i=0;i<(tut.length-1);i++)
                   {
                       var l=parseInt(tut[i]);
                       s+=l;
                   }
                   s=s/bolme;
                   s=s.toFixed(1);

                   var tut=responseJson[2].split(',');
                   var s1=0;
                   var bolme=tut.length-1;
                   for(var i=0;i<(tut.length-1);i++)
                   {
                       var l=parseInt(tut[i]);
                       s1+=l;
                   }
                   s1=s1/bolme;
                   s1=s1.toFixed(1);
                  
                   if(responseJson[1])
                   {
                    hamisi.plus123=s;
                   }
                   else
                   {
                    hamisi.plus123=0;
                   }
                   if(responseJson[2])
                   {
                    hamisi.kolokvim13=s1;
                   }
                   else
                   {
                    hamisi.kolokvim13=0;
                   }
                   if(responseJson[6]!=0)
                   {
                    var brt=responseJson[6]-responseJson[5];
                    hamisi.devam=brt/responseJson[6]*10;
                    hamisi.devam=hamisi.devam.toFixed(1);
                   }
                   else
                   {
                       hamisi.devam=0;
                   }
                   
                   hamisi.seminar_kol=responseJson[2];
                  })
              .catch((error) =>{
                alert('Aye bazani yandir!!!');
              });
              
     
            }
            
        }
            >
        <View style={styles.flat_block}>
            <Text style={styles.flat_text}>{this.props.item+'-'+tuk[this.props.index]}</Text>
            <TextInput 
            placeholder='hours'
            placeholderTextColor='#558FDB'
            style={styles.hour_input}
            maxLength={3}
            onFocus={()=>{
            nac=0;
            }}
            onBlur={()=>{
                nac=1;
            }}
            onChangeText={(text)=>{
                tuk[this.props.index]=text;
                this.setState({hour:text,hours:tuk});
                fetch(con_base,{
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify({
         id:id,
         func:'hour',
         lesson:this.props.item,
         hour:text
        })})
      .then((response) => response.json())
      .then((responseJson) => {
          
          })
      .catch((error) =>{
        alert('Aye bazani yandir!!!');
      });
        
            }}
            value={this.state.hour}
            />
        </View>
        </TouchableWithoutFeedback>
        <View style={styles.flat_hett}></View>
   
        </View>
      );
    }
  }


export default class Fenn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rows:['kioa'],
        lesson_name:'',
        nomre:0,
        check1:true,
        margot:screena.height*.05,
        fennblock:screena.width,
        dersin_adi:'',
        ders_seminar:'',
        ders_kollok:'',
        semi_plus:'',
        kol:null,
        koli_plus:'',
        kolik_12:0,
        serbest:0,
        qayibl:0,
        debami:0,
        labart:0,
        ball:0
    };
    var todo=(kaka)=>
    {
        if(nac==0)
        {
            this.setState({rows:koko,margot:screena.height*-.18});
        }
        else
        {
            this.setState({rows:koko,margot:screena.height*.05});

        }
        if(check123==0)
        {
            if(hamisi.hour==0)
            {
                var lakomka=parseInt(this.state.serbest)+parseInt(this.state.labart)+parseInt(this.state.kol)+parseInt(this.state.kolik_12);
            }
            else
            {
                var lakomka=parseInt(this.state.serbest)+parseInt(this.state.labart)+parseInt(this.state.kol)+parseInt(this.state.kolik_12)+parseInt(this.state.debami);
            }
            this.setState({fennblock:0,dersin_adi:hamisi.name,
                ders_seminar:hamisi.seminar,kol:hamisi.plus123,
                ders_kollok:hamisi.qulu,kolik_12:hamisi.kolokvim13,
                serbest:hamisi.serbest,qayibl:hamisi.qayib,
                debami:hamisi.devam,labart:hamisi.labaro,ball:lakomka
            });
        }
        if(check123==1)
        {
            this.setState({fennblock:screena.width});
        }
    }
    setInterval(todo,500);
   
}


  love=(na,saa)=>
  {
   
      koko=na;
      tuk=saa;
  }
  
  check09=()=>
  {
      this.plus12('plus');
  }

  check10=()=>
  {
      this.plus12('minu');
  }
  check11=()=>
  {
      this.plus12('kol');
  }

  check12=()=>
  {
      this.plus12('kminu');
  }
  check13=()=>
  {
      this.plus12('sam_p');
  }

  check14=()=>
  {
      this.plus12('sam_m');
  }
  check6a=()=>
  {
      this.plus12('qay_p');
  }

  check6b=()=>
  {
      this.plus12('qay_m');
  }
  check7a=()=>
  {
      this.plus12('lab_p');
  }

  check7b=()=>
  {
      this.plus12('lab_m');
  }
  plus12(type)
  { 
        if(type=='plus'){
   if(this.state.semi_plus)
   {
    var sem_qiy=this.state.ders_seminar+this.state.semi_plus+',';
   }
   else
   {
    var sem_qiy=this.state.ders_seminar ; 
   }
    var kol_qiy=this.state.ders_kollok;
    var obj={
        id:this.props.id,
        func:'change',
        lesson:this.state.dersin_adi,
        seminar:sem_qiy,
        kollokvium:this.state.ders_kollok,
        serbest:this.state.serbest,
        labar:this.state.labart,
        qayiblar:this.state.qayibl
       };
}
    if(type=='minu')
    {
        var sem_qiy=this.state.ders_seminar;
        var kol_qiy=this.state.ders_kollok;
        var tutu=sem_qiy.split(',');
        for(var i=0;i<(tutu.length-1);i++)
        {
            if(parseInt(tutu[i])==parseInt(this.state.semi_plus))
            {
                tutu.splice(i,1);
                break;
            }

        }
        sem_qiy=tutu.toString();
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:sem_qiy,
            kollokvium:this.state.ders_kollok,
            serbest:this.state.serbest,
            labar:this.state.labart,
            qayiblar:this.state.qayibl
           };
      
   

    }
    if(type=='kol')
    {
        if(this.state.koli_plus)
   {
        var kol_qiy=this.state.ders_kollok+this.state.koli_plus+',';
   }  
   else
   {
    var kol_qiy=this.state.ders_kollok;
   } 
        hamisi.qulu=kol_qiy;
        var sem_qiy=this.state.ders_seminar;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:this.state.serbest,
            labar:this.state.labart,
            qayiblar:this.state.qayibl
           };
    }
    if(type=='kminu')
    {
        var kol_qiy=this.state.ders_kollok;
        var tutu=kol_qiy.split(',');
        for(var i=0;i<(tutu.length-1);i++)
        {
            if(parseInt(tutu[i])==parseInt(this.state.koli_plus))
            {
                tutu.splice(i,1);
                break;
            }

        }
        kol_qiy=tutu.toString();
        hamisi.qulu=kol_qiy;
        var sem_qiy=this.state.ders_seminar;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:this.state.serbest,
            labar:this.state.labart,
            qayiblar:this.state.qayibl
           };
    }
    if(type=='sam_p')
    {
        var one=this.state.serbest;
        one=parseInt(one);
        one=one+1;
        hamisi.serbest=one;
        var sem_qiy=this.state.ders_seminar;
        var kol_qiy=this.state.ders_kollok;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:one,
            labar:this.state.labart,
            qayiblar:this.state.qayibl
           };

    }
    if(type=='sam_m')
    {
        var one=this.state.serbest;
        one=parseInt(one);
        one=one-1;
        hamisi.serbest=one;
        var sem_qiy=this.state.ders_seminar;
        var kol_qiy=this.state.ders_kollok;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:one,
            labar:this.state.labart,
            qayiblar:this.state.qayibl
           };

    }
    if(type=='qay_p')
    {
        var one=this.state.qayibl;
        one=parseInt(one);
        one=one+1;
        hamisi.qayib=one;
        if(hamisi.hour!=0)
        {
        var brt=hamisi.hour-one;
        hamisi.devam=brt/hamisi.hour*10;
        hamisi.devam=hamisi.devam.toFixed(1);
        }
        var sem_qiy=this.state.ders_seminar;
        var kol_qiy=this.state.ders_kollok;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:this.state.serbest,
            labar:this.state.labart,
            qayiblar:one
           };

    }
    if(type=='qay_m')
    {
        var one=this.state.qayibl;
        one=parseInt(one);
        one=one-1;
        hamisi.qayib=one;
        if(hamisi.hour!=0)
        {
        var brt=hamisi.hour-one;
        hamisi.devam=brt/hamisi.hour*10;
        hamisi.devam=hamisi.devam.toFixed(1);
        }
        
        var sem_qiy=this.state.ders_seminar;
        var kol_qiy=this.state.ders_kollok;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:this.state.serbest,
            labar:this.state.labart,
            qayiblar:one
           };

    }
    if(type=='lab_p')
    {
        var one=this.state.labart;
        one=parseInt(one);
        one=one+1;
        hamisi.labaro=one;
        var sem_qiy=this.state.ders_seminar;
        var kol_qiy=this.state.ders_kollok;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:this.state.serbest,
            labar:one,
            qayiblar:this.state.qayibl
           };

    }
    if(type=='lab_m')
    {
        var one=this.state.labart;
        one=parseInt(one);
        one=one-1;
        hamisi.labaro=one;
        var sem_qiy=this.state.ders_seminar;
        var kol_qiy=this.state.ders_kollok;
        var obj={
            id:this.props.id,
            func:'change',
            lesson:this.state.dersin_adi,
            seminar:this.state.ders_seminar,
            kollokvium:kol_qiy,
            serbest:this.state.serbest,
            labar:one,
            qayiblar:this.state.qayibl
           };

    }
    hamisi.seminar=sem_qiy;
    if(sem_qiy!=0)
    {
    var tut=sem_qiy.split(',');
    var s=0;
    var bolme=tut.length-1;
    for(var i=0;i<(tut.length-1);i++)
    {
        var l=parseInt(tut[i]);
        s+=l;
    }
    s=s/bolme;
    s=s.toFixed(1);
    hamisi.plus123=s;
    }

    if(kol_qiy!=0)
    {
    tut=kol_qiy.split(',');
    s=0;
    bolme=tut.length-1;
    for(var i=0;i<(tut.length-1);i++)
    {
        var l=parseInt(tut[i]);
        s+=l;
    }
    s=s/bolme;
    s=s.toFixed(1);
    hamisi.kolokvim13=s;
    }
    fetch(con_base,{
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify(obj)})
      .then((response) => response.json())
      .then((responseJson) => {
          
          })
      .catch((error) =>{
        alert('Aye bazani yandir!!!');
      })
    
  }


  add_element=()=>
  {
        let rows_a=[];
        if(this.state.rows.length>0)
        {
            this.state.rows.map((r, i) => {
                rows_a.push(r);
            });
        }
        rows_a.push(this.state.lesson_name);

        fetch(con_base,{
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify({
         id:this.state.nomre,
         func:'lesson',
         lesson:this.state.lesson_name
        })})
      .then((response) => response.json())
      .then((responseJson) => {
          
          })
      .catch((error) =>{
        alert('Aye bazani yandir!!!');
      });

       koko=rows_a;
       tuk.push(0);
this.setState({rows:koko,lesson_name:''});
  }
  render() {
        let rows=this.state.rows;   
        id=this.props.id; 
    return (
        <View>
      <View style={styles.profile_block}>
        <View style={styles.profile_txt}>
            <Text style={styles.name}>{this.props.name}</Text>
            <Text style={styles.surname}>{this.props.surname}</Text>
        </View>
        <View style={styles.exit_block}>
            <Button
                style={styles.exit_btn}
                onPress={()=>
                {
                    this.props.kop.bomba();
                }}
                >Exit</Button>
        </View>
    </View>
    <View style={styles.lessoni}>
        <TextInput
        style={styles.lesson_name}
        placeholder='Enter the lesson name'
        placeholderTextColor='#558FDB'
        onChangeText={(text)=>{this.setState({lesson_name:text,nomre:this.props.id})}}
        value={this.state.lesson_name}
        />
        <Button style={styles.plus_btn} 
        onPress={this.add_element}>+</Button>
    </View>
    <View style={{alignItems:'center',width:screena.width,height:screena.height*.6,marginTop:this.state.margot}}>
    <FlatList
        data={rows}
        renderItem={({item,index})=>
            <FlatItem anime={this._fennblock}  item={item} index={index} parentflatsys={this} iden={this.props.id}></FlatItem>
            
    }
        >

        </FlatList>
        </View>
        <View style={{
              position:"absolute",
              width:screena.width,
              height:screena.height,
              top:0,
              left:this.state.fennblock,
              zIndex:3000,
              backgroundColor:"#5828B0",
              alignItems:'center'
        }}>
            <View style={styles.sub_fenn}>
              <Text style={styles.sub_fenn_txt}>{this.state.dersin_adi}</Text>
       
            </View>
            <View 
            style={styles.lesson_subblock}>
               <View 
               style={{flexDirection:"row",height:screena.height*.055,}}
               >
                <Text   style={{
                  fontSize:20,
                  color:"#fff",
                  fontFamily:'Robot'
              }}>Seminar - {this.state.kol}</Text>
              <Button style={styles.btn21}
              onPress={this.check09}>+</Button>
              <TextInput 
              onChangeText={(text)=>{this.setState({semi_plus:text})}}
              maxLength={2}
              keyboardType='numeric'
              style={styles.input102}
              />
              <Button style={styles.btn22} onPress={this.check10}>-</Button>
              </View>
              
            </View>
            <View 
            style={styles.lesson_subblock}>
               <View 
               style={{flexDirection:"row",height:screena.height*.055,}}
               >
                <Text   style={{
                  fontSize:20,
                  color:"#fff",
                  fontFamily:'Robot'
              }}>Kollokvium - {this.state.kolik_12}</Text>
              <Button style={styles.btn31} onPress={this.check11}>+</Button>
              <TextInput
              maxLength={2}
              style={styles.input102}
              keyboardType='numeric'
              onChangeText={(text)=>{this.setState({koli_plus:text})}}
              />
              <Button style={styles.btn22} onPress={this.check12}>-</Button>
              </View>
              
            </View>
            <View 
            style={styles.lesson_subblock}>
               <View 
               style={{flexDirection:"row",height:screena.height*.055,}}
               >
                <Text   style={{
                  fontSize:20,
                  color:"#fff",
                  fontFamily:'Robot'
              }}>Serbest isi  - {this.state.serbest}</Text>
              <Button style={styles.btn45} onPress={this.check13}>+</Button>
              <Button style={styles.btn32} onPress={this.check14}>-</Button>
              </View>
              
            </View>

            <View 
            style={styles.lesson_subblock}>
               <View 
               style={{flexDirection:"row",height:screena.height*.055,}}
               >
                <Text   style={{
                  fontSize:20,
                  color:"#fff",
                  fontFamily:'Robot'
              }}>Labaratoriya isi - {this.state.labart}</Text>
              <Button style={styles.btn41} onPress={this.check7a}>+</Button>
              <Button style={styles.btn32} onPress={this.check7b}>-</Button>
              </View>
              
            </View>

             <View 
            style={styles.lesson_subblock}>
               <View 
               style={{flexDirection:"row",height:screena.height*.055,}}
               >
                <Text   style={{
                  fontSize:20,
                  color:"#fff",
                  fontFamily:'Robot'
              }}>Qayiblarim  - {this.state.qayibl}</Text>
              <Button style={styles.btn45} onPress={this.check6a}>+</Button>
              <Button style={styles.btn32} onPress={this.check6b}>-</Button>
              </View>
              
            </View>

            <View 
            style={styles.lesson_subblock}>
              
                <Text   style={{
                  fontSize:20,
                  color:"#fff",
                  fontFamily:'Robot'
              }}>Devamiyyet  - {this.state.debami}</Text>
             <Button
             style={{
                 marginLeft: screena.width*.24,
                 color:"#00E104"
             }}
             onPress={
                ()=>{
                    check123=1;
                }
             }
             >
                 GoToBack
             </Button>
              
            </View>

            <View 
            style={styles.subblock123}>
              
                <Text   style={{
                  fontSize:20,
                  color:"#fff",
                  fontFamily:'Robot'
              }}>Yekun bal - {this.state.ball}</Text>
        
              
            </View>
        </View>
    </View>
    );
  }
}
