import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetails = () => {
  return (
    <View style={styles.container}>
      <Text>ProductDetails</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ProductDetails;
