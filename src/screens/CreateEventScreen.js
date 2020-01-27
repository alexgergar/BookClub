import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-elements';

export default class MainEvent extends Component {
  state = {
    bookTitle: null,
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headLineContainer}>
          <Text style={styles.createHeadlineText}>Create A New BookClub Event</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Type a Book Title"
            onChangeText={bookTitle => this.setState({bookTitle})}
            value={this.state.email}
          />
        </View>
      </SafeAreaView>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookPlaceholderImageWidth = windowWidth * 0.3;
const bookPlaceholderImageHeight = bookPlaceholderImageWidth * 1.6;
const starterHeightPositionForInformationTextUnderBookImage =
  bookPlaceholderImageHeight + 40 - windowHeight * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
  },
  headLineContainer: {
    top: windowHeight * 0.3,
    marginBottom: 10,
    alignItems: 'center',
  },
  createHeadlineText: {},
  textInput: {
    height: 40,
    width: windowWidth * 0.9,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingLeft: 10,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach

/* Color Theme Swatches in RGBA
.Book-cover-options-1-rgba { color: rgba(58, 86, 114, 1); }
.Book-cover-options-2-rgba { color: rgba(235, 226, 205, 1); }
.Book-cover-options-3-rgba { color: rgba(29, 51, 66, 1); }
.Book-cover-options-4-rgba { color: rgba(165, 172, 181, 1); }
.Book-cover-options-5-rgba { color: rgba(247, 182, 135, 1); }

/* Color Theme Swatches in HSLA *
.Book-cover-options-1-hsla { color: hsla(210, 32, 33, 1); }
.Book-cover-options-2-hsla { color: hsla(42, 42, 86, 1); }
.Book-cover-options-3-hsla { color: hsla(205, 37, 18, 1); }
.Book-cover-options-4-hsla { color: hsla(210, 9, 67, 1); }
.Book-cover-options-5-hsla { color: hsla(25, 88, 75, 1); }
*/
