import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import MainEventScreen from './src/screens/MainEventScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignUpLoginScreen from './src/screens/SignUpLoginScreen';
import LoadingAuthScreen from './src/screens/LoadingAuthScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';
import UserContext from './src/context/UserContext';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const MainStack = createStackNavigator(
  {
    SignUpLogin: SignUpLoginScreen,
    MainEvent: MainEventScreen,
    CreateEvent: CreateEventScreen,
  },
  {
    initialRouteName: 'CreateEvent',
  },
);

const AuthStack = createStackNavigator(
  {
    SignUpLogin: SignUpLoginScreen,
  },
  {
    initialRouteName: 'SignUpLogin',
  },
);

const AppNavigator = createSwitchNavigator({
  Auth: AuthStack,
  MainStack: MainStack,
});

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onChange(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscribe = firebase.auth().onAuthStateChanged(onChange);
    return subscribe();
  });

  if (!user) {
    return <SignUpLoginScreen />;
  }

  return (
    <UserContext.Provider value={user}>
      <AppContainer />
    </UserContext.Provider>
  );
}

const AppContainer = createAppContainer(AppNavigator);

export default App;
