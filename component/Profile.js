import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import GlobalStyles from '../constant/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


 class Profile extends Component {

        cookies=instanceOf(Cookies).isRequired;
      
    propsSourceObject={} ;
    showEdit=false;
    user={};
       state={
        data:[]
    }

          constructor(props){
            super(props); 
            
if(this.props.route && this.props.route.params && this.props.route.params.user!=undefined && this.props.route.params.user!=null)
{
    this.propsSourceObject=this.props.route.params;
}
else
{
    this.propsSourceObject=this.props;
}
this.user=this.propsSourceObject.user;
          }
          componentDidMount(){
           // this.fetchUsers();
          }
     renderLanguages ()  {
        return this.user.languages.map(lan => {return(<li key={lan.key} >{lan.item}</li>)})
       //return "hindi";
      }
      editProfile(){
        //alert("edit Profile "+this.user.name);
      }
    render(){
       // this.fetchUsers();
        ////alert(this.state.data);
        return(
            <View>
                <View style={styles.profileStyleContainer}>
                <View style={styles.profileStyle}>
                <View style={styles.imageContainer}>
                    <Image style={styles.profileImageStyle} source={require("../assets/blank-profile.png")} />
                </View>          
                <Text style={styles.nameText}>{this.user.first_name} {this.user.last_name}</Text>
                <Text style={styles.introText}><AntDesign name="mobile1" size={18} color="black" /> {this.user.mobile}</Text>
                <br/><Text style={styles.locationText}><FontAwesome name="birthday-cake" size={18} color="black" /> {this.user.dob}</Text>
                
                   { this.showEdit==true?
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text  style={styles.appButtonText} onPress={this.editProfile.bind(this)}>
                        
                    <MaterialIcons name="edit" size={16} color="white" />
                    Edit Your Profile
                    </Text>
                </TouchableOpacity>:<></>
                }
                    
                
                
                <Text style={styles.languageHeader}>Languages</Text>
                <View>
                    <Text style={styles.languagesText}>
                    {this.renderLanguages()}
                    </Text>
                </View>
                
                </View>
                <View style={styles.logout}>
                <TouchableOpacity style={styles.logout}>
                    <Text style={[GlobalStyles.button,GlobalStyles.textWhite]} onPress={this.logout.bind(this)}>
                    Logout
                    </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            
        );
    }
    logout() {
        const { cookies } = this.props;
        
        cookies.remove('bashadan');
        
       // alert(JSON.stringify(this.props.navigation));
        this.props.navigation.navigate('Home');
        }
}

const styles=StyleSheet.create({
    nameText:{
        fontFamily: 'Montserrat',
        fontWeight:'700',
        fontSize: '32px',
        lineHeight:'50px',
        fontStyle:'normal',
        textAlign:'center',
    },
    introText:{
        fontFamily: 'Montserrat',
        fontWeight:'500',
        fontSize: '18px',
        lineHeight:'22px',
        fontStyle:'normal',
        textAlign:'center', 
    },
    locationText:{
        fontFamily: 'Montserrat',
        fontWeight:'500',
        fontSize: '20px',
        lineHeight:'24px',
        fontStyle:'normal',
        textAlign:'center', 
        marginBottom:20,
    },
    languageHeader:{
        fontFamily: 'Montserrat',
        fontWeight:'600',
        fontSize: '18px',
        lineHeight:'22px',
        fontStyle:'normal',
        textAlign:'center', 
    },
    languagesText:{
        fontFamily: 'Montserrat',
        fontWeight:'500',
        fontSize: '18px',
        lineHeight:'22px',
        fontStyle:'normal',
        textAlign:'left', 
    },
profileStyle:{
    alignItems:'center',
    backgroundColor:'#d7f8eb',
    borderRadius:5, 
  //  height:'100%',
   // width:'100%',
    //overflow:'auto',
    
},
profileStyleContainer:{
    alignItems:'center',
    backgroundColor:'#d7f8eb',
    borderRadius:5, 
    height:'100%',
    width:'100%',
   // overflow:'auto',
    
},
imageContainer:{
    borderRadius: 120,
    width: 100,
    height: 100,
    justifyContent:'center',
    aspectRatio:1,
    resizeMode:'contain',
},
profileImageStyle:{
    width: 100,
    height: 100,
    aspectRatio:1,
    resizeMode:'contain',
},
profileEditButton:{
    color:'green',
},
buttonContainer:{
    width:150,
    height:50,
    fontSize:5,
    borderRadius:5,  
    textAlignVertical:'center', 
    //verticalAlign:'middle',
    //textAlign:'center',
},
logout:{
   // width:150,
   // height:50,
   alignItems:'flex-end',
    fontSize:5,
   // borderRadius:5,  
    textAlignVertical:'center', 
    
    //textAlign:'center',
},
appButtonText:{
    backgroundColor:'#0ccb7c',
    borderRadius:5,
    height:28,
    //fontSize:16,
    textAlign:'center',
    padding:2,
    margin:2,
    color:'white',
    fontFamily: 'Roboto',
    fontWeight:'500',
    fontSize: '16px',
    lineHeight:'20px',
    //fontStyle:'normal',
    textAlign:'center',
    //alignSelf:'center',
    //alignItems:'center',
   // alignContent:'center',
   textAlignVertical:'center',
    
    
    
}

});
export default withCookies(Profile);