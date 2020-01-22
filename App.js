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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainEventScreen from './src/screens/MainEventScreen';

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
    return <MainEventScreen />;
  }


  return (
    <MainEventScreen />
  );
};


export default App;
