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
import CreateEventPickDateScreen from './src/screens/CreateEventPickDateScreen';
import CreateEventNewClubNameScreen from './src/screens/CreateEventNewClubNameScreen';
import TestScreen from './src/screens/TestScreen';
import UserContext from './src/context/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Stack.Navigator 
    initialRouteName="Home" headerMode="none">
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
      name="CreateEventNewClubName"
      component={CreateEventNewClubNameScreen}
    />
    <Stack.Screen name="SignOutBook" component={SignOutScreen} />
  </Stack.Navigator>
);

const CreateStack = () => (
  <Stack.Navigator initialRouteName="CreateEvent" headerMode="none">
    <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    <Stack.Screen
      name="SelectedBook"
      component={SelectedBookScreen}
      options={{ headerTransparent: true }}
      initialParams={{onUpdate: false}}
    />
    <Stack.Screen
      name="CreateEventPickDate"
      options={{ headerTransparent: true }}
      component={CreateEventPickDateScreen}
    />
    <Stack.Screen
      name="CreateEventAddDetails"
      options={{ headerTransparent: true }}
      component={CreateEventAddDetailsScreen}
    />
    <Stack.Screen
      name="CreateEventAttendees"
      options={{ headerTransparent: true }}
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
    <Stack.Screen name="MainEvent" component={MainEventScreen} />
  </Stack.Navigator>
);

const TabNav = () => (
  <Tab.Navigator shifting={true} barStyle={{backgroundColor: 'white'}}>
    <Tab.Screen
      name="Home"
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => <Icon name="home" type="feather" />,
      }}
      component={MainStack}
    />
    <Tab.Screen name="Test" component={TestScreen} tabBarVisible={false} options={{
      tabBarLabel: 'Test',
      tabBarVisible: false,
      tabBarIcon: ({ color, size }) => (
        <Icon name="plus-circle" type="feather" />
      ),
    }}/>
    <Tab.Screen
      name="Create"
      tabBarVisible={false}
      options={{
        tabBarLabel: 'Create',
        tabBarVisible: false,
        tabBarIcon: ({color, size}) => (
          <Icon name="plus-circle" type="feather" />
        ),
      }}
      component={CreateStack}
    />
  </Tab.Navigator>
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

  if (initializing) {
    return <LoadingAuthScreen />;
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        {user !== null ? <TabNav /> : <AuthStack />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
