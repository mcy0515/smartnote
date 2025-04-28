import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainMenu from './screens/MainMenu';
import NoteScreen from './screens/NoteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: '메인 메뉴' }} />
        <Stack.Screen name="Note" component={NoteScreen} options={{ title: '노트 작성' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
