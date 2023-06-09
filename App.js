import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOrRegister from './component/LoginOrRegister';
import Profile from './component/Profile';
import Home from './component/Home';
import UserDashboard from './component/UserDashboard';
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
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="LoginOrRegister" component={LoginOrRegister}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="UserDashboard" component={UserDashboard}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}