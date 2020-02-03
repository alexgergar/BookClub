import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Input, Button} from 'react-native-elements';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import validateEmail from '../utils/validateEmail';

export default class SignUpLogin extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    showSignUp: true,
    showBottomBar: true,
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide = () => {
    this.setState({
      showBottomBar: true,
    });
  };

  onLoginTextPress = () => {
    this.setState({
      showSignUp: false,
      showBottomBar: true,
    });
  };

  onSignUpTextPress = () => {
    this.setState({
      showSignUp: true,
      showBottomBar: true,
    });
  };

  onFocusTextInput = () => {
    if (this.state.showBottomBar) {
      this.setState({
        showBottomBar: false,
      });
    }
  };

  onBlurTextInput = () => {
    if (this.state.showBottomBar) {
      this.setState({
        showBottomBar: true,
      });
    }
  };

  handleSubmit = () => {
    if (validateEmail(this.state.email) && this.state.password.length > 6) {
      this.state.showSignUp ? this.handleSignUp() : this.handleLogin();
    }
  };

  handleLogin = async () => {
    const {email, password} = this.state;
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  handleSignUp = async () => {
    const {email, password} = this.state;
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('OnboardingOneProfile'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    if (this.context) {
      let user = this.context;
      return (
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.topContainer}>
            <View style={styles.authOptionsRow}>
              <TouchableHighlight onPress={() => this.onLoginTextPress()}>
                <View>
                  <Text
                    style={
                      this.state.showSignUp
                        ? styles.authOptionsInActiveText
                        : styles.authOptionsActiveText
                    }>
                    Login
                  </Text>
                  {!this.state.showSignUp && (
                    <View style={styles.authOptionsActiveLine} />
                  )}
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.onSignUpTextPress()}>
                <View style={styles.signUpText}>
                  <Text
                    style={
                      this.state.showSignUp
                        ? styles.authOptionsActiveText
                        : styles.authOptionsInActiveText
                    }>
                    Sign Up
                  </Text>
                  {this.state.showSignUp && (
                    <View style={styles.authOptionsActiveLine} />
                  )}
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.middleContainer}>
              <View
                style={[
                  this.state.showBottomBar
                    ? styles.welcomeHeadliner
                    : styles.welcomeHeadlinerAlt,
                ]}>
                {this.state.showSignUp && (
                  <>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.headlineOne}>Hello </Text>
                      <Text style={styles.bold}>Reader,</Text>
                    </View>
                    <View style={styles.headlineTwo}>
                      <Text style={styles.signUpBelowText}>
                        Enter your informations below or login with a social
                        account
                      </Text>
                    </View>
                  </>
                )}
                {!this.state.showSignUp && (
                  <>
                    <Text style={styles.headlineOne}>Welcome Back,</Text>
                    <View style={styles.headlineTwo}>
                      <Text style={styles.bold}>Reader</Text>
                    </View>
                  </>
                )}
              </View>
              <View
                style={[
                  this.state.showBottomBar
                    ? styles.textInputView
                    : styles.textInputViewAlt,
                ]}>
                <Input
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.placeholderInputContainer}
                  onFocus={() => this.onFocusTextInput()}
                  onBlur={() => this.onBlurTextInput()}
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={email => this.setState({email})}
                  value={this.state.email}
                  errorStyle={{color: 'red'}}
                  errorMessage={this.state.errorMessage}
                  keyboardType="email-address"
                />
                <Input
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.placeholderInputContainer}
                  secureTextEntry
                  onFocus={() => this.onFocusTextInput()}
                  onBlur={() => this.onBlurTextInput()}
                  autoCapitalize="none"
                  placeholder="Password"
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                  errorStyle={{color: 'red'}}
                  errorMessage={this.state.errorMessage}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>

          {this.state.showBottomBar && (
            <>
              {!this.state.showSignUp && (
                <Button
                  containerStyle={styles.passwordButtonContainer}
                  titleStyle={styles.passwordButton}
                  buttonStyle={{paddingLeft: 0}}
                  title="Forgot Password?"
                  type="clear"
                />
              )}

              <View style={styles.bottomGreyBarView} />

              <View style={styles.buttonContainer}>
                <Button
                  buttonStyle={styles.submitButtonViewContainer}
                  icon={{name: 'arrow-right', color: 'white', type: 'feather'}}
                  onPress={this.handleSubmit}
                />
              </View>
            </>
          )}
        </SafeAreaView>
      );
    }
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
    paddingHorizontal: paddingForContent,
    paddingTop: paddingForContent,
  },
  authOptionsRow: {
    top: windowHeight * 0.01,
    flexDirection: 'row',
  },
  authOptionsInActiveText: {
    fontFamily: 'Karla-Regular',
    fontSize: 26,
    color: '#848B91',
  },
  signUpText: {
    marginLeft: windowWidth * 0.1,
  },
  authOptionsActiveText: {
    fontFamily: 'Karla-Bold',
    fontSize: 25,
    color: '#0D161C',
  },
  authOptionsActiveLine: {
    borderBottomWidth: 3,
    width: '70%',
    paddingTop: 5,
    alignSelf: 'center',
    borderColor: '#F8B787',
  },
  middleContainer: {
    paddingHorizontal: paddingForContent,
    flexGrow: 1,
  },
  welcomeHeadliner: {
    marginTop: windowHeight * 0.13,
    height: windowHeight * 0.2,
  },
  welcomeHeadlinerAlt: {
    marginTop: windowHeight * 0.08,
    height: windowHeight * 0.2,
  },
  headlineOne: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 40,
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
  },
  headlineTwo: {
    justifyContent: 'center',
    height: windowHeight * 0.07,
  },
  signUpBelowText: {
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    paddingRight: windowWidth * 0.35,
  },
  textInputView: {
    marginTop: windowHeight * 0.15,
  },
  textInputViewAlt: {
    marginTop: windowHeight * 0.01,
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
    paddingLeft: paddingForContent,
  },
  passwordButton: {
    fontFamily: 'Montserrat-Regular',
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
