import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default class Profile extends Component {
    propsSourceObject={} ;
    user={
        name:"Amit Kumar",
        intro:"hjghj bjkhjk kljk hiuhji",
        location: "Hyderabad",
        languages:[{id:"Hindi",item:"Hindi"},{id:"English",item:"English"}]
        }
     state={
        data:[]
    }
        fetchUser=async(prop)=> {
            const URL = "https://api.sampleapis.com/coffee/hot?id="+prop.name;
            const resp =await fetch(URL);
            const data1 = await resp.json();
            this.setState({data: data1} );
            
          }
          constructor(props){
            super(props); 
          
if(this.props.route && this.props.route.params && this.props.route.params.user!=undefined && this.props.route.params.user!=null)
{
    
    this.propsSourceObject=this.props.route.params;
    //alert("param exists"+this.propsSourceObject);
}
else
{
    this.propsSourceObject=this.props;
    //alert("param not exists "+this.propsSourceObject);
    /*if(props.user!=undefined && props.user!=null )
        this.user=props.user;
    else
        this.user=true; 
        //alert("param not exists "+this.create);*/
}
this.user=this.propsSourceObject.user;
          }
          componentDidMount(){
           // this.fetchUsers();
          }
     renderLanguages ()  {
        return this.user.languages.map(lan => <li key={lan.id}>{lan.item}</li>)
      }
      editProfile(){
        //alert("edit Profile "+this.user.name);
      }
    render(){
       // this.fetchUsers();
        ////alert(this.state.data);
        return(
            <View style={styles.profileStyle}>
                <View style={styles.imageContainer}>
                    <Image style={styles.profileImageStyle} source={require("../assets/iiitnew.png")} />
                </View>          
                <Text style={styles.nameText}>{this.user.name}</Text>
                <Text style={styles.introText}>{this.user.intro}</Text>
                <br/>
                <Text style={styles.locationText}>{this.user.location}</Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text  style={styles.appButtonText} onPress={this.editProfile.bind(this)}>
                        
                    <MaterialIcons name="edit" size={16} color="white" />
                    Edit Your Profile
                    </Text>
                </TouchableOpacity>
                <Text style={styles.languageHeader}>Languages({this.user.languages.length})</Text>
                <View>
                    <Text style={styles.languagesText}>
                    {this.renderLanguages()}
                    </Text>
                </View>
            </View>
        );
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
    height:'90%',
    width:'90%',
   overflow:'auto',
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
    height: 50,
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