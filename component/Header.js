import { StatusBar } from 'expo-status-bar';
import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,Button,UL,OL,Li,Image,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


import Styles from '../constant/GlobalStyles'
const data=[
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },{
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },{
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },{
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    },
    {
        description:'1',
        id:'1'
    }
]


const Header=(props)=>{
       // alert('1');
       
        return(
            
                
                   
                   props.showSearch=="true"?
                    
                    <View style={localStyles.header}>
                    <TextInput name='Search' placeholder='Search' style={localStyles.searchField}/>
                    <View style={localStyles.iconStyle}><Ionicons name="search-outline" size={18} color="black" /></View>
                    </View>
                    
                    :
                    <View style={localStyles.header}></View>
                    
                
             
            
        );
    }
    export default Header


const localStyles= StyleSheet.create({
    header:{
        backgroundColor:'#0eca7e',
        justifyContent:'center',
        alignItems: 'center',
        height:'20',
        width:'100%',
        flexDirection:'row',
    },
    searchField:{
        width:'30%',
        backgroundColor:'white',
        borderRadius:10,
        margin:0,
    },
    iconStyle:{
        left:-22,
        position:'relative',
    },
    container: {
      
        height:'100%',
        width:'100%',
        flexDirection:'row',
        backgroundColor: '#9BEBCC',
        alignItems: 'center',
        justifyContent: 'Center',
        
        flexWrap:'wrap'
      }
});