import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Button} from 'react-native-elements';

export default class SignOut extends React.Component {
  state = {errorMessage: null};

  handleLogout = async () => {
    await firebase.auth().signOut()
      .then(() => this.props.navigation.navigate('SignUpLogin'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <Image
          style={styles.backgroundImage}
          source={require('../utils/manonbook.png')}
          resizeMode={'contain'}
        />
        <Text style={styles.goodbyeText}>Until Next Time...</Text>
        <Button
          title="Sign Out"
          onPress={this.handleLogout}
          containerStyle={styles.signOutButtonContainer}
          buttonStyle={styles.signOutButtonButtonStyle}
        />
      </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 6,
    // justifyContent: 'flex-start',
    width: '70%',
    // top: windowHeight * 0.1,
    // backgroundColor: 'pink',
  },
  goodbyeText: {
    flex: 1,
    fontSize: 24,
  },
  signOutButtonContainer: {
    margin: 10,
    width: '50%',
    flex: 3,
    borderRadius: 100,
  },
  signOutButtonButtonStyle: {
    backgroundColor: '#55707b',
    borderColor: '#55707b',
  },
});
