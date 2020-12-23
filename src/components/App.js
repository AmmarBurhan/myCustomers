import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserAuth from './UserAuth';
import MyCustomers from './myCustomers';

const Stack = createStackNavigator();

export default function App() {
  let [isSignedIn, setIsSignedIn] = React.useState(false);
  let [uid, setUid] = React.useState(null);

  function setUser (userId){
    if (userId!==null){
    setUid(userId);
    setIsSignedIn(true);
    }
    else
    {
      setIsSignedIn(false);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
      {isSignedIn?
        (<Stack.Screen name="myCustomersList" component={MyCustomers} options= {{headerTitle:'MyCustomers'}} initialParams = {{userId: uid}} />)
        :(<Stack.Screen name="UserAuth" component={UserAuth} options= {{headerTitle:'Welcome!'}} initialParams= {{userSigned:setUser}} />)
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
