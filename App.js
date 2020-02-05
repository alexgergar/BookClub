import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import MainEventScreen from './src/screens/MainEventScreen';
import SignUpLoginScreen from './src/screens/SignUpLoginScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignOutScreen from './src/screens/SignOutScreen';
import OnboardingOneProfileScreen from './src/screens/OnboardingOneProfileScreen';
import OnboardingTwoAvatarScreen from './src/screens/OnboardingTwoAvatarScreen';
import LoadingAuthScreen from './src/screens/LoadingAuthScreen';
import SelectedBookScreen from './src/screens/SelectedBookScreen';
import CreateEventAddDetailsScreen from './src/screens/CreateEventAddDetailsScreen';
import CreateEventAddAttendeesScreen from './src/screens/CreateEventAddAttendeesScreen';
import UserContext from './src/context/UserContext';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    MainEvent: MainEventScreen,
    CreateEvent: CreateEventScreen,
    SelectedBook: SelectedBookScreen,
    CreateEventAddDetails: CreateEventAddDetailsScreen,
    CreateEventAddAttendees: CreateEventAddAttendeesScreen,
    SignOut: SignOutScreen,
  },
  {
    initialRouteName: 'CreateEventAddAttendees',
    header: null,
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    LoadingAuth: LoadingAuthScreen,
    SignUpLogin: SignUpLoginScreen,
    OnboardingOneProfile: OnboardingOneProfileScreen,
    OnboardingTwoAvatar: OnboardingTwoAvatarScreen,
  },
  {
    initialRouteName: 'LoadingAuth',
    header: null,
    headerMode: 'none',
  },
);

const AppNavigator = createSwitchNavigator({
  Auth: AuthStack,
  MainStack: MainStack,
});

// const AppNavigator = createSwitchNavigator(
//   {
//     MainStack: MainStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'MainStack',
//     header: null,
//     headerMode: 'none',
//   },
// );

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
