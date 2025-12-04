import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Routes } from '../constants/Constants';
import Theme from '../constants/Theme';
import ItemsList from '../shared/ItemsList';
import ModelLoading from '../shared/ModalLoading';

const Products = props => {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = () => {
    setIsLoading(true);
    axios
      .get(' https://fakestoreapi.com/products')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
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
      <ModelLoading visible={isloading} />
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
