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
import CreateEventAttendeesScreen from './src/screens/CreateEventAttendeesScreen';
import CreateEventVerifyInfoScreen from './src/screens/CreateEventVerifyInfoScreen';
import CreateEventEditAttendeesListScreen from './src/screens/CreateEventEditAttendeesListScreen';
import CreateEventPickDateScreen from './src/screens/CreateEventPickDateScreen';
import CreateEventNewClubNameScreen from './src/screens/CreateEventNewClubNameScreen';
import UserContext from './src/context/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainStack = user => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    {user ? (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainEvent" component={MainEventScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        <Stack.Screen name="SelectedBook" component={SelectedBookScreen} />
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
          name="CreateEventEditAttendeesList"
          component={CreateEventEditAttendeesListScreen}
        />
        <Stack.Screen
          name="CreateEventNewClubName"
          component={CreateEventNewClubNameScreen}
        />
        <Stack.Screen name="SignOutBook" component={SignOutScreen} />
      </>
    ) : (
      <>
        <Stack.Screen name="SignUpLogin" component={SignUpLoginScreen} />
        <Stack.Screen
          name="OnboardingOneProfile"
          component={OnboardingOneProfileScreen}
        />
        <Stack.Screen
          name="OnboardingTwoAvatar"
          component={OnboardingTwoAvatarScreen}
        />
      </>
    )}
  </Stack.Navigator>
);

const CreateStack = user => (
  <Stack.Navigator initialRouteName="CreateEvent" headerMode="none">
    <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    <Stack.Screen name="SelectedBook" component={SelectedBookScreen} />
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
      name="CreateEventEditAttendeesList"
      component={CreateEventEditAttendeesListScreen}
    />
    <Stack.Screen
      name="CreateEventNewClubName"
      component={CreateEventNewClubNameScreen}
    />
    <Stack.Screen name="MainEvent" component={MainEventScreen} />
  </Stack.Navigator>
);

const TabNav = user => (
  <Tab.Navigator
    // labeled={false}
    shifting={true}
    barStyle={{backgroundColor: 'white'}}>
    <Tab.Screen
      name="Main"
      options={{
        tabBarLabel: 'Main',
        tabBarIcon: ({color, size}) => (
          <Icon
            name="home"
            type="feather"
            // color='#517fa4'
          />
        ),
      }}>
      {() => <MainStack />}
    </Tab.Screen>
    {/* <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <Icon
            name="home"
            type="feather"
            // color='#517fa4'
          />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Create"
      options={{
        tabBarLabel: 'Create',
        tabBarIcon: ({color, size}) => (
          <Icon
            name="plus-circle"
            type="feather"
            // color='#517fa4'
          />
        ),
      }}>
      {() => <CreateStack />}
    </Tab.Screen>
  </Tab.Navigator>
);

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onChange() {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onChange);
    return subscriber();
  }, []);

  if (initializing) {
    return <LoadingAuthScreen />;
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <TabNav />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
