import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {bookClubEvent} from '../utils/testInfo';
import {Avatar, Badge} from 'react-native-elements';
import AvatarSpread from './AvatarSpread'

export default class EventDetails extends Component {
  state = {
    showAllAttendeesInfo: false,
  };

  toggleShowAllAttendeesInfo = () => {
    this.setState({
      showAllAttendeesInfo: !this.state.showAllAttendeesInfo,
    });
  };

  render() {
    const {event} = this.props;
    return (
      <View>
        <View style={styles.headlineView}>
          <Text style={styles.headlineText}>Who is coming?</Text>
        </View>
        <View style={styles.whoIsComingListContainer}>
          {event !== null && <AvatarSpread event={event} color={'white'} fontSize={14} />}
        </View>
        <View style={styles.headlineView}>
          <Text style={styles.headlineText}>Info</Text>
        </View>
        <View style={styles.importantInfoContainer}>
          <Text style={styles.eventDetailsText}>
            {event.host.displayName.split(' ')[0]} wanted you to know...
          </Text>
          {event !== null && 
            <Text style={styles.eventDetailsQuoteText}>
              {event.eventLocation.detailsForLocation}
            </Text>
          }
        </View>
        {event.detailsForEvent !== '' && (
          <>
            <View style={styles.headlineView}>
              <Text style={styles.headlineText}>Just so you know</Text>
            </View>
            <View style={styles.importantInfoContainer}>
              {event !== null && 
                <Text style={styles.eventDetailsText}>
                  {bookClubEvent.detailsForEvent}
                </Text>}
            </View>
          </>
        )}
      </View>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  hortizontalLine: {
    padding: 15,
    marginLeft: '20%',
    marginRight: '20%',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
  },
  whatToBringContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(165, 172, 181, 0.2)',
    padding: 15,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(165, 172, 181, 0.21)',
    borderWidth: 1.5,
  },
  cardTitleStyle: {
    textTransform: 'uppercase',
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
  },
  headlineView: {
    left: '5%',
    paddingTop: 10,
  },
  headlineText: {
    textTransform: 'uppercase',
    color: '#585D61',
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  whoIsComingListContainer: {
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    marginBottom: 10,
  },
  eventDetailsText: {
    marginLeft: '5%',
    marginRight: '5%',
    color: '#1E3342',
    fontFamily: 'Montserrat-Regular',
  },
  eventDetailsQuoteText: {
    fontFamily: 'Karla-Italic',
    marginLeft: '8%',
    marginRight: '8%',
    color: '#1E3342',
  },
  importantInfoContainer: {
    marginBottom: 10,
  },
  avatarContainer: {
    backgroundColor: '#A5ADB5',
    borderRadius: 5,
  },
  seeMoreAttendeesBadge: {
    backgroundColor: '#F8B787',
  },
  badgeText: {
    padding: 10,
    fontFamily: 'Karla-Regular',
  },
});
