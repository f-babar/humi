import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const EmployeeCardItem = props => {
  const {navigation, item} = props;

  const goToEmployeeCardDetail = () => {
    navigation.navigate('EmployeeCardDetail', {
      name: item?.name,
      item: item,
      type: getCardType(),
      headerColor: getBackgroundColor(),
    });
  };

  const getCardType = () => {
    if (item?.type.includes('Monster')) {
      return 'Monster';
    } else if (item?.type.includes('Spell')) {
      return 'Spell';
    } else if (item?.type.includes('Trap')) {
      return 'Trap';
    }
  };

  const getBackgroundColor = () => {
    return Colors[getCardType()];
  };

  const getImageUrl = () => {
    if (item?.card_images && item?.card_images.length > 0) {
      return {uri: item?.card_images[0]?.image_url_small};
    } else {
      return require('../../assets/placeholder.jpeg');
    }
  };

  return (
    <TouchableOpacity
      onPress={() => goToEmployeeCardDetail()}
      style={styles.cardItemContainer(getBackgroundColor())}>
      <Image style={styles.cardItemImage} source={getImageUrl()} />
      <View style={styles.cardItemLeftContainer}>
        <Text numberOfLines={1} style={styles.cardItemName}>
          {item?.name}
        </Text>
        <Text style={styles.cardItemType}>{item?.type}</Text>
      </View>
      {getCardType() === 'Monster' ? (
        <View style={styles.cardItemRightContainer}>
          <Text style={styles.cardItemLevel}>{item?.level}</Text>
          <Text style={styles.cardItemAtkDef}>
            ATK{item?.atk}/{item?.def} DEF
          </Text>
        </View>
      ) : (
        <Text style={styles.cardItemRace}>{item?.race}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardItemContainer: color => ({
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgrey',
    backgroundColor: color,
  }),
  cardItemImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  cardItemName: {
    fontWeight: '500',
    color: 'black',
    marginRight: 7,
  },
  cardItemLeftContainer: {
    flex: 1,
  },
  cardItemRightContainer: {
    alignItems: 'flex-end',
  },
  cardItemType: {
    fontSize: 12,
    color: 'white',
  },
  cardItemLevel: {
    fontSize: 12,
    color: 'black',
  },
  cardItemAtkDef: {
    fontSize: 12,
    color: 'white',
  },
  cardItemRace: {
    fontSize: 12,
    color: 'white',
  },
});

export default EmployeeCardItem;
