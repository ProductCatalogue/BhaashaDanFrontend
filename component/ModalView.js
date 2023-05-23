import React, { createRef } from 'react';
import react, { Component } from 'react';
import CardFrame from './cardFrame';
import {  View,Modal,Text, StyleSheet, SafeAreaView,Image, Button,TouchableOpacity,ScrollView} from 'react-native';
import UploadImage from './ImagePickerCamera'
import Styles from '../constant/GlobalStyles'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import Colors from '../constant/color';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
//import {VisionCamera} from 'react-native-vision-camera'
//import {launchImageLibrary} from 'react-native-image-picker'
//import {v} from 'react-native-vision-camera'


//const Colors.HomeColor='#effff9';
//const Colors.dashboardRow2Color='#0ccb7c';



                        const ModalView=(props)=>{
                          const leftZoomableViewRef=createRef(ReactNativeZoomableView);
                          const rightZoomableViewRef=createRef(ReactNativeZoomableView);
                            const {visible,item,onPressAction,workType,...restOfProp}=props;
                            
                             // alert(workType);
                        return(                  
                       <View style={modalViewStyle.modalContainer} >
                        
                        <View style={modalViewStyle.leftContainer}>
                        <View><Text>&nbsp;</Text></View>
                        <ReactNativeZoomableView
                        maxZoom={3}
                        minZoom={0.5}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        onZoomAfter={true}
                        ref={leftZoomableViewRef}
                        movementSensibility={0.5}
                        visualTouchFeedbackEnabled={false}
                        style={modalViewStyle.contentContainer}
                        >
                        
                        
                          <Text>
                        {item.description}vhgugjhgh
                        </Text>
                        
                        
                        </ReactNativeZoomableView>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                          <Text onPress={() => leftZoomableViewRef.current.zoomBy(0.1)}>
                            <MaterialIcons name="zoom-in" size={24} color="black" />
                          </Text>
                          <Text onPress={() => leftZoomableViewRef.current.zoomBy(-0.1)}>
                            <MaterialIcons name="zoom-out" size={24} color="black" />
                          </Text></View>
                        </View>
                        <View style={modalViewStyle.rightContainer}>
                        
                          <View style={{alignSelf:'flex-end'}} >
                            <AntDesign name="close" size={24} color="black" onPress={()=>{onPressAction(item)}}/>
                          </View>
                       {
                       workType=="Uploaded"?
                       <ReactNativeZoomableView
                        maxZoom={3}
                        minZoom={0.5}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        onZoomAfter={true}
                        ref={rightZoomableViewRef}
                        movementSensibility={0.5}
                        visualTouchFeedbackEnabled={false}
                        
                        >
                       <Image  style={modalViewStyle.image} source={require("../assets/iiitnew.png")} />
                       </ReactNativeZoomableView>
                       
                       
                       :
                       <View style={modalViewStyle.rightContainer}>
                        <View><Text>&nbsp;</Text></View>
                       
                       <UploadImage onUpload={onPressAction}/>
                       <View><Text>&nbsp;</Text></View>
                       </View>
                       }
                       {
                       workType=="Uploaded"?
                       <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text onPress={() => rightZoomableViewRef.current.zoomBy(0.1)}>
                          <MaterialIcons name="zoom-in" size={24} color="black" />
                        </Text>
                        <Text onPress={() => rightZoomableViewRef.current.zoomBy(-0.1)}>
                          <MaterialIcons name="zoom-out" size={24} color="black" />
                        </Text></View>
                       :<View/>
                      }
                        </View>
                        </View>
                        );
                        }
export default ModalView;

const modalViewStyle=StyleSheet.create({
    modalContainer:{
        minHeight:250,
        minWidth:250,
        maxWidth:500,
        backgroundColor:"white",
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        flexDirection:'row',
        top:'10%',
        flexWrap:'wrap',
        scroll:'auto',
    },
    contentContainer:{
      borderWidth:1,
      minheight:'100',
      width:'100',
      resizeMode:'contain',
     // flexGrow:1,
    },
    leftContainer:{
        backgroundColor:Colors.HomeColor,
        flex:1,
        height:'100%',
        justifyContent:'space-between',
        flexGrow:1,
    },
    rightContainer:{
        backgroundColor:Colors.dashboardRow2Color,
        flex:1,
        height:'100%',
        justifyContent:'space-between',
        //flexGrow:1,
    },
    image:{
      height:60,
      width:120,
      justifyContent:'center',
      aspectRatio:1,
      alignItems:'center',
      alignContent:'center',
      alignSelf:'center',
      resizeMode:'contain',


    }
});