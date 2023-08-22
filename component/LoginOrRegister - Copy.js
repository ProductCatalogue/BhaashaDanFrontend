import React from "react";
import {Text, View, TextInput, TouchableOpacity,Image } from 'react-native';

import {FormItem,Form} from 'react-native-form-validation';

import {validationComponent} from 'react-native-form-validator';




import CheckBox from "expo-checkbox";
import axios from "axios";
//import DatePicker from 'react-native-datepicker';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Formik } from "formik";


import "react-datepicker/dist/react-datepicker.css";

import LabelContainer from "./LabelContainer";
import SelectBox from './CustomSelect';

//import Logo from './Logo';

import styles from "../constant/GlobalStyles";
import Colors from "../constant/color";
import globalconstant from "../constant/globalvariables"

import * as yup from 'yup';


const formValidationSchema = yup.object().shape({
 username: yup
   .string()
   .email("Please enter a valid username")
   .required('Username is Required'),
password: yup
   .string()
   .required('password is Required'),
})

class LoginOrRegister extends validationComponent{
   create="";
   headerText="Sign in to Account";
   greetings="Hello, Friends!";
   message="Fill up information and start journey with us";
   stateLabel="Register";
   actionLabel="Login";
   rememberMe=false;
   
constructor(props){
  super(props);
  this.language_OPTIONS=globalconstant.language_OPTIONS;
  this.state = {
    username: '',
    password: '',
    first_name:'',
    last_name:'',
    mobile:'',
    confirmPassword: '',
    isCreate:'',
    language:[],
    rememberMe:false,
    Error1:"",
    formerrors:{error:false},
    
  };
  //props.navigation.navigate('Profile',{name:"Vineet Kumar"});
if(this.props.route && this.props.route.params && this.props.route.params.isCreate!=undefined && this.props.route.params.isCreate!=null)
{
    //alert("param exists");
    this.create=this.props.route.params.isCreate;
}
else
{
    //alert("param not exists "+props.isCreate);
    if(props.isCreate!=undefined && props.isCreate!=null )
        this.create=props.isCreate;
    else
        {
          this.create=false; 
          
        }
        //alert("param not exists "+this.create);
}

if(this.create==true)
  {
    this.actionLabel="Register";
    this.stateLabel="Login";
    this.greetings="Hello Again!";
    this.message="Welcome back, you've been missed";
    this.headerText="Register";
    this.state.isCreate=true;
  }
}
setCreate(){ 
  ////alert("create")
  if(this.create===true)
  {
    this.stateLabel="Register";
    this.actionLabel="Login"; 
    this.greetings="Hello, Friends!"; 
    this.message="Fill up information and start journey with us";  
    this.headerText="Sign in to Account";
  }
  else
  {
    this.actionLabel="Register";
    this.stateLabel="Login";
    this.greetings="Hello Again!";
    this.message="Welcome back, you've been missed";
    this.headerText="Register";
  }
 
    this.create=!this.create;
    this.setState({isCreate:this.create });

}
setDate(date){
  this.setState({ dob: date });
}
onUsernameChange(text) {
    this.setState({ username: text });
}
onMobileChange(text) {
  this.setState({ mobile: text });
}
onPasswordChange(text) {
    this.setState({ password: text });
}
onErrorChange(text) {
    this.setState({ Error1: text });
}
onConfirmPasswordChange(text) {
    this.setState({ confirmPassword: text });
}
onLastNameChange(text){
  this.setState({ last_name: text });
}
onFirstNameChange(text){
  this.setState({ first_name: text });
}
setDOB(dob){
  var date= new Date(dob.format('YYYY-MM-DD'));
  //alert("dob"+dob +"\ndate"+dayjs(date));
  this.setState({ dob: dob}); 
}
onLanguageChange(text) {
    this.setState( {language:[...this.state.language,text ]});
}
onLanguageDelete(text) {
    this.setState( {language:[...(this.state.language.filter(i=>(i.key!=text.key))) ]});
}
onRememberMeChange(text) {
 // ////alert(this.state.rememberMe);
  this.setState({ rememberMe: !this.state.rememberMe });
}
handleForgotPassword(){
	////alert("blank forgot password called");
}
validateForm(){

  this.validate({
    username: {minlength:3, maxlength:7, required: true}
  });
  /*
  this.state.formerrors={error:false};
  if(this.actionLabel!="Login"){

  }
  else{
    if(this.state.username==""){
      alert("inside");
      //const formError={...this.state.formerrors,username:"User name is mandatory"};
      this.state.formerrors.username="User name is mandatory";
      this.state.formerrors.error=true;
      alert("outside");
    }
    if(this.state.password==""){
      alert("inside");
      //const formError={...this.state.formerrors,username:"User name is mandatory"};
      this.state.formerrors.password="Password is mandatory";
      this.state.formerrors.error=true;
      alert("outside");
    }

      
  }
*/
  
}

handleRequest(){
    alert("handleRequest" + this.props);
	////alert("a");
  //let submitResults=this.form.validate();
  this.validateForm();
  if(this.state.formerrors.error){
this.setState({formerrors:this.state.formerrors});
    return;

  }
  
	//alert("username="+this.state.username);
	//alert("password="+this.state.password);
    if(this.actionLabel!="Login")
    {
	//alert("confirmPassword="+this.state.confirmPassword);
	//alert("rememberMe="+this.state.rememberMe);
	for(var i=0;i<this.state.language.length;i++){
    //alert("language="+this.state.language[i].item);
	}
    }
   // var express = require('express');
   /*
   var formdata = new FormData();
formdata.append("username", "guest");
formdata.append("password", "guest123");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://bhasha.iiit.ac.in/crowd/api/auth/", requestOptions)
  .then(response =>{ response.text();alert(response);})
  .then(result => console.log(result))
  .catch(error => {console.log('error', error); alert(error)});
   
//var cors = require('cors');
axios.post('http://bhasha.iiit.ac.in/crowd/api/auth', {
    username: 'guest',
    password: 'guest123'
  })
  .then(function (response) {
    console.log(response);
    alert(response);
  })
  .catch(function (error) {
    console.log(error);
    alert(error);
  });
*/
//alert(this.state.isCreate);
    const endpoint = this.state.isCreate==true ? 'api/auth/register/' : 'api/auth/';
    //alert(endpoint);
    const payload = { username: this.state.username, password: this.state.password } ;
    axios.defaults.baseURL = 'http://bhasha.iiit.ac.in/crowd/';
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    if (this.state.isCreate==true) {
      //payload.confirmPassword = this.state.confirmPassword;
      //payload.language = this.state.language;
      payload.first_name = this.state.first_name;
      payload.last_name = this.state.last_name;
      payload.mobile = this.state.mobile;
      payload.dob = this.state.dob.format("YYYY-MM-DD");
      //alert("dob"+this.state.dob);
      var lan="";
      for(var k=0;k<this.state.language.length;k++){
        //alert(this.state.language[k].id);
        if(k>0)
          lan=lan+","+this.state.language[k].key;
        else
          lan=this.state.language[k].key;
      }
      
      payload.language=lan;
    }
    //alert(payload.language);
   // axios.defaults.baseURL ='http://bhasha.iiit.ac.in/crowd/';
    //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
   /* alert('2'+axios);
    const headers = {
       // 'Content-Type': 'text/plain'
        'Content-Type':'application/x-www-form-urlencoded'
    };
    
    const instance = axios.create({
        baseURL: axios.defaults.baseURL,
        timeout: 1000,
        headers: axios.defaults.headers
      });
      */
     let self=this;
    axios({
        method: 'post',
        url: endpoint,
        data: payload
      }).then(function (response) {

        if(self.state.isCreate==true){
          self.state.password="";
          self.setCreate(false);
          
          return;
        }

        //alert(JSON.stringify(response.data));
        const { token,user} = response.data;
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        //alert("props"+JSON.stringify(self));
        //alert("new"+axios.defaults.headers.common.Authorization );
        console.log(response.data);
       /* const tempUser={
          name:user.first_name+" "+user.last_name,
          intro:user.dob,
          location: user.language,
          languages:[{id:"Hindi",item:"Hindi"},{id:"English",item:"English"}]
          }
          */
          const lan = user.language.split(',');
          user.languages=[];
          for(var i=0;i<lan.length;i++){
            var newLan={};
            newLan.key=lan[i];
            newLan.item=lan[i].charAt(0).toUpperCase() + lan[i].substr(1).toLowerCase();
            user.languages.push(newLan);
          }
         // var dob=new Date(user.dob);
         // user.dob=dayjs(dob);
         // alert("props"+self.props);
         // alert("navigation"+self.props.navigation);
         //var myHeaders = new Headers();
//myHeaders.append("Authorization", axios.defaults.headers.common.Authorization);
/*
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://bhasha.iiit.ac.in/crowd/api/paragraph/?language=hindi", requestOptions)
  .then(response => {response.text();alert(JSON.stringify(response))})
  .then(result => console.log(result))
  .catch(error => console.log('error', error));*/
          self.props.navigation.navigate('UserDashboard',{user:user});
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
      
      /*
    axios.post(endpoint, payload,headers).then((response) =>{
       // alert(response);
        //const { token} = response.data;
        alert(response.data);
        // We set the returned token as the default authorization header
       // axios.defaults.headers.common.Authorization = `Token ${token}`;
        // Navigate to the home screen
        alert("inside"+ axios.defaults.headers.common.Authorization);
        const tempUser={
            name:"Vineet1 Kumar",
            intro:"hjghj bjkhjk kljk hiuhji",
            location: "Hyderabad",
            languages:[{id:"Hindi",item:"Hindi"},{id:"English",item:"English"}]
            }
            
            this.props.navigation.navigate('UserDashboard',{user:tempUser});
            
      })
      .catch((error) =>{alert(error);console.log(error)});*/
      
/*
      var formdata = new FormData();
formdata.append("username", "guest");
formdata.append("password", "guest123");

var requestOptions = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
    
  },
  body: formdata,
  redirect: 'follow',
  mode : 'cors',
  credentials : "omit"
};


fetch("http://bhasha.iiit.ac.in/crowd/api/auth/", requestOptions)
  .then(response => {response.text(); alert(JSON.stringify(response.text()));})
  .then(result => {console.log(result); alert(result);})
  .catch(error => {console.log('error', error);alert("error "+error);});
      //alert('3'+this.state.Error1);
      
     */
}
  
renderLoginField(){
  return(
      <View>
        <FormItem isRequired={true}>
            <LabelContainer 
            label="Username" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={ this.state.formerrors.error && this.state.formerrors.username ? Colors.errorBorder : Colors.LoginBorderColor }
            >
            
            <TextInput 
            style={styles.loginTextInput}
			      placeholder="Username" 
			      name="username"
			      value={this.state.username} 
			      onChangeText={this.onUsernameChange.bind(this)}
            placeholderTextColor='grey'
			      />
            </LabelContainer>
           
            </FormItem>

            {this.state.formerrors.username ?(
                      <Text >{this.state.formerrors.username}</Text>
                    ):<></>}


            
            <LabelContainer 
            label="Password" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={ this.state.formerrors.error && this.state.formerrors.password ? Colors.errorBorder : Colors.LoginBorderColor }
            >
            <TextInput 
            style={styles.loginTextInput}
			placeholder="Password" 
            placeholderTextColor='grey'
			name="password"
			secureTextEntry="true"  
			value={this.state.password} 
			onChangeText={this.onPasswordChange.bind(this)}
			/>
            </LabelContainer>
            {this.state.formerrors.password ?(
                      <Text >{this.state.formerrors.password}</Text>
                    ):<></>}
       </View>
  );

}
renderCreateField(){
    if (this.create===true)
    return(
        <View >
            <LabelContainer 
            label="Confirm Password" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>
            <TextInput
            style={styles.loginTextInput}
			secureTextEntry="true"
			placeholder="Confirm Password" 
            placeholderTextColor='grey'
			name="confirmPassword"
			value={this.state.confirmPassword}
			onChangeText={this.onConfirmPasswordChange.bind(this)}
			/>
            </LabelContainer>

            <LabelContainer 
            label="First Name" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>
            <TextInput 
            style={styles.loginTextInput}
			placeholder="First Name" 
            placeholderTextColor='grey'
			name="first_name"
			value={this.state.first_name} 
			onChangeText={this.onFirstNameChange.bind(this)}
			/>
            </LabelContainer>

            <LabelContainer 
            label="Last Name" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>
            <TextInput 
            style={styles.loginTextInput}
			placeholder="Last Name" 
            placeholderTextColor='grey'
			name="first_name"
			value={this.state.last_name} 
			onChangeText={this.onLastNameChange.bind(this)}
			/>
            </LabelContainer>

            <LabelContainer 
            label="Mobile Number" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>
            <TextInput 
            style={styles.loginTextInput}
			placeholder="Mobile Number" 
            placeholderTextColor='grey'
			name="mobile"
			value={this.state.mobile} 
			onChangeText={this.onMobileChange.bind(this)}
			/>
            </LabelContainer>

            <LabelContainer 
            label="Select languages with reading and writing proficiency" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>
            <SelectBox
            label=""
            inputPlaceholder="Selected Languages"
            options={this.language_OPTIONS}
            selectedValues={[...this.state.language]}
            onMultiSelect={this.onLanguageChange.bind(this)}
            onTapClose={this.onLanguageDelete.bind(this)}
            isMulti="true"
            />
            </LabelContainer>

            <LabelContainer 
            label="Select DOB" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>

<DatePicker style={styles.datePickerStyle} picker="date" format='YYYY-MM-DD' onChange={(date)=>{this.setDOB(date)}} value={this.state.dob}  inputReadOnly bordered={false}/>
            </LabelContainer>


           
      
         </View>
    );
  
  }

renderRememberMe() {
  if (this.create!==true) {
    return (
    <View  style={{flexDirection:'row', justifyContent:'space-between',flexWrap:"wrap"}}>
        <View>
            <Text style={styles.greetingText}>
            <CheckBox value={this.state.rememberMe} onValueChange={this.onRememberMeChange.bind(this)} color={Colors.LoginBorderColor} />
                Remember Me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
        </View>
        <View>
            <Text onPress={this.handleForgotPassword.bind(this)} style={styles.greetingText}>
                Forgot Password?
            </Text>
        </View>
    </View>
    );
  }
}
renderActionButton(validationSchema) {
    return (
    <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={[styles.button,styles.backGroundGreen]}>
            <Text  
            style={styles.textWhite} 
            //onPress={this.handleRequest.bind({...this.props,action:this.actionLabel})} 
            onPress={this.handleRequest.bind(this)} 
            title={this.actionLabel}
            >
                {this.actionLabel}
            </Text>
        </View>
      </View>
    );
}
renderStateButton() {
    return (
    <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={[styles.button,styles.backGroundWhite]}>
        
        <TouchableOpacity onPress={this.setCreate.bind(this)} >
        <text  >
            {this.stateLabel}
        </text>
        </TouchableOpacity>
        
        </View>
    </View>
    );
}
renderGreetings(){
  return(
        <View 
        style={{justifyContent:'center', 
        flexDirection:'column',
        alignContent:'center'}}
        >
            <br/>
            <center>
                <Text style={[styles.textWhite,styles.header]}>
                    {this.greetings}
                </Text>
            </center>
            <br/>
            <center>
                <Text  style={[styles.greetingText]}> 
                    {this.message}
                </Text>
            </center>
            <br/>
            <br/>
            <center>
                {this.renderStateButton()}
            </center>
        </View>    
  );
}

render(){
  let obj=this;
    //alert("render called");
    return( 
      
    <View style={styles.loginContainer}> 
        <View style={{flex:2}}>
            <View style={{flexDirection:'column'}}>
            <Image style={styles.logo} source={require("../assets/iiitnew.png")} />
                <br/>
                <View style={{width:'80%',alignSelf:'center'}}>
                   <center> <Text style={styles.loginHeaderText}>{this.headerText}</Text></center>
                   <Form ref="form" shouldValidate={true} >
                   {obj.renderLoginField()}
                   { obj.renderCreateField()}
                    {obj.renderActionButton()}
                    {obj.renderRememberMe()}
                    </Form>
                </View>
            </View>
       </View>
       <View style={{flex:1,backgroundColor:Colors.LoginRow2Color}}>
            {this.renderGreetings()}
       </View>
    </View>
    );
}
   
}

export default LoginOrRegister;
