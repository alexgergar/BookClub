import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Input, Button} from 'react-native-elements';

export default class SignUpLogin extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  handleLogin = async () => {
    const {email, password} = this.state;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('MainEvent'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  handleSignUpSwitch = () => {
    // return <SignUpScreen />;
  };

  handleSignUp = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => <MainEvent/>)
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.topContainer}>
          <View style={styles.authOptionsRow}>
            <Text style={styles.authOptionsText}>Login</Text>
            <Text style={[styles.authOptionsText, styles.signUpText]}>
              Sign Up
            </Text>
          </View>
          <View style={styles.welcomeHeadliner}>
            <Text style={styles.headlineOne}>Hello </Text>
            <Text style={[styles.headlineOne, {fontWeight: 'bold'}]}>
              Reader,
            </Text>
          </View>
          <View style={styles.textInputView}>
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.placeholderInputContainer}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
              errorStyle={{color: 'red'}}
              errorMessage={this.state.errorMessage}
            />
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.placeholderInputContainer}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              errorStyle={{color: 'red'}}
              errorMessage={this.state.errorMessage}
            />
          </View>
          <Button
            containerStyle={styles.passwordButtonContainer}
            titleStyle={styles.passwordButton}
            title="Forgot Password?"
            type="clear"
          />
        </View>
        <View style={styles.bottomGreyBarView} />
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.submitButtonViewContainer}
            icon={{name: 'arrow-right', color: 'white', type: 'feather'}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const greyBarHeight = windowWidth * 0.12;
const paddingForContent = greyBarHeight / 2;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: paddingForContent,
    paddingTop: paddingForContent,
  },
  authOptionsRow: {
    top: windowHeight * 0.01,
    flexDirection: 'row',
  },
  authOptionsText: {
    fontSize: 24,
    color: '#848B91',
  },
  signUpText: {
    marginLeft: windowWidth * 0.1,
  },
  welcomeHeadliner: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.13,
  },
  headlineOne: {
    fontSize: 40,
  },
  textInputView: {
    marginTop: windowHeight * 0.2,
  },
  inputContainer: {
    height: windowHeight * 0.1,
    paddingHorizontal: 0,
  },
  placeholderInputContainer: {
    paddingLeft: 0,
    marginLeft: 0,
    left: 0,
  },
  passwordButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
  },
  passwordButton: {
    color: '#0D161C',
    fontSize: 14,
    fontWeight: '300',
  },
  bottomGreyBarView: {
    backgroundColor: '#E3E4E6',
    justifyContent: 'flex-end',
    height: greyBarHeight,
  },
  buttonContainer: {
    zIndex: 100,
    position: 'absolute',
    bottom: paddingForContent,
    right: paddingForContent,
  },
  submitButtonViewContainer: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.12,
    borderRadius: 10,
    backgroundColor: '#1E3342',
  },
});
