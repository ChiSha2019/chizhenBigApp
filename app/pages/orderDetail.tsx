import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchOrders, Order } from '../api/fetchOrders';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const OrderDetail = () => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderDetail = async () => {
      try {
        const orders = await fetchOrders();
        const foundOrder = orders[parseInt(orderId as string)];
        if (foundOrder) {
          setOrder(foundOrder);
          setEditedOrder({ ...foundOrder });
        }
      } catch (error) {
        console.error('Failed to fetch order detail:', error);
        Alert.alert('错误', '加载订单详情失败');
      } finally {
        setLoading(false);
      }
    };
    
    if (orderId) {
      loadOrderDetail();
    }
  }, [orderId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedOrder) {
      setOrder({ ...editedOrder });
      setIsEditing(false);
      Alert.alert('成功', '订单信息已更新');
    }
  };

  const handleCancel = () => {
    setEditedOrder(order ? { ...order } : null);
    setIsEditing(false);
  };

  const updateEditedOrder = (field: keyof Order, value: any) => {
    if (editedOrder) {
      setEditedOrder({ ...editedOrder, [field]: value });
    }
  };

  const updateNestedField = (parentField: keyof Order, childField: string, value: string) => {
    if (editedOrder) {
      setEditedOrder({
        ...editedOrder,
        [parentField]: {
          ...(editedOrder[parentField] as any),
          [childField]: value
        }
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>未找到订单信息</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentOrder = isEditing ? editedOrder! : order;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>订单详情</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>客户信息</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>客户名称:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.client}
                onChangeText={(text) => updateEditedOrder('client', text)}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.client}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>联系人:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.contact}
                onChangeText={(text) => updateEditedOrder('contact', text)}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.contact}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>审核人:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.modelReviewer}
                onChangeText={(text) => updateEditedOrder('modelReviewer', text)}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.modelReviewer}</Text>
            )}
          </View>
        </View>

        {/* Event Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>活动信息</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>活动日期:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.eventDate}
                onChangeText={(text) => updateEditedOrder('eventDate', text)}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.eventDate}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>开始时间:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.eventTimeslot.startTime}
                onChangeText={(text) => updateNestedField('eventTimeslot', 'startTime', text)}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.eventTimeslot.startTime}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>结束时间:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.eventTimeslot.endTime}
                onChangeText={(text) => updateNestedField('eventTimeslot', 'endTime', text)}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.eventTimeslot.endTime}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>城市:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.eventAddress.city}
                onChangeText={(text) => updateNestedField('eventAddress', 'city', text)}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.eventAddress.city}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>详细地址:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.eventAddress.street}
                onChangeText={(text) => updateNestedField('eventAddress', 'street', text)}
                multiline
              />
            ) : (
              <Text style={styles.value}>{currentOrder.eventAddress.street}</Text>
            )}
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>费用信息</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>经纪人提成:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.pay.agentCommission}
                onChangeText={(text) => updateNestedField('pay', 'agentCommission', text)}
              />
            ) : (
              <Text style={styles.value}>¥{currentOrder.pay.agentCommission}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>模特费用:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={currentOrder.pay.modelPay}
                onChangeText={(text) => updateNestedField('pay', 'modelPay', text)}
              />
            ) : (
              <Text style={styles.value}>¥{currentOrder.pay.modelPay}</Text>
            )}
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>要求信息</Text>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>发型要求:</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={currentOrder.targetHairStyleDescription}
                onChangeText={(text) => updateEditedOrder('targetHairStyleDescription', text)}
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.targetHairStyleDescription}</Text>
            )}
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>模特要求:</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={currentOrder.modelRequirements}
                onChangeText={(text) => updateEditedOrder('modelRequirements', text)}
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.modelRequirements}</Text>
            )}
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>活动说明:</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={currentOrder.eventDescription}
                onChangeText={(text) => updateEditedOrder('eventDescription', text)}
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={styles.value}>{currentOrder.eventDescription}</Text>
            )}
          </View>
        </View>

        {/* Edit Buttons */}
        {isEditing && (
          <View style={styles.buttonContainer}>
            <SecondaryButton 
              title="取消"
              onPress={handleCancel}
              style={styles.button}
            />
            <PrimaryButton 
              title="保存"
              onPress={handleSave}
              style={styles.button}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoColumn: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    width: 100,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default OrderDetail;