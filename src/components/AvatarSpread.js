import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import AvatarForList from './AvatarForList';
import { Avatar, Badge } from 'react-native-elements';

export default class AvatarSpread extends Component {

  static defaultProps = {
    excludeAfter: 4,
    moreAvatarSize: 30,
    avatarSize: 40,
  };


  render() {
    const {excludeAfter, event, fontSize, avatarSize, color} = this.props;
    const excludeAfterIndex = excludeAfter;
    const listOfAttendees = event.attendees.reduce(
      (shownedAttendees, attendee, index) => {
        if (index < excludeAfterIndex) {
          shownedAttendees.push(
            <AvatarForList 
              key={index}
              fontSize={fontSize}
              avatarSize={avatarSize}
              color={color}
              displayName={attendee.displayName}
              overlayStyle={styles.overlayStyle}
            />
          );
        }
        return shownedAttendees;
      },
      [],
    );

    return (
    <View style={styles.container}>
      {listOfAttendees}
      {event.attendees.length > excludeAfter && (
        <View>
          <Avatar
            rounded
            size={this.props.moreAvatarSize}
            overlayContainerStyle={styles.avatarContainer}
            icon={{name: 'more-horizontal', type: 'feather'}}
          />
          <Badge
            badgeStyle={styles.seeMoreAttendeesBadge}
            value={
              <Text style={styles.badgeText}>
                {event.attendees.length - excludeAfter}
              </Text>
            }
            containerStyle={{position: 'absolute', top: -6, right: -6}}
          />
        </View>
        )
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  overlayStyle: {
    backgroundColor: '#A5ADB5',
  },
});
