import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchOrders, Order } from '../api/fetchOrders';
import { Ionicons } from '@expo/vector-icons'; // for search/filter icons
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const OrderPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('');
  const [selectedCommissionFilter, setSelectedCommissionFilter] = useState<string>('');
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [selectedTimeSort, setSelectedTimeSort] = useState<string>('');
  const [selectedCommissionSort, setSelectedCommissionSort] = useState<string>('');
  const slideAnim = useState(new Animated.Value(0))[0];
  const sortSlideAnim = useState(new Animated.Value(0))[0];

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
    setShowFilterSheet(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilterSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowFilterSheet(false);
    });
  };

  const applyFilters = (timeFilter: string, commissionFilter: string) => {
    let filtered = orders;

    // Apply time filter
    if (timeFilter) {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      const next7Days = new Date(today);
      next7Days.setDate(next7Days.getDate() + 7);
      const next7DaysStr = next7Days.toISOString().split('T')[0];
      
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const nextMonthStr = nextMonth.toISOString().split('T')[0];

      if (timeFilter === '今天') {
        filtered = filtered.filter(order => order.eventDate === todayStr);
      } else if (timeFilter === '明天') {
        filtered = filtered.filter(order => order.eventDate === tomorrowStr);
      } else if (timeFilter === '未来7天') {
        filtered = filtered.filter(order => order.eventDate >= todayStr && order.eventDate <= next7DaysStr);
      } else if (timeFilter === '未来一个月') {
        filtered = filtered.filter(order => order.eventDate >= todayStr && order.eventDate <= nextMonthStr);
      }
    }

    // Apply commission filter
    if (commissionFilter) {
      filtered = filtered.filter(order => order.pay.agentCommission === commissionFilter);
    }

    setFilteredOrders(filtered);
  };

  const handleConfirmFilter = () => {
    applyFilters(selectedTimeFilter, selectedCommissionFilter);
    closeFilterSheet();
  };

  const handleResetFilter = () => {
    setSelectedTimeFilter('');
    setSelectedCommissionFilter('');
    setFilteredOrders(orders);
  };

  const handleSortPress = () => {
    setShowSortSheet(true);
    Animated.timing(sortSlideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSortSheet = () => {
    Animated.timing(sortSlideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSortSheet(false);
    });
  };

  const applySorting = (timeSortOption: string, commissionSortOption: string) => {
    let sorted = [...filteredOrders];
    
    // Apply time sorting first if selected
    if (timeSortOption) {
      if (timeSortOption === '时间升序') {
        sorted.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
      } else if (timeSortOption === '时间降序') {
        sorted.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
      }
    }
    
    // Apply commission sorting second if selected (this will be the primary sort)
    if (commissionSortOption) {
      if (commissionSortOption === '提成升序') {
        sorted.sort((a, b) => parseInt(a.pay.agentCommission) - parseInt(b.pay.agentCommission));
      } else if (commissionSortOption === '提成降序') {
        sorted.sort((a, b) => parseInt(b.pay.agentCommission) - parseInt(a.pay.agentCommission));
      }
    }
    
    setFilteredOrders(sorted);
  };

  const handleConfirmSort = () => {
    applySorting(selectedTimeSort, selectedCommissionSort);
    closeSortSheet();
  };

  const renderOrderItem = ({ item, index }: { item: Order; index: number }) => (
    <TouchableOpacity 
      style={styles.orderItem}
      onPress={() => router.push(`/pages/orderDetail?orderId=${index}`)}
      activeOpacity={0.7}
    >
      <Text style={styles.orderDetail}>客户: {item.client}</Text>
      <Text style={styles.orderDetail}>联系人: {item.contact}</Text>
      <Text style={styles.orderDetail}>审核人: {item.modelReviewer}</Text>
      <Text style={styles.orderDetail}>活动日期: {item.eventDate}</Text>
      <Text style={styles.orderDetail}>时间: {item.eventTimeslot.startTime} - {item.eventTimeslot.endTime}</Text>
      <Text style={styles.orderDetail}>地点: {item.eventAddress.city} {item.eventAddress.street}</Text>
      <Text style={styles.orderDetail}>模特费用: {item.pay.modelPay}</Text>
      <Text style={styles.orderDetail}>经纪人佣金: {item.pay.agentCommission}</Text>
      <Text style={styles.description}>活动说明: {item.eventDescription}</Text>
      <View style={styles.orderItemArrow}>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </TouchableOpacity>
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
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <Ionicons name="filter" size={20} color="#333" />
            <Text style={styles.filterText}>筛选</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton} onPress={handleSortPress}>
            <Ionicons name="swap-vertical" size={20} color="#333" />
            <Text style={styles.sortText}>排序</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Orders list */}
      <FlatList
        data={filteredOrders}
        renderItem={({ item, index }) => renderOrderItem({ item, index })}
        keyExtractor={(item, index) => index.toString()}
        style={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Order Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddOrder}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.floatingButtonText}>上架订单</Text>
      </TouchableOpacity>

      {/* Filter Bottom Sheet */}
      <Modal
        visible={showFilterSheet}
        transparent={true}
        animationType="none"
        onRequestClose={closeFilterSheet}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={closeFilterSheet}
        >
          <Animated.View 
            style={[
              styles.bottomSheet,
              {
                transform: [{
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('window').height, 0],
                  }),
                }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>订单筛选</Text>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>活动时间</Text>
                <View style={styles.optionsRow}>
                  {['今天', '明天', '未来7天', '未来一个月'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        styles.quarterWidthOption,
                        selectedTimeFilter === option && styles.selectedOption
                      ]}
                      onPress={() => setSelectedTimeFilter(option)}
                    >
                      <Text style={[
                        styles.optionText,
                        styles.smallOptionText,
                        selectedTimeFilter === option && styles.selectedOptionText
                      ]}>
                        {option}
                      </Text>
                      {selectedTimeFilter === option && (
                        <Ionicons name="checkmark" size={16} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>经纪人提成</Text>
                <View style={styles.optionsRow}>
                  {['40', '50', '100', '150'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        styles.quarterWidthOption,
                        selectedCommissionFilter === option && styles.selectedOption
                      ]}
                      onPress={() => setSelectedCommissionFilter(option)}
                    >
                      <Text style={[
                        styles.optionText,
                        styles.smallOptionText,
                        selectedCommissionFilter === option && styles.selectedOptionText
                      ]}>
                        {option}
                      </Text>
                      {selectedCommissionFilter === option && (
                        <Ionicons name="checkmark" size={16} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.optionsRow}>
                  {['200', '300', '500', '1000'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        styles.quarterWidthOption,
                        selectedCommissionFilter === option && styles.selectedOption
                      ]}
                      onPress={() => setSelectedCommissionFilter(option)}
                    >
                      <Text style={[
                        styles.optionText,
                        styles.smallOptionText,
                        selectedCommissionFilter === option && styles.selectedOptionText
                      ]}>
                        {option}
                      </Text>
                      {selectedCommissionFilter === option && (
                        <Ionicons name="checkmark" size={16} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <SecondaryButton 
                  title="重置"
                  onPress={handleResetFilter}
                  style={styles.buttonFlex}
                />
                <PrimaryButton 
                  title="确认"
                  onPress={handleConfirmFilter}
                  style={styles.buttonFlex}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Sort Bottom Sheet */}
      <Modal
        visible={showSortSheet}
        transparent={true}
        animationType="none"
        onRequestClose={closeSortSheet}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={closeSortSheet}
        >
          <Animated.View 
            style={[
              styles.bottomSheet,
              {
                transform: [{
                  translateY: sortSlideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('window').height, 0],
                  }),
                }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>订单排序</Text>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>时间排序</Text>
                <View style={styles.optionsRow}>
                  {['时间升序', '时间降序'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        styles.halfWidthOption,
                        selectedTimeSort === option && styles.selectedOption
                      ]}
                      onPress={() => setSelectedTimeSort(selectedTimeSort === option ? '' : option)}
                    >
                      <Text style={[
                        styles.optionText,
                        selectedTimeSort === option && styles.selectedOptionText
                      ]}>
                        {option}
                      </Text>
                      {selectedTimeSort === option && (
                        <Ionicons name="checkmark" size={20} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>提成排序</Text>
                <View style={styles.optionsRow}>
                  {['提成升序', '提成降序'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        styles.halfWidthOption,
                        selectedCommissionSort === option && styles.selectedOption
                      ]}
                      onPress={() => setSelectedCommissionSort(selectedCommissionSort === option ? '' : option)}
                    >
                      <Text style={[
                        styles.optionText,
                        selectedCommissionSort === option && styles.selectedOptionText
                      ]}>
                        {option}
                      </Text>
                      {selectedCommissionSort === option && (
                        <Ionicons name="checkmark" size={20} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <SecondaryButton 
                  title="取消"
                  onPress={closeSortSheet}
                  style={styles.buttonFlex}
                />
                <PrimaryButton 
                  title="确认"
                  onPress={handleConfirmSort}
                  style={styles.buttonFlex}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
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
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sortText: {
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
    position: 'relative',
  },
  orderItemArrow: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    minHeight: 300,
  },
  sheetHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  halfWidthOption: {
    flex: 1,
    marginBottom: 0,
  },
  quarterWidthOption: {
    flex: 1,
    marginBottom: 0,
    paddingHorizontal: 8,
  },
  smallOptionText: {
    fontSize: 14,
  },
  selectedOption: {
    backgroundColor: '#e8f4ff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  buttonFlex: {
    flex: 1,
  },
});

export default OrderPage;
