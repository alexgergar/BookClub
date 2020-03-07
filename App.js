import React, {useState, useEffect, useMemo} from 'react';
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
import CreateEventAttendeesScreen from './src/screens/CreateEventAttendeesScreen';
import CreateEventVerifyInfoScreen from './src/screens/CreateEventVerifyInfoScreen';
import CreateEventPickDateScreen from './src/screens/CreateEventPickDateScreen';
import CreateEventNewClubNameScreen from './src/screens/CreateEventNewClubNameScreen';
import BookViewScreen from './src/screens/BookViewScreen';
import UserContext from './src/context/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="MainEvent" component={MainEventScreen} />
    <Stack.Screen name="BookView" component={BookViewScreen} />
    <Stack.Screen name="Sign Out" component={SignOutScreen} />
    <Stack.Screen name="OnBoarding" component={OnBoardingStack} />
  </Stack.Navigator>
);

const CreateStack = () => (
  <Stack.Navigator initialRouteName="CreateEvent" headerMode="none">
    <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    <Stack.Screen
      name="SelectedBook"
      component={SelectedBookScreen}
      initialParams={{onUpdate: false}}
    />
    <Stack.Screen
      name="CreateEventPickDate"
      component={CreateEventPickDateScreen}
    />
    <Stack.Screen
      name="CreateEventAddDetails"
      component={CreateEventAddDetailsScreen}
    />
    <Stack.Screen
      name="CreateEventAttendees"
      component={CreateEventAttendeesScreen}
    />
    <Stack.Screen
      name="CreateEventVerifyInfo"
      component={CreateEventVerifyInfoScreen}
    />
    <Stack.Screen
      name="CreateEventNewClubName"
      component={CreateEventNewClubNameScreen}
    />
    <Stack.Screen name="LoadingAuth" component={LoadingAuthScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator initialRouteName="SignUpLogin" headerMode="none">
    <Stack.Screen name="SignUpLogin" component={SignUpLoginScreen} />
    <Stack.Screen
      name="OnboardingOneProfile"
      component={OnboardingOneProfileScreen}
    />
    <Stack.Screen
      name="OnboardingTwoAvatar"
      component={OnboardingTwoAvatarScreen}
    />
    <Stack.Screen name="LoadingAuth" component={LoadingAuthScreen} />
  </Stack.Navigator>
);

const OnBoardingStack = () => (
  <Stack.Navigator initialRouteName="OnboardingOneProfile" headerMode="none">
    <Stack.Screen
      name="OnboardingOneProfile"
      component={OnboardingOneProfileScreen}
    />
    <Stack.Screen
      name="OnboardingTwoAvatar"
      component={OnboardingTwoAvatarScreen}
    />
  </Stack.Navigator>
);

const SignOutStack = () => (
  <Stack.Navigator initialRouteName="Sign Out" headerMode="none">
    <Stack.Screen name="Sign Out" component={SignOutScreen} />
    <Stack.Screen name="AuthStack" component={AuthStack} />
  </Stack.Navigator>
);

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: '#1E3342',
        activeBackgroundColor: 'rgba(58, 86, 114, 0.2)',
        labelStyle: {fontFamily: 'Montserrat-Bold'},
      }}>
      <Drawer.Screen name="Home" component={MainStack} />
      <Drawer.Screen name="Create New Event" component={CreateStack} />
      <Drawer.Screen name="Sign Out" component={SignOutStack} />
    </Drawer.Navigator>
  )
    
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    function changeAuthState(user) {
      setUser(user);
      if (isLoading) setIsLoading(false);
    }
    const subscriber = auth().onAuthStateChanged(changeAuthState);
    return subscriber;
  }, []);

  if (isLoading) {
    return <LoadingAuthScreen />;
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        {user ? (
          <DrawerNav />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
