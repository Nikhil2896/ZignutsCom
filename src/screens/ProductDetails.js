import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Routes } from '../constants/Constants';
import Theme from '../constants/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetails = props => {
  const data = props.route.params.data;
  const addDataToArray = async (key, newItem) => {
    try {
      const existingDataString = await AsyncStorage.getItem(key);
      let existingArray = [];
      if (existingDataString !== null) {
        existingArray = JSON.parse(existingDataString);
      }
      const isDuplicate = existingArray.some(item => item.id === newItem.id);
      if (isDuplicate) {
        props.navigation.navigate(Routes.Cart);
      }
      existingArray.push(newItem);
      const updatedDataString = JSON.stringify(existingArray);
      await AsyncStorage.setItem(key, updatedDataString);
      props.navigation.navigate(Routes.Cart);
    } catch (error) {
      console.error('Error adding data to the array:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.viewCard}>
          <Text style={styles.category}>{data.category}</Text>
          <View style={styles.imageView}>
            <Image
              source={{ uri: data.image }}
              style={styles.fullWidth}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <View style={styles.flex}>
            <Text style={styles.cost}>{data.price} ₹</Text>
            <View style={styles.flex}>
              <Icon
                name={'star'}
                size={20}
                color={Theme.colors.secondaryColor}
                style={{ opacity: 0.5 }}
              />
              <Text>
                {data.rating.rate} | {data.rating.count}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => {
              addDataToArray('CART', data);
            }}
          >
            <Text style={styles.addCart}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  viewCard: {
    backgroundColor: Theme.colors.white,
    margin: 15,
    padding: 20,
    elevation: Theme.elevation.small,
    borderRadius: 5,
  },
  imageView: {
    height: 300,
    borderWidth: Theme.borderWidth.small,
    borderColor: Theme.colors.primaryColor,
  },
  fullWidth: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontSize: Theme.fontSize.font18,
    fontWeight: '500',
    color: Theme.colors.primaryColor,
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    marginBottom: 30,
  },
  category: {
    fontSize: Theme.fontSize.font12,
    color: Theme.colors.primaryColor,
    marginBottom: 5,
  },
  cost: {
    fontSize: Theme.fontSize.font20,
    color: Theme.colors.primaryColor,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addCart: {
    backgroundColor: Theme.colors.secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 4,
    elevation: 4,
  },
});

export default ProductDetails;
