import React, { Component } from 'react';
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
import { Button, Avatar } from 'react-native-elements';
import {avatarImages} from '../utils/listOfAvatars';


export default class OnboardingTwoAvatar extends Component {
  state = {
    showImageAdd: true,
    avatarSelected: false,
    idSelection: null,
  }

  handleAvatarAddPress = avatar => {
    console.log(avatar.id)
    this.setState({avatarSelected: true, idSelection: avatar.id});
  }

  handleContinuePress = () => {
    
  }


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
          <View style={styles.listView}>
            <FlatList
              data={avatarImages}
              renderItem={({item}) => (
                <TouchableHighlight
                  style={{flex: 1}}
                  onPress={() => this.handleAvatarAddPress(item)}>
                  <View style={{borderWidth: this.state.avatarSelected && this.state.idSelection === item.id ? 1 : 0}}>
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
  listView: {
    padding: 10,
  },
  galleryImage: {
    height: windowHeight * 0.15,
    width: windowHeight * 0.15,
    // borderWidth: 1,
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

