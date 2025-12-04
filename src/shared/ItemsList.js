import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../constants/Theme';
import { Routes } from '../constants/Constants';

const ItemsList = props => {
  const empty = () => {
    return (
      <View style={styles.empty}>
        <Icon
          name={'clipboard-text-multiple-outline'}
          size={200}
          color={Theme.colors.primary}
          style={{ opacity: 0.5 }}
        />
        <Text style={styles.emptyText}>{props.emptyText}</Text>
      </View>
    );
  };

  const renderItem = (renderData, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={index}
        style={styles.card}
        onPress={() => {
          props.navigation.navigate(Routes.ProductDetails, {
            data: renderData.item,
          });
        }}
      >
        <View style={styles.imageView}>
          <Image
            source={{ uri: renderData.item.image }}
            style={styles.fullWidth}
          />
        </View>
        <View style={styles.headerView}>
          <Text style={styles.title} numberOfLines={2}>
            {renderData.item.title}
          </Text>
          <Text style={styles.cost}>{renderData.item.price} ₹</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {props.data && (
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          ListEmptyComponent={empty}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  empty: {
    alignItems: 'center',
    marginVertical: '50%',
  },
  emptyText: {
    color: Theme.colors.primary,
    marginTop: 20,
    fontSize: Theme.fontSize.font15,
  },
  fullWidth: {
    height: '100%',
    width: '100%',
    backgroundColor: Theme.colors.white,
  },
  card: {
    backgroundColor: Theme.colors.white,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    elevation: Theme.elevation.small,
    borderRadius: 5,
  },
  headerView: {
    justifyContent: 'space-around',
    paddingLeft: 15,
    maxWidth: '85%',
  },
  imageView: {
    height: 100,
    width: 100,
    borderWidth: Theme.borderWidth.small,
    borderColor: Theme.colors.primaryColor,
  },
  title: {
    fontSize: Theme.fontSize.font14,
    width: '80%',
    fontWeight: '500',
  },
  cost: {
    fontSize: Theme.fontSize.font15,
    color: Theme.colors.primaryColor,
  },
  list: {
    flexDirection: 'column-reverse',
    paddingVertical: 10,
  },
});
