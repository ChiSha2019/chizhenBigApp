import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import OrderPage from './pages/orderPage';
import FinancePage from './pages/financePage';
import ModelPage from './pages/modelPage';
import TrainingPage from './pages/traningPage';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('订单');

  const renderContent = () => {
    switch (activeTab) {
      case '订单':
        return <OrderPage />;
      case '财务':
        return <FinancePage />;
      case '模特':
        return <ModelPage />;
      case '培训':
        return <TrainingPage />;
      default:
        return <OrderPage />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      
      <View style={styles.navigationBar}>
        {['订单', '财务', '模特', '培训'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.navItem,
              activeTab === tab && styles.activeNavItem
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.navText,
              activeTab === tab && styles.activeNavText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    paddingBottom: 40,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: '#007AFF',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  navText: {
    fontSize: 16,
    color: '#666',
  },
  activeNavText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
