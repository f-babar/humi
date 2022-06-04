import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import EmployeeCardItem from './EmployeeCardItem';
import Config from 'react-native-config';
import LoadingIndicator from '../../components/LoadingIndicator';

const EmployeeCards = ({navigation}) => {
  const [employeeCardsData, setEmployeeCardsData] = React.useState([]);
  const [cardName, setCardName] = React.useState('');
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    getCardsData();
  }, [getCardsData]);

  const searchCards = () => {
    getCardsData();
  };

  const refreshData = () => {
    setIsRefreshing(true);
    getCardsData();
  };

  const getCardsData = React.useCallback(() => {
    setIsLoadingData(true);
    let endpoint = Config.API_URL;
    if (cardName !== '') {
      endpoint += '?fname=' + cardName;
    }

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        if (response && response?.data) {
          setEmployeeCardsData(response.data);
        }
        setIsLoadingData(false);
        setIsRefreshing(false);
      })
      .catch(error => {
        setIsLoadingData(false);
        console.log(error);
      });
  }, [cardName]);

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.searchConatiner}>
        <View style={styles.searchBoxContainer}>
          <TextInput
            placeholder={'Card Name'}
            placeholderTextColor={'lightgrey'}
            value={cardName}
            onChangeText={setCardName}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity
          disabled={isLoadingData}
          onPress={() => searchCards()}
          style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {isLoadingData && <LoadingIndicator />}

      <FlatList
        data={employeeCardsData}
        renderItem={({item}) => (
          <EmployeeCardItem item={item} navigation={navigation} />
        )}
        onRefresh={refreshData}
        refreshing={isRefreshing}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  searchConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  searchBoxContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'lightgrey',
  },
  searchInput: {
    padding: 5,
  },
  searchButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
  },
});

export default EmployeeCards;
