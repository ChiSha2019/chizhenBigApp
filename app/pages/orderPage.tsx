import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { fetchOrders, Order } from '../api/fetchOrders';
import { Ionicons } from '@expo/vector-icons'; // for search/filter icons

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
        setFilteredOrders(ordersData); // initialize filtered list
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const searchInObject = (obj: any, query: string): boolean => {
    if (typeof obj === 'string') {
      return obj.toLowerCase().includes(query);
    }
    if (Array.isArray(obj)) {
      return obj.some(item => searchInObject(item, query));
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => searchInObject(value, query));
    }
    return false;
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const lowerQuery = text.toLowerCase();
      const filtered = orders.filter(order => searchInObject(order, lowerQuery));
      setFilteredOrders(filtered);
    }
  };

  const handleFilterPress = () => {
    // Add filter logic here (e.g. open a modal)
    console.log('Filter button pressed');
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderDetail}>客户: {item.client}</Text>
      <Text style={styles.orderDetail}>联系人: {item.contact}</Text>
      <Text style={styles.orderDetail}>审核人: {item.modelReviewer}</Text>
      <Text style={styles.orderDetail}>活动日期: {item.eventDate}</Text>
      <Text style={styles.orderDetail}>时间: {item.eventTimeslot.startTime} - {item.eventTimeslot.endTime}</Text>
      <Text style={styles.orderDetail}>地点: {item.eventAddress.city} {item.eventAddress.street}</Text>
      <Text style={styles.orderDetail}>模特费用: {item.pay.modelPay}</Text>
      <Text style={styles.orderDetail}>经纪人佣金: {item.pay.agentCommission}</Text>
      <Text style={styles.description}>活动说明: {item.eventDescription}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>加载订单中...</Text>
      </View>
    );
  }

  const handleAddOrder = () => {
    console.log('上架订单 button pressed');
  };

  return (
    <View style={styles.pageContainer}>
      {/* Search bar & filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索订单"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Ionicons name="filter" size={20} color="#333" />
          <Text style={styles.filterText}>筛选</Text>
        </TouchableOpacity>
      </View>

      {/* Orders list */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Order Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddOrder}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.floatingButtonText}>上架订单</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  ordersList: {
    flex: 1,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  orderDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    fontStyle: 'italic',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default OrderPage;
