import { StyleSheet } from 'react-native';
import Colors from './color';


export default StyleSheet.create({
  errorText: {
    fontSize: 10,
    color: 'red',
  },
    header:{
        fontFamily:'Montserrat',
        fontSize:'36px',
        fontWeight:'700',
        fontStyle:'Bold',
        lineHeight:'50px',
    },
    
    greetingText:{
        fontFamily:'Montserrat',
        fontSize:'24px',
        fontWeight:'500',
        fontStyle:'normal',
        lineHeight:'29px',
    },
    loginContainer:{
      width:'100%',
      flexDirection:'row',
      height:'100%',
      backgroundColor:Colors.LoginRow1Color
    },
    container: {
      height:'100%',
      width:'100%',
      flexDirection:'row',
      backgroundColor: '#9BEBCC',
      alignItems: 'center',
      justifyContent: 'Center',
      flexWrap:'wrap',
    },
    textFieldcontainer: {
        flex: 1,
        backgroundColor: '#9BEBCC',
        alignItems: 'center',
        justifyContent: 'center',
       // margin:5,
      },
    loginRow1: {
        flexDirection:'colum',
        keyboardShouldPersistTaps:"always",
        width:'65%',
        height:'100%',
        backgroundColor: '#9BEBCC',
        alignItems: 'center',
        justifyContent: 'center',
        margin:0,
        flexWrap:'wrap',
      },
      loginRow2: {
        width:'35%',
        height:'100%',
        backgroundColor: '#0ccb7c',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
      },
      labelContainer: {
        position: 'absolute',
        top:-6,
        left:10,
        paddingHorizontal: 0,
        //margin:14,
        backgroundColor: 'white',
        
      },
      errorLabelContainer: {
        paddingHorizontal: 0,
        backgroundColor: '#9BEBCC',
        borderColor:'red',
        margin:5,
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',     
      },
      logo: {
        alignContent:'center',
        shadowColor: "black",
        height:50,
        width:100,
        minHeight:50,
        minWidth:50,
        shadowOffset: {
          //width: -10,
          //height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation:5
      }, 
      textGreen:{
        color:'#0ccb7c', 
        textAlign:'center',
      },
      textWhite:{
        color:'#FCFCFC',
        textAlign:'center',
      },
      loginHeaderText:{
        fontFamily: 'Montserrat',
        fontWeight:'400',
        fontSize: '36px',
        fontWeight:'500',
        fontStyle:'Bold',
        lineHeight:'50px',
        color:Colors.LoginHeaderText,
      },
      loginTextInput:{
        fontFamily: 'Roboto',
        fontStyle:'Regular',
        fontSize:'16px',
        //fontWeight:'500',
        lineHeight:'24px',
        height:'30px',
      },
      button:{
        backgroundColor:'#0ccb7c',
        borderRadius:5,
        textAlign:'center',
       // paddingHorizontal:10,
        paddingVertical:5,
        fontFamily: 'Roboto',
        fontStyle:'Medium',
        fontSize:'16px',
        fontWeight:'500',
        lineHeight:'20px',
        width:'85px',
        //margin:5,
       //width:'Auto',
        shadowOffset:{
          width:0,
          height:0,
          },
      },
      backGroundGreen:{
        backgroundColor:'#0ccb7c',
      },
      backGroundWhite:{
        backgroundColor:Colors.LoginRow1Color,
        
      },
      backGroundVeryLightGreen:{
        backgroundColor:Colors.HomeColor,
        
      },
      homeButtonContainer:{
        flexDirection:'row',
        height:'20%',flex:2,
        justifyContent:'space-evenly',
        alignItems:'flex-start',
        backgroundColor:Colors.HomeColor,
      },
    homeContainer:{
        flexDirection:'column',
        width:'100%',
        height:'100%', 
        backgroundColor:Colors.HomeColor,
        
      },
    homeContentContainer:{
        width:'100%',
        height:'60%',
        backgroundColor:Colors.HomeColor,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        flexDirection:'row',
        color:'black',
        flexWrap:'wrap', 
        
    },
    homeHeading:{
      
      fontSize:'40px',
      fontFamily: 'Montserrat',
      fontWeight:'500',
      lineHeight:'48.76px',
        
    },
    homeTextContent:{
      
      fontSize:'24px',
      lineHeight:'29.26px',
      fontFamily: 'Montserrat',
      fontWeight:'400',
        
    },
    homeLeftContainer:{
        backgroundColor:Colors.HomeColor,
        flex:1,
    },
    homeRightContainer:{
        backgroundColor:Colors.HomeColor,
        flex:1,
    },
      
  });                        
  
  
  