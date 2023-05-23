import React, { Component } from "react";
import {Text, View, TextInput, TouchableOpacity,Image } from 'react-native'
import CheckBox from "expo-checkbox";

import LabelContainer from "./LabelContainer";
import SelectBox from './CustomSelect';

//import Logo from './Logo';

import styles from "../constant/GlobalStyles";
import Colors from "../constant/color";
import globalconstant from "../constant/globalvariables"

class LoginOrRegister extends Component{
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
    confirmPassword: '',
    isCreate:'',
    language:[],
    rememberMe:false,
    
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
        this.create=true; 
        //alert("param not exists "+this.create);
}

if(this.create==true)
  {
    this.actionLabel="Register";
    this.stateLabel="Login";
    this.greetings="Hello Again!";
    this.message="Welcome back, you've been missed";
    this.headerText="Register";
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
onUsernameChange(text) {
    this.setState({ username: text });
}

onPasswordChange(text) {
    this.setState({ password: text });
}

onConfirmPasswordChange(text) {
    this.setState({ confirmPassword: text });
}

onLanguageChange(text) {
    this.setState( {language:[...this.state.language,text ]});
}
onLanguageDelete(text) {
    this.setState( {language:[...(this.state.language.filter(i=>(i.id!=text.id))) ]});
}
onRememberMeChange(text) {
 // ////alert(this.state.rememberMe);
  this.setState({ rememberMe: !this.state.rememberMe });
}
handleForgotPassword(){
	////alert("blank forgot password called");
}
handleRequest(props) {
    //alert("handleRequest");
	////alert("a");
	//alert("username="+this.state.username);
	//alert("password="+this.state.password);
    if(props.action!="Login")
    {
	//alert("confirmPassword="+this.state.confirmPassword);
	//alert("rememberMe="+this.state.rememberMe);
	for(var i=0;i<this.state.language.length;i++){
    //alert("language="+this.state.language[i].item);
	}
    }
    /*
    const endpoint = this.state.isCreate=="true" ? 'register' : 'login';
    const payload = { username: this.state.username, password: this.state.password } 
    
    if (this.state.isCreate=="true") {
      payload.confirmPassword = this.state.confirmPassword;
      payload.language = this.state.language;
    }
    ////alert('2');
    axios
      .post(`/auth/${endpoint}/`, payload)
      .then(response => {
        const { token, user } = response.data;
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        // Navigate to the home screen
        Actions.main();
      })
      .catch(error => console.log(error));
      ////alert('3');
      */
     const tempUser={
     name:"Vineet1 Kumar",
     intro:"hjghj bjkhjk kljk hiuhji",
     location: "Hyderabad",
     languages:[{id:"Hindi",item:"Hindi"},{id:"English",item:"English"}]
     }
     props.navigation.navigate('UserDashboard',{user:tempUser});
}
  
renderLoginField(){
  return(
      <View>
            <LabelContainer 
            label="Username" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>
            <TextInput 
			placeholder="Username" 
			name="username"
			value={this.state.username} 
			onChangeText={this.onUsernameChange.bind(this)}
            placeholderTextColor='grey'
			/>
            </LabelContainer>
            <LabelContainer 
            label="Password" 
            labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.LoginHeaderBackgroundColor} 
            borderColor={Colors.LoginBorderColor}>
            <TextInput 
			placeholder="Password" 
            placeholderTextColor='grey'
			name="password"
			secureTextEntry="true"  
			value={this.state.password} 
			onChangeText={this.onPasswordChange.bind(this)}
			/>
            </LabelContainer>
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
			secureTextEntry="true"
			placeholder="Confirm Password" 
            placeholderTextColor='grey'
			name="confirmPassword"
			value={this.state.confirmPassword}
			onChangeText={this.onConfirmPasswordChange.bind(this)}
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
         </View>
    );
  
  }

renderRememberMe() {
  if (this.create!==true) {
    return (
    <View  style={{flexDirection:'row', justifyContent:'space-between',flexWrap:"wrap"}}>
        <View>
            <Text>
            <CheckBox value={this.state.rememberMe} onValueChange={this.onRememberMeChange.bind(this)} color={Colors.LoginBorderColor} />
                Remember Me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
        </View>
        <View>
            <Text onPress={this.handleForgotPassword.bind(this)}>
                Forgot Password?
            </Text>
        </View>
    </View>
    );
  }
}
renderActionButton() {
    return (
    <View style={{flexDirection:'row', justifyContent:'center'}}>
        <View style={[styles.button,styles.backGroundGreen]}>
            <Text  
            style={styles.textWhite} 
            onPress={()=>this.handleRequest({...this.props,action:this.actionLabel})} 
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
                <Text style={styles.textWhite}>
                    <b>{this.greetings}</b>
                </Text>
            </center>
            <br/>
            <center>
                <Text> 
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
    //alert("render called");
    return( 
    <View style={styles.loginContainer}> 
        <View style={{flex:2}}>
            <View style={{flexDirection:'column'}}>
            <Image style={styles.logo} source={require("../assets/iiitnew.png")} />
                <br/>
                <View style={{width:'80%',alignSelf:'center'}}>
                   <center> <Text>{this.headerText}</Text></center>
                    {this.renderLoginField()}
                    {this.renderCreateField()}
                    {this.renderActionButton()}
                    {this.renderRememberMe()}
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
