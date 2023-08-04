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
                            const {visible,item,onPressAction,onUploadAction,workType,...restOfProp}=props;
                            
                             // alert(item.id);
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
                        {item.text}
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
                       
                       <Image style={modalViewStyle.image} source={{uri:item.image}} />
                       </ReactNativeZoomableView>
                       
                       
                       :
                       <View style={modalViewStyle.rightContainer}>
                        <View><Text>&nbsp;</Text></View>
                       
                       <UploadImage item={item} onUploadAction={onUploadAction} onPressAction={onPressAction}/>
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

function uploadImageToserver(){
  let self=this;
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  const formData = new FormData();
  formData.append('paragraph_id',item.id);
  formData.append('image',);
  //payload.image=
  axios({
    method: 'Post',
    url: 'api/paragraph/post/',
    data: formData
  }).then(function (response) {
    //alert(response.data.results );
   // if(self.state.workType=='Pending'){
        self.itemToRender[worktype][lan].count=response.data.count;
        self.itemToRender[worktype][lan].pagenumber=self.itemToRender[worktype][lan].pagenumber+1;
       // alert("count "+self.itemToRender[worktype][lan].count);
        for(var i=0; i<response.data.results.length;i++)
            self.itemToRender[worktype][lan].items.push(response.data.results[i]);
   /* }
    else{
        self.uploadedTotalCount=response.data.count;
        self.uploadedPageNumber=self.uploadedPageNumber+1;
        alert("count "+self.uploadedPageNumber);
        for(var i=0; i<response.data.results.length;i++)
            self.uploadedItemToRender.push(response.data.results[i]);
    }*/
   // self.setState({pendingItemToRender:response.data.results});
   self.setState({isLoading:false,refreshing:false});
    //self.pendingItemToRender=response.data.results;
    console.log(response.data);
    })
    .catch(function (error) {
       // self.pageNumber=self.pageNumber-1;
      console.log(error);
      self.setState({isLoading:false,refreshing:false});
      alert(error);
    });
}
                        }

export default ModalView;

const modalViewStyle=StyleSheet.create({
    modalContainer:{
       // minHeight:250,
       // minWidth:250,
       // maxWidth:500,
       height:'75%',
       width:'75%',
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
      minheight:'75%',
      width:'75%',
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
      height:'100%',
      width:'100%',
      justifyContent:'center',
      aspectRatio:1,
      alignItems:'center',
      alignContent:'center',
      alignSelf:'center',
      resizeMode:'contain',


    }
});