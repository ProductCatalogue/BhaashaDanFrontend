import { StatusBar } from 'expo-status-bar';
import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,Modal, FlatList, ActivityIndicator} from 'react-native';


import CardFrame from './cardFrame';
import Styles from '../constant/GlobalStyles'
import Header from './Header';
import Profile from './Profile';
import ButtonTypeRadio from './ButtonTypeRadio';
import ModalView from './ModalView';

import Colors from '../constant/color'

const borderColor='#0ccb7c'

const knownLanguage=[
    {
        item:"Hindi",
        key:"Hindi"

    },
    {
        item:"English",
        key:"English"

    },
    {
        item:"Bengali",
        key:"Bengali"

    }
]


const data=[
    {
        description:'1',
        key:'1'

    },
    {
        description:'2',
        key:'2'
    },
    {
        description:'3',
        key:'3'
    }
    
]

export default class UserDashboard extends Component {
    propsSourceObject={};
    selectedItem={};
    itemToRender=[];
    pageSize=20;
    pageNumber=1;
    state={
        selectedLanguage:knownLanguage[0],
        workType:"Uploaded",
        modalVisible:false,
        isLoading:true,  
    }
constructor(props){
        super(props);

        if(this.props.route && this.props.route.params && this.props.route.params.user!=undefined && this.props.route.params.user!=null){
        this.propsSourceObject=this.props.route.params;
        //alert("userdashboard param exists"+this.propsSourceObject);
        }
        else{
        this.propsSourceObject=this.props;
        //alert("userdashboard param not exists "+propsSourceObject);
        }
        for(var i=0;i<this.pageSize && i<data.length;i++)
            this.itemToRender[i]=data[i];
}
onLanguageChange(language){
        //////alert("this"+this);
        //////alert("language"+language.item);
        this.setState({selectedLanguage:language});
}
setWorkType(workType){
        ////////alert("old "+this.state.workType);
       // //////alert("new "+workType);
        this.setState({workType:workType});
}
renderEmpty(){
        return(
            <View>
                <Text>No item to show</Text>
            </View>
        );
}
fetMoreData(){
for(var j=(this.pageNumber-1)*this.pageSize;(j<this.pageNumber*this.pageSize && j<data.length);j++){ 
 this.itemToRender[j]=data[j];
}
}
getData = async () => {
    if(this.state.isLoading){
    this.fetMoreData();
    this.setState({isLoading:!this.state.isLoading});
    }
}
fetMoreDataEnd=()=>{
    if(!this.state.isLoading)
    { 
    this.pageNumber+=1;
    this.setState({
                isLoading:!this.state.isLoading},async()=>{    
                this.getData();
                })
    }
}
fetMoreDataScroll(){
    //alert("Scroll");
}
onCardClick(item){
    if(item)
       this.selectedItem=item;
this.setState({modalVisible:!this.state.modalVisible})
}
render(){
        return(
            <View style={localStyles.container}>      
                <Header/>
                <View style={localStyles.middleContainer}>
                </View>
                <View style={localStyles.lastContainer}>
                    <View style={localStyles.Profile}>
                        <Profile user={this.propsSourceObject.user}/>
                    </View>
                    <View style={localStyles.content}>
                        <View style={localStyles.lanConatiner}>
                            <View style={{justifyContent:'flex-start',flexDirection:'row',flex:4,flexWrap:'wrap'}}>
                                 { knownLanguage.map(item => 
                                <ButtonTypeRadio 
                                key={item.key}
                                style={item==this.state.selectedLanguage?[{...localStyles.activeButtonStyle,...localStyles.activeWorkType}]:[{...localStyles.buttonStyle,...localStyles.passiveWorkType}]} 
                                item={item} 
                                handleClick={this.onLanguageChange.bind(this)}
                                />)}
                            </View>
                            <View style={{justifyContent:'flex-end',flexDirection:'row',flex:3,flexWrap:'wrap'}}>
                                <TouchableOpacity onPress={()=>this.setWorkType("Uploaded")} ><Text style={[{...localStyles.toggleFirstHalf},this.state.workType!="Uploaded"?{...localStyles.passiveWorkType}:{...localStyles.activeWorkType}]}>Uploaded</Text></TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.setWorkType("Pending")} ><Text style={[{...localStyles.toggleSecondHalf},this.state.workType!="Pending"?{...localStyles.passiveWorkType}:{...localStyles.activeWorkType}]}>Pending</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={localStyles.tileContainer}>
                        {this.isLoading?
                        <View>
                            <ActivityIndicator size='large'/>

                        </View>
                        :
                       <FlatList
                       contentContainerStyle={localStyles.tileContainer}
                       data={this.itemToRender}
                       renderItem={({item})=> <CardFrame item={item} key={item.key} workType={this.state.workType} onPress={this.onCardClick.bind(this)}/>}
                       onEndReachedThreshold={0.2}
                       onEndReached={this.fetMoreDataEnd.bind(this)}
                       onScroll={this.fetMoreDataScroll.bind(this)}
                       ListEmptyComponent={this.renderEmpty}
                       initialNumToRender={this.pageSize}
                       />
                        }
                        </View>  
                    </View>
               </View>
               <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this.onCardClick.bind(this)} 
                >
                    <ModalView 
                    item={this.selectedItem}
                    onPressAction={this.onCardClick.bind(this)}
                    workType={this.state.workType}
                    />
                </Modal>        
            </View>   
        );
    }

}
const localStyles= StyleSheet.create({
    header:{
        backgroundColor:'#0eca7e',
        justifyContent:'center',
        //height:'10%',
        flex:1,
        width:'100%',
        
       // flexGrow:1,
    },
    middleContainer:{
        backgroundColor:'#0aae6c',
        justifyContent:'center',
       // height:'15%',
       flex:1.5,
        width:'100%',
    },
    lastContainer:{
        flexDirection:'row',
        backgroundColor:'#e3eaea',
        justifyContent:'center',
       // height:'35%',
       flex:8.5,
        width:'100%',
        flexWrap:'wrap',
        
    },
    Profile:{
        top:'-15%',
        width:'30%',
       // height:'100%',
        flex:3,
        margin:5,
        padding:5,       
        alignItems:'center',
        alignContent:'center',
        flexDirection:'column',
        zIndex:1,
    },
    container: {
        //height:'100%',
        width:'100%',
        flex:10,
        flexDirection:'Column',
        backgroundColor: '#0eca7e',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap:'nowrap',
        overflow:'auto',
        
        
       zIndex:0,
      },
      content:{
        
        // height:'100%',
        width:'65%',
        flex:7,
         flexDirection:'column',
         backgroundColor: '#e3eaea',
         alignItems: 'flex-start',
         justifyContent: 'flex-start',
         alignContent:'flex-start',
         flexWrap:'wrap',
         //overflow:'auto',
        // top:100,
       },
      tileContainer:{
        
       flex:9,
        width:'100%',
        flexDirection:'row',
        backgroundColor: '#e3eaea',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent:'flex-start',
        flexWrap:'wrap',
        overflow:'auto',
       // top:100,
      },
      lanConatiner:{ 
        flex:1,
        width:'100%',
        flexDirection:'row',
        backgroundColor: '#e3eaea',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent:'flex-start',
        flexWrap:'wrap',
        overflow:'auto',
       // top:100,
      },
      activeButtonStyle:{
        backgroundColor:Colors.dashboardRow2Color,
        borderColor:Colors.dashboardRow2Color,
        borderWidth:1,
        borderRadius:10,
        margin:5,
        height:20,
        //fontSize:10,
        paddingHorizontal:2,
      },
      
      buttonStyle:{
        backgroundColor:Colors.dashboardRow1Color,
        borderColor:Colors.dashboardRow2Color,
        borderWidth:1,
        borderRadius:10,
        margin:5,
        height:20,
        //fontSize:10,
        paddingHorizontal:2,
      },
      toggleFirstHalf:{
        backgroundColor:Colors.dashboardRow2Color,
        borderBottomStartRadius:10,
        borderTopStartRadius:10,
        borderBottomEndRadius:0,
        borderTopEndRadius:0,
        paddingHorizontal:2,
        marginVertical:5,
        height:20,
        //fontSize:10,
      },
      toggleSecondHalf:{
        backgroundColor:Colors.dashboardRow2Color,
        borderBottomStartRadius:0,
        borderTopStartRadius:0,
        borderBottomEndRadius:10,
        borderTopEndRadius:10,
        paddingHorizontal:2,
        //marginTop:5,
        marginVertical:5,
        height:20,
       // fontSize:10,
      },
      passiveWorkType:{
        fontFamily:'Roboto',
        fontSize:'14px',
        fontWeight:'500',
        fontStyle:'normal',
        lineHeight:'20px',
        backgroundColor:'white',
      },
      activeWorkType:{
        fontFamily:'Roboto',
        fontSize:'14px',
        fontWeight:'500',
        fontStyle:'normal',
        lineHeight:'20px',
        
      }

});