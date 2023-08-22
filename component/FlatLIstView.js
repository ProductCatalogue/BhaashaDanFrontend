import { StatusBar } from 'expo-status-bar';
import React,{useLayoutEffect} from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal, FlatList, ActivityIndicator,SafeAreaView,Dimensions} from 'react-native';
import axios from "axios";
//import { useInfiniteQuery } from 'react-query';

import CardFrame from './cardFrame';
import Styles from '../constant/GlobalStyles'
import Header from './Header';
import Profile from './Profile';
import ButtonTypeRadio from './ButtonTypeRadio';
import ModalView from './ModalView';

import Colors from '../constant/color'

const FlatListView=(props)=>{
    return(<FlatList
                       {...props}
                      // style={{width:'100%',flexGrow:1}}
                       //onMomentumScrollBegin={() => {this.onEndReachedCalledDuringMomentum = false;}}
                       />
    )
}

export default FlatListView