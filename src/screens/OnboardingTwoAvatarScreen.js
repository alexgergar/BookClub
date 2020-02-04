import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Button, Avatar} from 'react-native-elements';
import {avatarImages} from '../utils/listOfAvatars';
import auth from '@react-native-firebase/auth';
import UserContext from '../context/UserContext';

export default class OnboardingTwoAvatar extends Component {
  static contextType = UserContext;
  state = {
    showImageAdd: true,
    avatarSelected: false,
    idSelection: null,
    selectedAvatarData: null,
  };

  componentDidMount() {
   const {
     firstName,
     lastName,
     phoneNumber,
   } = this.props.navigation.state.params;
   console.log(phoneNumber);
   console.log(firstName)
   console.log(lastName);

  }

  handleAvatarAddPress = avatar => {
    console.log(avatar.id);
    this.setState({
      avatarSelected: true,
      idSelection: avatar.id,
      selectedAvatarData: avatar,
    });
  };

  handleUpdateToProfile = async () => {
    const {firstName, lastName, phoneNumber} = this.props.navigation.state.params;
    const update = {
      displayName: `${firstName} ${lastName}`,
      // phoneNumber: phoneNumber,
      // photoURL: this.state.selectedAvatarData.id,
    };
    console.log(update);
    await auth()
      .currentUser.updateProfile(update)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => console.log(error));
  };

  handleContinuePress = () => {
    this.handleUpdateToProfile();
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.topContainer}>
          <View style={styles.titleRowView}>
            <Text style={styles.titleTexth1}>Pick Your Avatar</Text>
            <Button
              titleStyle={styles.skipButtonTitleStyle}
              containerStyle={styles.skipButtonContainerStyle}
              buttonStyle={styles.skipButtonContainerStyle}
              title="Skip"
              type="clear"
              onPress={this.handleContinuePress}
            />
          </View>
        </View>
        <View style={styles.middleContainer}>
          {this.state.avatarSelected && (
            <View style={styles.selectedAvatarView}>
              <Image
                resizeMode={'contain'}
                source={this.state.selectedAvatarData.src}
                style={[styles.avatarSelectedView]}
              />
            </View>
          )}
          <View style={styles.listView}>
            <FlatList
              data={avatarImages}
              renderItem={({item}) => (
                <TouchableHighlight
                  style={{flex: 1}}
                  onPress={() => this.handleAvatarAddPress(item)}>
                  <View
                    style={{
                      borderWidth:
                        this.state.avatarSelected &&
                        this.state.idSelection === item.id
                          ? 1
                          : 0,
                    }}>
                    <Image source={item.src} style={[styles.galleryImage]} />
                  </View>
                </TouchableHighlight>
              )}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            buttonStyle={styles.continueButtonViewContainer}
            titleStyle={styles.continueTitleButtonStyle}
            title="Continue"
            onPress={this.handleContinuePress}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: windowWidth * 0.07,
  },
  topContainer: {
    zIndex: 5,
  },
  titleRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButtonTitleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: '#1E3342',
  },
  skipButtonContainerStyle: {
    paddingVertical: 0,
    alignSelf: 'center',
  },
  detailsContainer: {
    top: windowHeight * 0.05,
  },
  titleTexth1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 26,
  },
  middleContainer: {
    flex: 1,
  },
  selectedAvatarView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSelectedView: {
    height: '100%',
    width: '100%',
  },
  listView: {
    flex: 1,
    padding: 10,
  },
  galleryImage: {
    height: windowHeight * 0.15,
    width: windowHeight * 0.15,
  },
  addPhotoText: {
    paddingTop: 10,
    fontFamily: 'Karla-Regular',
    fontSize: 18,
  },
  bottomContainer: {
    flexShrink: 1,
    justifyContent: 'flex-end',
  },
  backgroundStarterImage: {
    height: '80%',
    alignSelf: 'center',
  },
  continueButtonViewContainer: {
    backgroundColor: '#1E3342',
    borderRadius: 5,
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-Regular',
  },
});
