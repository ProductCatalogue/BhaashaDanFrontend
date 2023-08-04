import { StatusBar } from 'expo-status-bar';
import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,Button,UL,OL,Li,Image,TouchableOpacity } from 'react-native';



let title="Amit Kumar";
let description="bjkhjk kljk hiuhji hjghj bjkhjk kljk hiuhjihjghj bjkhjk kljk hiuhjihjghj bjkhjk kljk hiuhjihjghj bjkhjk kljk hiuhjihjghj bjkhjk kljk hiuhjihjghj bjkhjk kljk hiuhjihjghj bjkhjk kljk hiuhji";
export default class CardFrame extends React.Component {
    
    constructor(props){
        super(props);
        //alert("card"+this.props.item.description);
        this.description=this.props.item.text;
        this.title=this.props.item.id;
    }
     renderLanguages ()  {
        return languages.map(name => <li>{name.item}</li>)
      }
    render(){
        return(
            <TouchableOpacity onPress={()=>this.props.onPress(this.props.item)}>
            <View style={styles.cardFrameContainer} >
                <View style={styles.descriptionContainer}>
                <Text style={styles.frameText}>
                 {this.title}   {this.description}
                </Text>
                </View>
                {
                this.props.workType=="Uploaded"?
                <Image style={styles.titleContainer} source={{uri:this.props.item.image}} />
                :
                <View/>
                }
                
            </View>
            </TouchableOpacity>
            
        );
    }
}

const styles=StyleSheet.create({
    profileStyle:{
        alignItems:'center',
        backgroundColor:'#d7f8eb', 
    },
    descriptionContainer:{
       // borderRadius: 120,
        borderColor:'red',
       // borderWidth:1,
       width: '100%',
       height: '100%',
        justifyContent:'center',
       // flexWrap:'nowrap',
        overflow:'hidden',
        textOverflow:'hidden'
    },
    cardFrameContainer:{
        backgroundColor:'white', 
        width: 150,
        height: 150,
       // flexWrap:'nowrap',
        textOverflow: 'ellipsis',
        overflow:'hidden',
        margin:10,
    },
    profileEditButton:{
        color:'green',
    },
    buttonContainer:{
        width:100,
        height:50,
        fontSize:5,
        borderRadius:5,
        
    },
    frameText:{
        //backgroundColor:'#0ccb7c',
        //borderRadius:5,
        textAlign:'center',
        padding:2,
        margin:2,
        color:'grey',
        fontSize:10,
        flexWrap:'nowrap',
        textOverflow:'ellipsis'
    },
    titleText:{
        color:'green',
        fontSize:5,  
        width:30,
        alignSelf:'flex-start',
        flexWrap:'nowrap',
    },
    titleContainer:{
        backgroundColor:'grey',
        //borderRadius:5,
        textAlign:'center',
        //padding:2,
        //margin:2,
        color:'green',
        fontSize:5,  
        width:50,
        height:50, 
        resizeMode:'contain',
        alignSelf:'flex-end',
        justifyContent:'flex-start',
        flexWrap:'nowrap',
        position:'absolute',
        top:100,
        left:100,
        aspectRatio:1,
        overflow:'hidden',
    }
    
    
    });