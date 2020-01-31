import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import MainEventScreen from './src/screens/MainEventScreen';
import SignUpLoginScreen from './src/screens/SignUpLoginScreen';
import LoadingAuthScreen from './src/screens/LoadingAuthScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignOutScreen from './src/screens/SignOutScreen';
import UserContext from './src/context/UserContext';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const MainStack = createStackNavigator(
  {
    SignUpLogin: SignUpLoginScreen,
    Home: HomeScreen,
    MainEvent: MainEventScreen,
    CreateEvent: CreateEventScreen,
    SignOut: SignOutScreen,
  },
  {
    initialRouteName: 'SignUpLogin',
    header: null,
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    SignUpLogin: SignUpLoginScreen,
    SignOut: SignOutScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'SignUpLogin',
    header: null,
    headerMode: 'none', 
  },
);

const AppNavigator = createSwitchNavigator(
  {
    MainStack: MainStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'MainStack',
    header: null,
    headerMode: 'none',
  },
);

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
    const subscriber = auth().onAuthStateChanged(onChange);
    return subscriber();
  }, []);

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
