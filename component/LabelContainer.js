import { StatusBar } from 'expo-status-bar';
import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView } from 'react-native';

export default class LabelContainer extends React.Component {
  
   labelContainerStyle=styles.labelContainer;
   labelStyle=styles.label;
    constructor(props) {
      
      super(props);

    }
    render() {
     // alert(this.props.headerBackgroundColor);
      if(this.props.labelBackgroundColor!="")
      this.labelContainerStyle=[styles.labelContainer,{backgroundColor:this.props.labelBackgroundColor}];

      if(this.props.borderColor!=""){
       // alert("color "+this.props.borderColor);
      this.labelContainerStyle=[this.labelContainerStyle,{borderColor:this.props.borderColor}];
      }

      if(this.props.headerBackgroundColor!="")
      this.labelStyle=[styles.label,{backgroundColor:this.props.headerBackgroundColor}];

      


      return (
        <View style={this.labelContainerStyle} ref={node => this.node = node}>
        <Text style={this.labelStyle}>  {this.props.label}  </Text>
          {this.props.children}
          </View>
      );
    }
  }
  
 

const styles = StyleSheet.create({
      labelContainer: {
        paddingHorizontal: 0,
       // backgroundColor: '#9BEBCC',
        borderColor:'black',
        margin:10,
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',     
      },
      errorLabelContainer: {
        paddingHorizontal: 0,
       // backgroundColor: '#9BEBCC',
        borderColor:'red',
        margin:5,
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',     
      },
      label: {
        fontFamily: 'Roboto',
        fontWeight:'400',
        fontSize: '12px',
        lineHeight:'16px',
        fontStyle:'regular',
        top:-8,
        left:10,
        zIndex:2,
        position: 'absolute',
        //backgroundColor: parent.backgroundColor,
     },
     
  });
  