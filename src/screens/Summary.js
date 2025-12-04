import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Summary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const empty = () => {
    return (
      <View style={styles.empty}>
        <Icon
          name={'cart'}
          size={200}
          color={Theme.colors.primaryColor}
          style={{ opacity: 0.5 }}
        />
        <Text style={styles.emptyText}>No new orders</Text>
      </View>
    );
  };

  const formatDate = dateString => {
    const date = new Date(dateString);

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' : '' + minutes;

    return `${dayName}, ${day} ${month} ${year} | ${hours}:${minutes}`;
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('Orders_Data');
      setData(data ? JSON.parse(data) : []);
    } catch (e) {
      console.error('Error loading orders:', e);
    }
  };

  const renderItem = renderData => {
    console.log(renderData.item);
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.heading}>Order Confirmed</Text>
        <Text style={styles.dateTExt}>{formatDate(renderData.item.date)}</Text>
        {renderData.item.items.map(d => {
          return (
            <Text
              numberOfLines={1}
              style={{ maxWidth: '90%', fontSize: Theme.fontSize.font14 }}
            >
              1x {d.title}
            </Text>
          );
        })}
        <View style={styles.seperator} />
        <View style={styles.detailsView}>
          <Text style={styles.summaryDetails}>
            {renderData.item.items.length} items
          </Text>
          <Text style={styles.summaryDetails}>
            {renderData.item.totalPrice} ₹
          </Text>
        </View>
        <View style={styles.seperator} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ListEmptyComponent={empty}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 20,
  },
  empty: {
    alignItems: 'center',
    marginVertical: '50%',
  },
  emptyText: {
    color: Theme.colors.primaryColor,
    marginTop: 20,
    fontSize: Theme.fontSize.font15,
  },
  heading: {
    fontSize: Theme.fontSize.font18,
    fontWeight: '500',
    color: Theme.colors.primaryColor,
  },
  dateTExt: {
    color: Theme.colors.grey,
    fontSize: Theme.fontSize.font12,
    marginVertical: 5,
    marginBottom: 15,
  },
  seperator: {
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    marginVertical: 15,
  },
  summaryDetails: {
    color: Theme.colors.primaryColor,
    fontWeight: '500',
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default Summary;
