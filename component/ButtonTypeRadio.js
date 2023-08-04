import { StatusBar } from 'expo-status-bar';

import React from 'react';

import {  Text, TouchableOpacity } from 'react-native';


const ButtonTypeRadio=(props)=>{
    const {style,item,handleClick,...restOfProps}={...props}
    //alert(data);
    return(
            <TouchableOpacity onPress={()=>handleClick(item)} ><Text  style={style} {...restOfProps}>{ item.item}&nbsp;</Text>
            </TouchableOpacity>
    );
}


export default ButtonTypeRadio;