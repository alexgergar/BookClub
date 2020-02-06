import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';

const FlatListGroupOptions = props => (
  <FlatList
    numColumns={2}
    data={props.listOfAttendeeOptions}
    keyExtractor={item => item.id.toString()}
    columnWrapperStyle={{justifyContent: 'space-around'}}
    renderItem={({ item }) => (
      <TouchableWithoutFeedback onPress={() => props.onListItemPress(item)}>
        <View
          style={[
            styles.optionsContainer,
            item.createNewClub ? styles.backgroundOne : styles.backgroundTwo,
            item.id === props.isSelectedID && styles.selectedView,
          ]}>
          {item.createNewClub && (
            <>
              <Icon name="group-add" type="material" />
              <Text style={[styles.createNewClubText]}>{item.name}</Text>
            </>
          )}
          {!item.createNewClub && (
            <Text style={styles.createNewClubText}>{item.name}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    )}
  />
);

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  optionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
  },
  backgroundOne: {
    backgroundColor: '#A5ADB5',
  },
  backgroundTwo: {
    backgroundColor: '#EBE2CD',
  },
  createNewClubText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedView: {
    borderWidth: 2,
  },
});

export default FlatListGroupOptions;
