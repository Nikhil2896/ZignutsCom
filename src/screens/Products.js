import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Routes } from '../constants/Constants';
import Theme from '../constants/Theme';
import ItemsList from '../shared/ItemsList';

const Products = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = () => {
    axios
      .get(' https://fakestoreapi.com/products')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <ItemsList
        data={data}
        from={Routes.Products}
        emptyText={'No items available'}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default Products;
