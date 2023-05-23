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
                <Text>{this.user.name}</Text>
                <Text>{this.user.intro}</Text>
                <br/>
                <Text>{this.user.location}</Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text  style={styles.appButtonText} onPress={this.editProfile.bind(this)}>
                        
                    <MaterialIcons name="edit" size={10} color="white" />
                    Edit Your Profile
                    </Text>
                </TouchableOpacity>
                <Text>languages({this.user.languages.length})</Text>
                <View>
                    {this.renderLanguages()}
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
profileStyle:{
    alignItems:'center',
    backgroundColor:'#d7f8eb',
    borderRadius:5, 
    
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
    width:100,
    height:50,
    fontSize:5,
    borderRadius:5,  
    //textAlignVertical:'top', 
   // verticalAlign:'middle',
    //textAlign:'center',
},
appButtonText:{
    backgroundColor:'#0ccb7c',
    borderRadius:5,
    height:18,
    fontSize:10,
    textAlign:'center',
    padding:2,
    margin:2,
    color:'white',
    //alignSelf:'center',
    //alignItems:'center',
   // alignContent:'center',
    
    
    
}

});