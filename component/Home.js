import React from 'react';
//import react, { Component } from 'react';
import {  View,Text,Image} from 'react-native';

import Styles from '../constant/GlobalStyles'

const Home=(props)=>{
    return(                     
          <View style={Styles.homeContainer} >
              <Image style={Styles.logo} source={require("../assets/iiitnew.png")} />
              <View style={Styles.homeContentContainer} >
                <View style={Styles.homeLeftContainer}>
                  <Text>
                    <h2>heading aaa</h2>
                    a iuhijs niojnjoj knioj onioj konin a iuhijs niojnjoj knioj onioj konin a iuhijs niojnjoj knioj onioj konin a iuhijs niojnjoj knioj onioj konin 
                    a iuhijs niojnjoj knioj onioj konin joniojn a iuhijs niojnjoj knioj onioj konin joniojna iuhijs niojnjoj knioj onioj konin joniojna iuhijs niojnjoj knioj onioj konin joniojn
                  </Text>
                </View>
                <View style={Styles.homeRightContainer}>
                  <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',alignSelf:'center'}}>
                      <iframe
                      src="https://www.youtube.com/embed/C0DPdy98e4c"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                      title="video"
                      /><br/>
                  </View>
                </View>
              </View>
              <View style={Styles.homeButtonContainer}>
                <Text style={[Styles.button,Styles.textWhite]} onPress={()=>handleSignIn({...props,"isCreate":false})}>Sign In</Text>
                <Text style={[Styles.button,Styles.textWhite]} onPress={()=>handleSignIn({...props,"isCreate":true})}>Register</Text>
              </View>
          </View>
        );                    
}

const handleSignIn=(props)=>{
  //alert("before");
  props.navigation.navigate('LoginOrRegister',{isCreate:props.isCreate});
  //alert("after");
}
export default Home;



