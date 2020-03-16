import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Button} from 'react-native-elements';
import {avatarImages} from '../utils/listOfAvatars';
import UserContext from '../context/UserContext';
import BackgroundContainer from '../components/BackgroundContainer';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';

export const ListOfAvatars = props => {
  const displayedAvatarList = props.avatarList.map(item => (
    <TouchableOpacity
      key={item.id.toString()}
      onPress={() => props.handleAvatarAddPress(item)}>
      <View
        style={{
          borderWidth:
            props.avatarSelected && props.idSelection === item.id ? 1 : 0,
        }}>
        <Image source={item.src} style={[styles.galleryImage]} />
      </View>
    </TouchableOpacity>
  )); 
  return (
    <View style={{flex: 1,}}>
      <ScrollView contentContainerStyle={styles.listView}>{displayedAvatarList}</ScrollView>
    </View>
  )
};

export default class OnboardingTwoAvatar extends Component {
  state = {
    showImageAdd: true,
    avatarSelected: false,
    idSelection: null,
    selectedAvatarData: null,
    avatarURL: 'avatarOptions1.png',
  };

  handleAvatarAddPress = avatar => {
    this.setState({
      avatarSelected: true,
      idSelection: avatar.id,
      selectedAvatarData: avatar,
    });
  };

  handleGetAvatarRefFromGoogleStorage = async avatarID => {
    const avatarFile = `avatarOptions${avatarID}.png`;
    const avatarRef = await storage().ref(avatarFile);
    await avatarRef
      .getDownloadURL()
      .then(url => this.handleCreateUserInDB(url))
      .catch(error => console.log(error));
  }

  handleUpdateToGoogleAuthProfile = async authUpdate => {
    await auth().currentUser.updateProfile(authUpdate)
    .then(() => this.props.navigation.navigate('Loading'))
    .catch(error => console.log(error))
  }
  
  handleCreateUserInDB = async url => {
    let user = this.context;
    const {firstName, lastName, phoneNumber} = this.props.route.params;
    const update = {
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phoneNumber,
      avatarURL: url,
      events: [],
      bookClubs: [],
    };
    const authUpdate = {
      displayName: `${firstName} ${lastName}`,
      photoURL: url,
    }
    await firestore().collection('users')
      .doc(user.uid)
      .set(update)
      .then(() => this.handleUpdateToGoogleAuthProfile(authUpdate))
      .catch(error => console.log(error))
  }


  handleUpdateToProfile = async () => {
    const {idSelection} = this.state;
    this.handleGetAvatarRefFromGoogleStorage(idSelection);

  };

  handleContinuePress = () => {
    this.handleUpdateToProfile();
  };

  render() {
    return (
      <BackgroundContainer
        buttonTitle="Continue"
        disableButton={this.state.disableButton}
        scrollView={false}
        onButtonPress={this.handleContinuePress}>
        <View style={[styles.topContainer]}>
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
        <View style={[styles.middleContainer]}>
          {this.state.avatarSelected && (
            <View style={styles.selectedAvatarView}>
              <Image
                resizeMode={'contain'}
                source={this.state.selectedAvatarData.src}
                style={[styles.avatarSelectedView]}
              />
            </View>
          )}
            <ListOfAvatars
              avatarList={avatarImages}
              handleAvatarAddPress={this.handleAvatarAddPress}
              avatarSelected={this.state.avatarSelected}
              idSelection={this.state.idSelection}
            />
        </View>
      </BackgroundContainer>
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
    height: windowHeight * .25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSelectedView: {
    height: '100%',
    width: '100%',
  },
  listView: {
    // height: windowHeight * .65,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
});

OnboardingTwoAvatar.contextType = UserContext;
