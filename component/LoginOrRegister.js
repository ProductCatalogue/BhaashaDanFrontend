import {React } from "react";
import {Text, View,Image } from 'react-native';

import axios from "axios";
import { DatePicker } from 'antd';
import { Formik, Field,FieldArray, Form,useFormikContext,useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import LabelContainer from "./LabelContainer";
import SelectBox from './CustomSelect';

import styles from "../constant/GlobalStyles";
import Colors from "../constant/color";
import globalconstant from "../constant/globalvariables"

import CustomInput from "../CustomInput"

import * as yup from 'yup';

function LoginOrRegister(props)  {
var propsSourceObject;
var message="Welcome back, you've been missed";
var greetings="Hello Again!";

if(props.route && props.route.params)
{
    propsSourceObject=props.route.params;
}
else
{
    propsSourceObject=props;
}
const formValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('  Username is required'),
  password: yup
    .string()
    .min(8, ({ min, value }) => `  ${min - value.length} characters to go`)
    .required('  Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'),null], '  Confirm password should match with password')
    .min(8, ({ min, value }) => `  ${min - value.length} characters to go`)
    .required('  Confirm password is required'),

    first_name: yup
    .string()
    .required('  First name is required'),
    last_name: yup
    .string()
    .required('  Last name is required'),
    
    dob: yup
    .date()
    .required('  DOB is required'),
    language:yup
    .array()
    .min(1,"  At least one language need to be selected"),
   mobile: yup
   .string()
   .min(10, '  Mobile should be exactly 10 digits')
   .max(10, '  Mobile should be exactly 10 digits')
   .matches(/^[9,8,7,6][0-9]+$/, "  Mobile must be only digits and should start with either of 6, 7, 8, 9")
   .required('  Mobile is required')
   ,
   
   //.required("Mobile number is required"),
  

})
  return (
    <View style={styles.loginContainer}> 
    <View style={{flex:2,backgroundColor:Colors.HomeColor}}>
        <View style={{flexDirection:'column'}}>
        <Image style={styles.logo} source={require("../assets/iiitnew.png")} />
            <br/>
            <View style={{width:'80%',alignSelf:'center'}}>
               <center> <Text style={styles.loginHeaderText}>Register</Text></center>
               <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
              first_name: '',
              last_name: '',
              mobile:'',
              dob:'',
              language:[],
            }}
            validationSchema={formValidationSchema}
            onSubmit={values => handleFormSubmit(values,props)}
           // onChange={(name,text)=>setValues(name,text)}
          >
            {({ handleSubmit, isValid,errors,values }) => (
              <Form> 
                <Field
                  component={CustomInput}
                  name="username"
                  placeholder="Username"
                  headerBackgroundColor={Colors.HomeColor}
                />
                <Field
                  component={CustomInput}
                  headerBackgroundColor={Colors.HomeColor}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  headerBackgroundColor={Colors.HomeColor}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  name="first_name"
                  placeholder="First Name"
                 // keyboardType="email-address"
                  headerBackgroundColor={Colors.HomeColor}
                />
                <Field
                  component={CustomInput}
                  name="last_name"
                  placeholder="Last Name"
                  //keyboardType="email-address"
                  headerBackgroundColor={Colors.HomeColor}
                />
                <Field
                  component={CustomInput}
                  name="mobile"
                  placeholder="Mobile Number"
                  keyboardType="number"
                  headerBackgroundColor={Colors.HomeColor}
                />
                <LabelContainer 
            label="Select DOB" 
            //labelBackgroundColor={Colors.LoginLabelBackgroundColor} 
            headerBackgroundColor={Colors.HomeColor} 
            borderColor={errors['dob']? 'red':Colors.LoginBorderColor }
			>
        
        <DatePickerField
                  name="dob"
                  placeholder="DOB"
                 // keyboardType="numeric"
                  headerBackgroundColor={Colors.HomeColor}
                  style={styles.datePickerStyle} 
                  picker="date" 
                  format='YYYY-MM-DD' 
                 // onChange={(date)=>onChange(date)} 
                 // value={dob}  
                  inputReadOnly 
                  disabledDate={d => !d || d.isAfter(dayjs(Date.now()).add(-5,'year'))}
                  bordered={false}
                  defaultPickerValue={dayjs(Date.now()).add(-5,'year')}
          />
                
        
                {errors['dob'] &&  <Text style={styles.errorText}>{errors['dob']}</Text>}


            </LabelContainer>
            <LabelContainer 
            label="Select Known Languages" 
            headerBackgroundColor={Colors.HomeColor} 
            borderColor={errors['language']? 'red':Colors.LoginBorderColor }
			>
            <FieldArray name="language" style={{margin:'8px'}}>
            {
            ({ push, remove }) => (
            <SelectBox
            label=""
            inputPlaceholder="Selected Languages"
            options={globalconstant.language_OPTIONS}
            selectedValues={values['language']}
            onMultiSelect={(item)=>push(item)}
            onTapClose={(item)=>remove(values['language'].indexOf(item))}
            isMulti="true"/>
            )
            }
            
            
            
            </FieldArray>
            {errors['language'] &&  <Text style={styles.errorText}>{errors['language']}</Text>}
			</LabelContainer>
			<center>
                 <View style={[styles.button,styles.backGroundGreen]}>
               
                <Text  
            style={styles.textWhite} 
            //onPress={this.handleRequest.bind({...this.props,action:this.actionLabel})} 
            onPress={handleSubmit} 
            title="Register"
           disabled={!isValid}
            >
                Register
            </Text>
            
            </View>
            </center>
			
            </Form> 
            )}
          </Formik>
            </View>
            
        </View>
   </View>
   <View style={{flex:1,backgroundColor:Colors.LoginRow2Color}}>
   <View 
        style={{justifyContent:'center', 
        flexDirection:'column',
        alignContent:'center'}}
        >
            <br/>
            <center>
                <Text style={[styles.textWhite,styles.header]}>
                    {greetings}
                </Text>
            </center>
            <br/>
            <center>
                <Text  style={[styles.greetingText]}> 
                    {message}
                </Text>
            </center>
            <br/>
            <br/>
            <center>
            <View style={[styles.button,styles.backGroundWhite]}>
               
               <Text  
           style={styles.textGreen} 
           onPress={()=>handleSignIn(props)} 
           title="SIgnIn"
           >
               SignIn
           </Text>
           
           </View>
            </center>
        </View> 
   </View>
</View>
  )
}

function handleFormSubmit(values,props){
 // alert(values['dob']);
  
 const endpoint = 'api/auth/register/'
    const payload = { username: values['username'], password: values['password'] } ;
    axios.defaults.baseURL = 'http://bhasha.iiit.ac.in/crowd/';
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
      payload.first_name = values['first_name'];
      payload.last_name = values['last_name'];
      payload.mobile = values['mobile'];
      payload.dob = values['dob'].format("YYYY-MM-DD");
      //alert("dob"+values['dob);
      var lan="";
      for(var k=0;k<values['language'].length;k++){
        //alert(values['language[k].id);
        if(k>0)
          lan=lan+","+values['language'][k].id;
        else
          lan=values['language'][k].id;
      
      
      payload.language=lan;
    }
	
	 let propSource=props;
   let username=values['username'];
    axios({
        method: 'post',
        url: endpoint,
        data: payload
      }).then(function (response) {
        handleSignIn({...propSource,"username":username});
       // return;
       
      })
      .catch(function (error) {
        console.log(error);
        alert("API call fails with error:"+error);
      });
}
const  DatePickerField =({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      
      
      //selected={(field.value && new Date(field.value)) || dayjs(Date.now()).add(-5,'year')}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
function handleSignIn(props){
  props.navigation.navigate('Login',{"username":props.username,"isCreate":false});
}
export default LoginOrRegister;