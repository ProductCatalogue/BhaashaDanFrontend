import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import GlobalStyles from '../constant/GlobalStyles';
import axios from "axios";
//import ImgToBase64 from 'react-native-image-base64';

//import { Camera, CameraType } from 'expo-camera';

export default function UploadImage(props) {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  
  useEffect(() => {
    checkForCameraRollPermission()
  }, []);
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const  uploadImageToserver=async(props)=>{
 
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  const formData = new FormData();
  formData.append('paragraph_id',props.item.id);
  formData.append('image',base64Image);
 // const headers={Content-Type:"application/x-www-form-urlencoded"}
  //payload.image=
  axios({
    method: 'Post',
    url: 'api/paragraph/post/',
    data: formData,
    headers:axios.defaults.headers
  }).then(function (response) {
    //alert(JSON.stringify(response.data) );

    
    console.log(response.data);
    
    })
    .catch(function (error) {
       
      console.log(error);
      //self.setState({isLoading:false,refreshing:false});
      alert("API call fails with error:"+error);
    });
    props.onUploadAction();
    //props.onPressAction();
  }
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4],
      base64:true,
      quality: 1,
    });
    //console.log(JSON.stringify(_image));
    if (!_image.canceled) {

      setImage(_image.assets[0].uri);
      setBase64Image(_image.assets[0].base64);
    }
  };
  const takeCapture = async () => {
    let _image =  ImagePicker.launchCameraAsync();
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.assets);
     // alert(_image);
    }
  };
  const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }else{
      console.log('Media Permissions are granted')
    }
};
  return (
    <View>
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                          <Text style={{fontSize:10}}><center>Image size should be between 100Kb - 5Mb</center></Text>
                            <Text>{image ? 'Edit' : 'Select'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                     
                    </View>
            </View>
               <TouchableOpacity
                onPress={()=>uploadImageToserver(props)} 
                disabled={image? false:true } 
                style={imageUploaderStyles.uploadBtn}>
              
               <Text style={[{...GlobalStyles.button,...GlobalStyles.backGroundVeryLightGreen,width:100}]}>Upload Image</Text> 
           </TouchableOpacity>
           </View>

  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        //elevation:2,
        height:120,
        width:100,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:5,
        overflow:'hidden',
        alignSelf:'center',
        justifyContent:'center',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        margin:10,
        

    }
})