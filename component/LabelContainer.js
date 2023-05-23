import { StatusBar } from 'expo-status-bar';
import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView } from 'react-native';

export default class LabelContainer extends React.Component {
   labelContainerStyle=styles.labelContainer;
   labelStyle=styles.label;
    constructor(props) {
      super(props);
      if(this.props.labelBackgroundColor!="")
      this.labelContainerStyle=[styles.labelContainer,{backgroundColor:this.props.labelBackgroundColor}];

      if(this.props.borderColor!="")
      this.labelContainerStyle=[this.labelContainerStyle,{borderColor:this.props.borderColor}];

      if(this.props.headerBackgroundColor!="")
      this.labelStyle=[styles.label,{backgroundColor:this.props.headerBackgroundColor}];
    }
    render() {
      return (
        <View style={this.labelContainerStyle}>
        <Text style={this.labelStyle}>  {this.props.label}  </Text>
          {this.props.children}
          </View>
      );
    }
  }
  
 

const styles = StyleSheet.create({
      labelContainer: {
        paddingHorizontal: 0,
        backgroundColor: '#9BEBCC',
        borderColor:'black',
        margin:5,
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',     
      },
      label: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 12,
        top:-8,
        left:10,
        position: 'absolute',
        backgroundColor: '#9BEBCC',
     },
     
  });
  