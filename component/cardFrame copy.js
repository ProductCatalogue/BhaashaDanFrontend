import { StatusBar } from 'expo-status-bar';
import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,Button,UL,OL,Li,Image,TouchableOpacity,Dimensions } from 'react-native';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
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
            <ScrollView style={styles.cardFrameContainer} >
                <View style={styles.descriptionContainer}>
                <Text style={styles.frameTitle}>
                    {this.title}  
               
                </Text>
                <Text style={styles.frameText}  ellipsizeMode='tail' numberOfLines={9}>
                     
               {this.description}
               
                </Text>
                
                </View>
                
                {
                this.props.workType=="Uploaded"?
                
                <Image  style={styles.imageStyle} source={{uri:this.props.item.image}} />
                
                :
                <></>
                }
               </ScrollView> 
            
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
      //  overflow:'hidden',
      //  textOverflow:'hidden',
       
      // overflow:'hidden',
      // numberOfLines:9,
        //position:'relative',
        //top:0,
        //left:0,
    },
    cardFrameContainer:{
        backgroundColor:'white', 
        width:width*.3,
        height:height*.1,
        maxwidth: 400,
        minWidth:200,
        maxHeight:300,
        minHeight: 200,
       // flexWrap:'wrap',
      //  textOverflow:'',
        ellipsizeMode:'tail',
      // overflow:'hidden',
        margin:10,
       // position:'absolute',
        
    },
    profileEditButton:{
        color:'green',
    },
    buttonContainer:{
        width:200,
        height:175,
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
        fontSize:14,
       // flexWrap:'nowrap',
        //textOverflow:'ellipsis',
    },
    frameTitle:{
        //backgroundColor:'#0ccb7c',
        //borderRadius:5,
        textAlign:'center',
        padding:2,
        margin:2,
        color:'grey',
        fontSize:14,
        fontWeight:'500',
        textOverflow:'ellipsis',
    },
    titleText:{
        color:'green',
        fontSize:5,  
        width:30,
        alignSelf:'flex-start',
        flexWrap:'nowrap',
    },
    imageStyle:{
        backgroundColor:'grey',
        //borderRadius:5,
      //  textAlign:'center',
        //padding:2,
        //margin:2,
        color:'green',
        fontSize:5,  
       width:100,
        height:100, 
      alignSelf:'flex-end',
      alignContent:'flex-end',
      verticalAlign:'bottom',
      overflow:'visible',
        top:'100px',
       //textAlign:'right',
       position:'absolute',
    },
    titleContainer:{
        backgroundColor:'grey',
        //borderRadius:5,
      //  textAlign:'center',
        //padding:2,
        //margin:2,
        
        color:'green',
        fontSize:5,  
      // width:100,
      // height:100, 
       // textAlignVertical:'bottom',
        alignContent:'flex-end',
       // alignItems:'flex-end',
       // resizeMode:'contain',
        alignSelf:'flex-end',
        alignItems:'flex-end',
       // justifyContent:'//#endregion',
       // flexWrap:'nowrap',
      //  position:'absolute',
      // top:'-100',
      //left:'200',
       // aspectRatio:1,
       // overflow:'hidden',
    }
    
    
    });