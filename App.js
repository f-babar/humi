import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EmployeeCards from './src/screens/EmployeeCards/EmployeeCards';
import EmployeeCardDetail from './src/screens/EmployeeCardDetail/EmployeeCardDetail';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar translucent barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'red'},
        }}>
        <Stack.Screen
          name="EmployeeCards"
          component={EmployeeCards}
          options={{title: 'Employee Cards'}}
        />
        <Stack.Screen
          name="EmployeeCardDetail"
          component={EmployeeCardDetail}
          options={({route}) => ({
            title: route?.params?.name,
            headerStyle: {
              backgroundColor: route?.params?.headerColor,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
