import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const EmployeeCardDetail = props => {
  const {route} = props;
  const item = route?.params?.item;
  const type = route?.params?.type;

  const RenderCardSets = () => {
    return (
      <View>
        <Text style={styles.setsTitle}>Sets:</Text>
        <View>
          {item?.card_sets.map((set, index) => (
            <View key={set?.set_code + '_' + index} style={styles.setItem}>
              <View style={styles.dot} />
              <Text>{set?.set_name}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        {item?.level && (
          <Text>
            <Text style={styles.boldText}>Level:</Text> {item?.level}
          </Text>
        )}
        <Text style={styles.topRightSideContainer}>
          <Text style={styles.boldText}>{item?.type}</Text> : {item?.race}
        </Text>
      </View>
      <Image
        style={styles.cardItemImage}
        source={{uri: item?.card_images[0]?.image_url}}
      />
      {item?.attribute && (
        <Text style={styles.boldText}>{item?.attribute}</Text>
      )}

      <View style={styles.descriptioBox}>
        <Text style={styles.descriptionText}>{item?.desc}</Text>
      </View>

      {type === 'Monster' && (
        <Text style={styles.atkDefText}>
          ATK: {item?.atk} / DEF: {item?.def}
        </Text>
      )}

      {item?.card_sets && <RenderCardSets />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardItemImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 20,
    alignSelf: 'center',
  },
  container: {
    padding: 20,
  },
  descriptioBox: {
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 13,
    color: 'grey',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 5,
    backgroundColor: 'black',
  },
  setItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  setsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  atkDefText: {
    marginVertical: 10,
    textAlign: 'right',
  },
  boldText: {
    fontWeight: 'bold',
  },
  topRightSideContainer: {
    flex: 1,
    textAlign: 'right',
  },
  topRow: {
    flexDirection: 'row',
  },
});

export default EmployeeCardDetail;
