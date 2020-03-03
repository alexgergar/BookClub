import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import EventCardHorizontal from '../components/EventCardHorizontal';
import {FlatList} from 'react-native-gesture-handler';
import GroupTile from '../components/GroupTile';
import axios from 'axios';
import convert from 'xml-js';
import { GOODREAD_API_KEY } from 'react-native-dotenv';

export default class Home extends Component {
  state = {
    events: [],
    nonFictionBooks: [],
  };

  componentDidMount() {
    this.getNonFictionList();
    this.getUserEventsFromUID();
  }

  getUserEventsFromUID = () => {
    let user = this.context;
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({events: doc.data().events});
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  getNonFictionList = () => {
    const NYTIMES_KEY = 'UiZwU6WBk89jFzd0E8uGjZI3S5r63A0W'
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYTIMES_KEY}`, // this gets info about author from goodreads
      )
      .then(response => {
        console.log(response.data.results.books);
        this.setState({ nonFictionBooks: response.data.results.books});
      })
      .catch(error => console.log(error));
  }
  

  render() {
    const {events, bookClubs} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.upcomingContainer, styles.headlineView]}>
          <Text style={styles.homeHeadlineOneText}>Upcoming Events</Text>
        </View>
        <View style={styles.topHorizontalCard}>
          {events.length !== 0 && (
            <FlatList
              horizontal
              data={events}
              keyExtractor={item => item.eventID.toString()}
              renderItem={({ item }) => <EventCardHorizontal
                  date={item.date}
                  time={item.time}
                  bookTitle={item.bookTitle}
                  bookCover={item.bookCover}
                />}
            />)}
        </View>
        <View style={styles.quickActionButtonsView}>
          <TouchableHighlight style={styles.touchableHighlightView}>
            <View style={styles.quickActionButton}>
              <Icon
                name="ios-people"
                type='ionicon'
                color='#3A5673'
              />
              <Text style={styles.quickActionButtonTextStyle}>BookClubs</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touchableHighlightView}>
            <View style={styles.quickActionButton}>
              <Icon
                name='favorite'
                type='material'
                color='#3A5673'
              />
              <Text style={styles.quickActionButtonTextStyle}>Favorites</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touchableHighlightView}>
            <View style={styles.quickActionButton}>
              <Icon
                name="ios-chatbubbles"
                type='ionicon'
                color='#3A5673'
              />
              <Text style={styles.quickActionButtonTextStyle}>Messages</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={[styles.discoverTitleContainer, styles.headlineView]}>
          <Text style={styles.homeHeadlineOneText}>Discover</Text>
        </View>
        <View style={styles.discoverContainerView}>
          {this.state.nonFictionBooks.length > 0 && (
            <FlatList
              numColumns={3}
              data={this.state.nonFictionBooks}
              columnWrapperStyle={{justifyContent: 'space-around'}}
              keyExtractor={item => item.rank.toString()}
              renderItem={({ item }) => (
                <View style={styles.bookListItemContainer}>
                  <Image
                    style={styles.bookListImage}
                    source={{ uri: item.book_image }}
                    resizeMode={'cover'}
                  />
                  <Text>{item.title}</Text>
                </View>
              )}
            />)}
        </View>
      </SafeAreaView>
    );
  }
}
function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookListItemWidth = windowWidth * .8 * .3;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E3E4E6',
  },
  headlineView: {
    marginHorizontal: windowHeight * 0.03,
    marginTop: windowHeight * 0.03,
  },
  topHorizontalCard: {
    marginTop: '2%',
    marginLeft: windowHeight * 0.03,
  },
  homeHeadlineOneText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  quickActionButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '5%',
    top: '5%',
  },
  touchableHighlightView: {
    width: '30%',
  },
  quickActionButton: {
    aspectRatio: 1,
    ...elevationShadowStyle(5),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionButtonTextStyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase',
    color: '#3A5673',
    marginTop: '10%',
  },
  discoverTitleContainer: {
    paddingTop: '5%',
  },
  discoverContainerView: {
    marginTop: '5%',
    padding: '5%',
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bookListItemContainer: {
    width: bookListItemWidth,
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  bookListImage: {
    borderRadius: 3,
    height: bookListItemWidth * 1.6,
  },
});

Home.contextType = UserContext;
