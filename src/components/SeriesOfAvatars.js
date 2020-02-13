import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar, Badge} from 'react-native-elements';

const handleGetInitials = fullName => {
  return fullName
    .split(' ')
    .map(name => name[0])
    .join('');
};

const ListOfAvatars = props =>
  props.groupOfUsers.reduce((shownedAvatars, person, index) => {
    if (index < props.numOfAvatarsToShow) {
      const initialsOfName = handleGetInitials(person.displayName);
      shownedAvatars.push(
        <Avatar
          key={index}
          size={30}
          rounded
          title={initialsOfName}
          containerStyle={props.avatarContainerStyle}
        />,
      );
    }
    return shownedAvatars;
  }, []);

export default class SeriesOfAvatars extends Component {
  static defaultProps = {
    numOfAvatarsToShow: 4,
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <ListOfAvatars
          numOfAvatarsToShow={this.props.numOfAvatarsToShow}
          groupOfUsers={this.props.groupOfUsers}
          avatarContainerStyle={this.props.avatarContainerStyle}
        />
        <View>
          {this.props.groupOfUsers.length >
            this.props.numOfAvatarsToShow && (
              <>
              <Avatar
                size={30}
                overlayContainerStyle={styles.avatarContainer}
                rounded
                icon={{ name: 'more-horizontal', type: 'feather' }}
              />
             <Badge
                badgeStyle={styles.badgeStyle}
                value={
                  <Text style={styles.badgeText}>
                    {this.props.groupOfUsers.length -
                      this.props.numOfAvatarsToShow}
                  </Text>
                }
                containerStyle={{ position: 'absolute', top: -8, right: -4 }}
              />
              </>
            )}
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  badgeStyle: {
    backgroundColor: '#3A5673',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
});
