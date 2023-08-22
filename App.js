import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOrRegister from './component/LoginOrRegister';
import Profile from './component/Profile';
import Home from './component/Home';
import UserDashboard from './component/UserDashboard'
import Login from './component/Login'
import { useCookies } from 'react-cookie';
import axios from "axios";

const Stack = createNativeStackNavigator();
/*
function callLogin()
{
  alert("called");
  const props={isCreate:false};
  return(
    <View>
    <LoginOrRegister  {...props}/>
    </View>
  );
}
*/
export default function App(props) {
  const [cookies, setCookie] = useCookies(['bashadan']);
var initialRouteName='Home';
var param={}

axios.defaults.baseURL = 'http://bhasha.iiit.ac.in/crowd/';

if(cookies.bashadan!='undefined' && cookies.bashadan!=null && cookies.bashadan.user!=null)
{
  initialRouteName='UserDashboard';
  const user=cookies.bashadan.user;
  axios.defaults.headers.common.Authorization=cookies.bashadan.token;
  param={...props,user:user}
}
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={initialRouteName}>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="LoginOrRegister" component={LoginOrRegister}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UserDashboard" component={UserDashboard}  initialParams={param}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}