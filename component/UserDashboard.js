import { StatusBar } from 'expo-status-bar';
import React,{useLayoutEffect} from 'react';
import react, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Modal, FlatList, ActivityIndicator,SafeAreaView,Dimensions} from 'react-native';
import axios from "axios";
//import { useInfiniteQuery } from 'react-query';

import CardFrame from './cardFrame';
//import Styles from '../constant/GlobalStyles'
import Header from './Header';
import Profile from './Profile';
import ButtonTypeRadio from './ButtonTypeRadio';
import ModalView from './ModalView';

import Colors from '../constant/color'
import FlatListView from './FlatLIstView';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const numberOfColumn=Math.max(width/300,1);
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
    //flatListRef = React.createRef();
    
//    itemToRender={Uploaded:{},Pending:{}};
    state={
        selectedLanguage:"",
        workType:"Pending",
        modalVisible:false,
        isLoading:true,
        refreshing:false,
        itemToRender:{Uploaded:{},Pending:{}},
        
    }
constructor(props){
        super(props);
        if(this.props.route && this.props.route.params){// && this.props.route.params.user!=undefined && this.props.route.params.user!=null){
        this.propsSourceObject=this.props.route.params;
          //  alert("userdashboard param exists"+this.propsSourceObject);
        }
        else{
        this.propsSourceObject=this.props;
       // alert("userdashboard param not exists "+this.propsSourceObject);
        }
       // alert(this.propsSourceObject.user);
        
       for(var i=0;i<this.propsSourceObject.user.languages.length;i++){
        this.state.itemToRender.Uploaded[this.propsSourceObject.user.languages[i].key]={isPrevApiCalled:false,count:1,items:[],pagenumber:1,lastPageNumber:-1,nextPage:null,scrollIndex:0,hasMore:true};

        this.state.itemToRender.Pending[this.propsSourceObject.user.languages[i].key]={isPrevApiCalled:false,count:1,items:[],pagenumber:1,lastPageNumber:-1,nextPage:null,scrollIndex:0,hasMore:true};
       
        }
        this.state.selectedLanguage=this.propsSourceObject.user.languages[0];
}


_renderItem({item}){
   // alert(item);
   return (<CardFrame item={item} key={item.id} workType={this.state.workType} onPress={this.onCardClick.bind(this)}/>)
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
   //this.setState({isLoading:false,refreshing:true});
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
            if(response.data.next && response.data.next!=null){
                self.state.itemToRender[worktype][lan].pagenumber=self.state.itemToRender[worktype][lan].pagenumber+1;
                self.state.itemToRender[worktype][lan].nextPage=response.data.next;
            }
            else
            {
                self.state.itemToRender[worktype][lan].nextPage=null;
                self.state.itemToRender[worktype][lan].hasMore=false;
            }
            /*
            if(pagenumber==lastPageNumber){
                var index=this.pageSize*(pagenumber-1)-1;
                for(var i=index;i<self.state.itemToRender[worktype][lan].items.length;i++)
                    self.state.itemToRender[worktype][lan].items.pop();
            }
            for(var i=0;i<response.data.results.length;i++)
                self.state.itemToRender[worktype][lan].items.push(response.data.results[i]);
            */
                self.state.itemToRender[worktype][lan].items=[...self.state.itemToRender[worktype][lan].items,...response.data.results]
            
            
        
       
        //self.pendingItemToRender=response.data.results;
        console.log(response.data);
        //self.onEndReachedCalledDuringMomentum = true;
        })
        .catch(function (error) {
           // self.pageNumber=self.pageNumber-1;
          console.log(error);
          //self.setState({isLoading:false,refreshing:false});
          alert("API call fails with error:"+error);
         // self.onEndReachedCalledDuringMomentum = true;
        })
        .finally(function(){
            self.setState({isLoading:false,refreshing:false});
           
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
setWorkType(workType){
   
       // this.state.workType=workType;
       // alert(this.state.itemToRender[workType][this.state.selectedLanguage.key].isPrevApiCalled)
    if(!this.state.itemToRender[workType][this.state.selectedLanguage.key].isPrevApiCalled)
       {
        this.state.workType=workType
        this.getParagraph();
       }
    else if(this.state.workType!=workType)
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
handleScroll1() {
    console.log("onEndReachedcalled");
    //alert("onscroll")
    //alert("handlescroll"+this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].nextPage);
    /*
   // alert("window.innerHeight "+scrollableNOde); //330
   var A=this.flatListRef;
    alert("document.documentElement.scrollTop "+A.scrollY);  //0
    alert("document.documentElement.offsetHeight "+this.flatListRef.offsetHeight); //330
    if (window.innerHeight + this.flatListRef.scrollTop != this.flatListRef.offsetHeight || this.state.isLoading) {
      return;
      
    }*/
  //if(d.distanceFromEnd>0)
    if(this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].nextPage!=null)
    {
       
      //  this.getParagraph();
        
    }
  };
handleScroll(d) {
//alert("hasmore"+this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].hasMore)
    if(!this.state.refreshing && this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].nextPage!=null)
    {
        this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].scrollIndex=this.pageSize+this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].scrollIndex;
        this.getParagraph();
        
    }
    
  };
render(){
    
        return(
            <View style={localStyles.container}>      
                <Header showSearch="false"/>
                <View style={localStyles.middleContainer}>
                </View>
                <View style={localStyles.lastContainer}>
                    <View style={localStyles.Profile}>
                        <Profile user={this.propsSourceObject.user} {...this.props}/>
                    </View>
                    <View style={localStyles.content}>
                    
                        <View style={localStyles.lanConatiner}>
                            <View style={{alignContent:'flex-start',justifyContent:'flex-start',flexDirection:'row',minWidth:'120px',flexWrap:'wrap'}}>
                                 { this.propsSourceObject.user.languages.map(item => 
                                <ButtonTypeRadio 
                                key={item.key}
                                style={item==this.state.selectedLanguage?[{...localStyles.activeButtonStyle,...localStyles.activeWorkType}]:[{...localStyles.buttonStyle,...localStyles.passiveWorkType}]} 
                                item={item} 
                                handleClick={this.onLanguageChange.bind(this,item)}
                                />)}
                            </View>
                            <View style={{alignContent:'flex-end', justifyContent:'flex-end',flexDirection:'row',minWidth:'80px'}}>
                                <TouchableOpacity onPress={this.setWorkType.bind(this,"Uploaded")} ><Text style={[{...localStyles.toggleFirstHalf},this.state.workType!="Uploaded"?{...localStyles.passiveWorkType}:{...localStyles.activeWorkType}]}>Uploaded</Text></TouchableOpacity>
                                <TouchableOpacity onPress={this.setWorkType.bind(this,"Pending")} ><Text style={[{...localStyles.toggleSecondHalf},this.state.workType!="Pending"?{...localStyles.passiveWorkType}:{...localStyles.activeWorkType}]}>Pending</Text></TouchableOpacity>
                            </View>
                        
                        </View>
                        <View style={localStyles.tileContainer}>
                        {this.state.isLoading?
                        <View>
                            <ActivityIndicator size='large'/>
                            {this.getParagraph()}
                        </View>
                        :
                        
                       <FlatListView
                       //ref={this.flatListRef}
                       keyExtractor={(item) => item.id}
                       key={(item)=>item.id}
                       contentContainerStyle={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}
                       data={this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].items}
                       renderItem={this._renderItem.bind(this)}
                       ListEmptyComponent={this.renderEmpty}
                      hasMore={this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].hasMore}
                      onEndReached={
                        this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].hasMore?
                        this.handleScroll.bind(this)
                       :
                       ""
                      }
                      onEndReachedThreshold={
                        this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].hasMore?
                       0.2
                       :
                       0
                       }
                       refreshing={this.state.refreshing}
                       horizontal={false}
                       //onEndReached={this.handleScroll.bind(this)}
                      // refreshing={this.state.refreshing}
                    //  getItemLayout={(any,number) => ( {length: 200,offset:(250*((number-1)/numberOfColumn)), index: number})}
                       //initialScrollIndex={0}
                     //  initialScrollIndex={this.state.itemToRender[this.state.workType][this.state.selectedLanguage.key].scrollIndex}
                       //scrollEnabled={true}
                      // onScroll={this.handleScroll1.bind(this)}
                      // maxToRenderPerBatch={10}
                      // numColumns={2}
                      // style={{width:'100%',flexGrow:1}}
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
       minwidth:'380px',
    },
    middleContainer:{
        backgroundColor:'#0aae6c',
        justifyContent:'center',
       // height:'15%',
       flex:1.5,
        width:'100%',
        minwidth:'380px',
    },
    lastContainer:{
        flexDirection:'row',
        backgroundColor:'#e3eaea',
        justifyContent:'center',
       // height:'35%',
       flex:8.5,
        width:'100%',
        minWidth:'380px'
       // flexWrap:'wrap',
        
    },
    Profile:{
        top:'-15%',
       // width:'30%',
        height:'100%',
        flex:3,
        margin:5,
        padding:5,       
        alignItems:'center',
        alignContent:'center',
        flexDirection:'column',
        zIndex:1,
        minWidth:'120px',
        overflow:'auto',
    },
    container: {
        //height:'100%',
        width:'100%',

        flex:10,
        flexDirection:'column',
        backgroundColor: '#0eca7e',
        alignItems: 'center',
        justifyContent: 'flex-start',
        //flexWrap:'nowrap',
       // overflow:'auto',
        zIndex:0,
        minWidth:'380px'
      },
      content:{
         //height:height,
        //width:'65%',
        minWidth:'200px',
        height:'100%',
        flex:7,
         flexDirection:'column',
         backgroundColor: '#e3eaea',
         alignItems: 'flex-start',
         justifyContent: 'center',
         alignContent:'flex-start',
         //flexWrap:'wrap',
        // overflow:'auto',
         // top:100,
       },
      tileContainer:{ 
        //height:height,
        flex:9,
        width:'100%',
        height:'80%',
        flexDirection:'column',
        backgroundColor: '#e3eaea',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent:'flex-start',
        //flexWrap:'wrap',
        //overflow:'auto',
        // top:100,
      },
      lanConatiner:{ 
        //flex:1,
        width:'100%',
       // width:'200px',
        flexDirection:'row',
        backgroundColor: '#e3eaea',
        justifyContent: 'space-between',
       // justifyContent: '//#endregion',
       // alignContent:'center',
       // flexWrap:'wrap',
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