import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import GlobalStyles from '../constant/GlobalStyles';

//import { Camera, CameraType } from 'expo-camera';

export default function UploadImage(props) {
  const [image, setImage] = useState(null);
  //const [type, setType] = useState(CameraType.back);
  //const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    checkForCameraRollPermission()
  }, []);
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const uploadImage= async()=>{
    //alert("upload Image");
    props.onUpload();
  }
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    //console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.uri);
    }
  };
  const takeCapture = async () => {
    let _image =  ImagePicker.launchCameraAsync();
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.uri);
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
               <TouchableOpacity onPress={uploadImage} style={imageUploaderStyles.uploadBtn} >
              <Text><br/></Text> 
               <Text style={[{...GlobalStyles.button,...GlobalStyles.backGroundVeryLightGreen}]}>Upload Image</Text>    
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
        justifyContent:'center'
    }
})