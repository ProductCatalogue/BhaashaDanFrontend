import { StatusBar } from 'expo-status-bar';
import React from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,Modal, FlatList, ActivityIndicator,SafeAreaView} from 'react-native';
import axios from "axios";
//import { useInfiniteQuery } from 'react-query';

import CardFrame from './cardFrame';
import Styles from '../constant/GlobalStyles'
import Header from './Header';
import Profile from './Profile';
import ButtonTypeRadio from './ButtonTypeRadio';
import ModalView from './ModalView';

import Colors from '../constant/color'

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
    //pendingItemToRender=[];
    onEndReachedCalledDuringMomentum;
    pageSize=10;
    pendingPageNumber=1;
    uploadedPageNumber=1;
    uploadedTotalCount=1;
    pendingTotalCount=1;
    pendingItemToRender=[]; 
//    itemToRender={Uploaded:{},Pending:{}};
    state={
        selectedLanguage:"",
        workType:"Pending",
        modalVisible:false,
        isLoading:false,
        refreshing:false,
        itemToRender:{Uploaded:{},Pending:{}}
    }
constructor(props){
        super(props);
        if(this.props.route && this.props.route.params){// && this.props.route.params.user!=undefined && this.props.route.params.user!=null){
        this.propsSourceObject=this.props.route.params;
        //alert("userdashboard param exists"+this.propsSourceObject);
        }
        else{
        this.propsSourceObject=this.props;
        //alert("userdashboard param not exists "+propsSourceObject);
        }
        for(var i=0;i<this.propsSourceObject.user.languages.length;i++){
        this.state.itemToRender.Uploaded[this.propsSourceObject.user.languages[i].key]={isPrevApiCalled:false,count:1,items:[],pagenumber:1,lastPageNumber:-1};

        this.state.itemToRender.Pending[this.propsSourceObject.user.languages[i].key]={isPrevApiCalled:false,count:1,items:[],pagenumber:1,lastPageNumber:-1};
       
        }
        this.state.selectedLanguage=this.propsSourceObject.user.languages[0];

             this.getParagraph();
}
updateAPICall(){
    this.state.itemToRender["Uploaded"][this.state.selectedLanguage.key].isPrevApiCalled=false;
   this.onCardClick(this.selectedItem);
}
 getParagraph(){
    
    if(this){
    let self=this;
    

var lan=this.state.selectedLanguage.key;
var worktype=this.state.workType;
var pagenumber=this.state.itemToRender[worktype][lan].pagenumber;
var lastPageNumber=this.state.itemToRender[worktype][lan].lastPageNumber;

    var apiUrl= worktype=='Pending'?'api/paragraph?':'api/job?';
    apiUrl=apiUrl+'language='+lan+'&page='+pagenumber;
   
    //alert(apiUrl);
   this.setState({isLoading:true,refreshing:true});
    axios({
        method: 'get',
        url: apiUrl,
       // data: payload
      }).then(function (response) {
      //  alert("results"+JSON.stringify(response.data.results) );
       // if(self.state.workType=='Pending'){
        self.state.itemToRender[worktype][lan].isPrevApiCalled=true;
            self.state.itemToRender[worktype][lan].count=response.data.count;
            //alert(response.data.next);
            self.state.itemToRender[worktype][lan].lastPageNumber=pagenumber;
            if(response.data.next && response.data.next!=null)
                self.state.itemToRender[worktype][lan].pagenumber=self.state.itemToRender[worktype][lan].pagenumber+1;
                if(pagenumber==lastPageNumber){
                    
                    var j=(pagenumber-1)*self.pageSize-1;
                    var i=self.state.itemToRender[worktype][lan].items.length;
                    i--;
                        while(i>j){
                            i--;
                            self.state.itemToRender[worktype][lan].items.pop();
                        }
                   }
            for(var i=0; i<response.data.results.length;i++)
                self.state.itemToRender[worktype][lan].items.push(response.data.results[i]);

       self.setState({isLoading:false,refreshing:false});
        //self.pendingItemToRender=response.data.results;
        console.log(response.data);
        //self.onEndReachedCalledDuringMomentum = true;
        })
        .catch(function (error) {
           // self.pageNumber=self.pageNumber-1;
          console.log(error);
          self.setState({isLoading:false,refreshing:false});
          alert("API call fails with error:"+error);
         // self.onEndReachedCalledDuringMomentum = true;
        });
        
}
 }
onLanguageChange(language){
       this.state.selectedLanguage=language;
       if(!this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].isPrevApiCalled)
        this.getParagraph();
        else
        this.setState({selectedLanguage:language});
}
setWorkType(){
       if(this.state.workType=="Pending")
        this.state.workType="Uploaded";
       else
        this.state.workType="Pending";
    if(!this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].isPrevApiCalled)
       this.getParagraph();
    else
       this.setState({workType:this.state.workType});
}
renderEmpty(){
        return(
            <View>
                <Text>No item to show</Text>
            </View>
        );
}
fetMoreData(){
    this.getParagraph();
 
}
getData = async () => {
   
}
fetMoreDataEnd=()=>{
    this.getParagraph();
  
}
fetMoreDataScroll(){
    //alert("Scroll");
    this.getParagraph();
}
onCardClick(item){
    if(item)
       this.selectedItem=item;
this.setState({modalVisible:!this.state.modalVisible})
}
render(){
        return(
            <View style={localStyles.container}>      
                <Header showSearch="false"/>
                <View style={localStyles.middleContainer}>
                </View>
                <View style={localStyles.lastContainer}>
                    <View style={localStyles.Profile}>
                        <Profile user={this.propsSourceObject.user}/>
                    </View>
                    <View style={localStyles.content}>
                        <View style={localStyles.lanConatiner}>
                            <View style={{justifyContent:'flex-start',flexDirection:'row',flex:4,flexWrap:'wrap'}}>
                                 { this.propsSourceObject.user.languages.map(item => 
                                <ButtonTypeRadio 
                                key={item.key}
                                style={item==this.state.selectedLanguage?[{...localStyles.activeButtonStyle,...localStyles.activeWorkType}]:[{...localStyles.buttonStyle,...localStyles.passiveWorkType}]} 
                                item={item} 
                                handleClick={this.onLanguageChange.bind(this)}
                                />)}
                            </View>
                            <View style={{justifyContent:'flex-end',flexDirection:'row',flex:3,flexWrap:'wrap'}}>
                                <TouchableOpacity onPress={this.setWorkType.bind(this)} ><Text style={[{...localStyles.toggleFirstHalf},this.state.workType!="Uploaded"?{...localStyles.passiveWorkType}:{...localStyles.activeWorkType}]}>Uploaded</Text></TouchableOpacity>
                                <TouchableOpacity onPress={this.setWorkType.bind(this)} ><Text style={[{...localStyles.toggleSecondHalf},this.state.workType!="Pending"?{...localStyles.passiveWorkType}:{...localStyles.activeWorkType}]}>Pending</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={localStyles.tileContainer}>
                        {this.state.isLoading?
                        <View>
                            <ActivityIndicator size='large'/>
                            
                        </View>
                        :
                        
                       <FlatList
                       keyExtractor={(item) => item.id}
                       contentContainerStyle={localStyles.tileContainer}
                       data={this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].items}
                       renderItem={({item})=> <CardFrame item={item} key={item.key} workType={this.state.workType} onPress={this.onCardClick.bind(this)}/>}
                       onEndReached={this.getParagraph}
                       onEndReachedThreshold={0.5}
                       refreshing={this.state.refreshing}
                       onScroll={this.fetMoreDataEnd.bind(this)}
                       ListEmptyComponent={this.renderEmpty}
                       initialNumToRender={this.pageSize}
                       //onMomentumScrollBegin={() => {this.onEndReachedCalledDuringMomentum = false;}}
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
                    onUploadAction={this.updateAPICall.bind(this)}
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
        //overflow:'auto',
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