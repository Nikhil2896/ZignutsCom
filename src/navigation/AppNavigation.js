import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import Summary from '../screens/Summary';
import History from '../screens/History';
import { Routes } from '../constants/Constants';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Name}>
        <Stack.Screen
          name={Routes.Products}
          component={Products}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.ProductDetails}
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Cart}
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Summary}
          component={Summary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.History}
          component={History}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
