import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import SignUpScreen from './SignUpScreen';
import {firebase} from '@react-native-firebase/auth';
import MainEvent from './MainEventScreen';


export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  componentDidMount() {
    const user = this.context;
    if (user) {
      return <MainEvent />;
    }
  }
  handleLogin = async () => {
    const {email, password} = this.state;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => <MainEvent />)
      .catch(error => this.setState({errorMessage: error.message}));
  };

  handleSignUpSwitch = () => {
    return <SignUpScreen />;
  };

 
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.handleSignUpSwitch}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});
