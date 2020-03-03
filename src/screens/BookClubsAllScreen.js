import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import GroupTile from '../components/GroupTile';

export default class BookClubsAll extends Component {
  state = {
    events: [],
    bookClubs: [],
  };

  componentDidMount() {
    this.getBookClubsFromUID();
  }

  getBookClubsFromUID = () => {
    let user = this.context;
    firestore()
      .collection('bookclubs')
      .where('membersUID', 'array-contains', user.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          let club = {
            bookClubID: doc.id,
            nameOfBookClub: doc.data().nameOfBookClub,
            members: doc.data().members,
            eventHistory: doc.data().eventHistory,
          };
          this.setState(prevState => ({
            bookClubs: [...prevState.bookClubs, club],
          }));
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  render() {
    const {events, bookClubs} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.bookclubsContainer, styles.headlineView]}>
          <Text style={styles.homeHeadlineOneText}>Your BookClubs</Text>
        </View>
          <View style={styles.bookClubFlatListView}>
            {bookClubs.length > 0 && 
              <FlatList
                data={bookClubs}
                keyExtractor={item => item.bookClubID.toString()}
                renderItem={({item}) => <GroupTile containerStyle={styles.bookClubListItemContainer} bookClub={item} />}
              />}
          </View>
      </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E3E4E6',
  },
  headlineView: {
    marginHorizontal: windowHeight * 0.03,
    marginTop: windowHeight * 0.03,
  },
  homeHeadlineOneText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  bookclubsContainer: {
    marginTop: '4%',
  },
  bookClubFlatListView: {
    marginTop: '2%',
    height: windowHeight * 0.2,
    marginLeft: windowHeight * 0.03,
  },
  bookClubListItemContainer: {
    marginRight: 10,
  },
});

BookClubsAll.contextType = UserContext;
