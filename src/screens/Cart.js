import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Theme from '../constants/Theme';
import ItemsList from '../shared/ItemsList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routes } from '../constants/Constants';
import { CommonActions } from '@react-navigation/native';

const Cart = props => {
  const [data, setData] = useState([]);
  const [orderTotal, setOrderTotal] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const existingDataString = await AsyncStorage.getItem('CART');
    let jsonData = JSON.parse(existingDataString);
    setOrderTotal(getorderTotal(jsonData));
    setData(jsonData);
  };

  const getorderTotal = data => {
    let val = (totalVal = data.reduce((a, b) => {
      return a + b.price;
    }, 0));
    return val.toFixed(2);
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('CART');
      goToSummary();
    } catch (e) {
      console.log('Error clearing cart');
    }
  };

  const goToSummary = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Routes.Products }, { name: Routes.Summary }],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ItemsList
        data={data}
        from={Routes.Cart}
        emptyText={'No items in cart'}
        navigation={props.navigation}
      />
      <View style={styles.proceedView}>
        <Text style={styles.proceedText}>Order Total : {orderTotal} ₹</Text>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={clearCart}>
          <Text style={styles.addCart}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  addCart: {
    backgroundColor: Theme.colors.secondaryColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 4,
    fontWeight: '500',
  },
  proceedView: {
    backgroundColor: Theme.colors.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proceedText: {
    color: Theme.colors.white,
    fontWeight: '500',
    fontSize: Theme.fontSize.font15,
  },
});

export default Cart;
