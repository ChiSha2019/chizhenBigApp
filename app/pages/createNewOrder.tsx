import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '../api/fetchOrders';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const CreateNewOrder = () => {
  const router = useRouter();
  
  const [newOrder, setNewOrder] = useState<Order>({
    client: '',
    contact: '',
    modelReviewer: '',
    eventDate: '',
    eventTimeslot: {
      startTime: '',
      endTime: ''
    },
    eventAddress: {
      city: '',
      street: ''
    },
    pay: {
      agentCommission: '',
      modelPay: ''
    },
    targetHairStyleDescription: '',
    targetHairStylePhotos: [],
    modelRequirements: '',
    eventDescription: ''
  });

  const updateField = (field: keyof Order, value: any) => {
    setNewOrder(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parentField: keyof Order, childField: string, value: string) => {
    setNewOrder(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as any),
        [childField]: value
      }
    }));
  };

  const handleCancel = () => {
    Alert.alert(
      '确认取消',
      '确定要取消新建订单吗？已填写的信息将丢失。',
      [
        { text: '继续编辑', style: 'cancel' },
        { text: '确定取消', style: 'destructive', onPress: () => router.back() }
      ]
    );
  };

  const handleSubmit = () => {
    // TODO: 实现提交逻辑
    Alert.alert('提示', '提交功能待实现');
  };

  const validateForm = () => {
    const requiredFields = [
      'client', 'contact', 'modelReviewer', 'eventDate', 
      'eventTimeslot.startTime', 'eventTimeslot.endTime',
      'eventAddress.city', 'eventAddress.street',
      'pay.agentCommission', 'pay.modelPay',
      'eventDescription'
    ];
    
    // Basic validation - can be expanded
    return newOrder.client.trim() !== '' && 
           newOrder.contact.trim() !== '' && 
           newOrder.eventDate.trim() !== '';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>上架新订单</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Client Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>客户信息</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>客户名称 *</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入客户名称"
              value={newOrder.client}
              onChangeText={(text) => updateField('client', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>联系人 *</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入联系人姓名"
              value={newOrder.contact}
              onChangeText={(text) => updateField('contact', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>审核人 *</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入审核人姓名"
              value={newOrder.modelReviewer}
              onChangeText={(text) => updateField('modelReviewer', text)}
            />
          </View>
        </View>

        {/* Event Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>活动信息</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>活动日期 *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={newOrder.eventDate}
              onChangeText={(text) => updateField('eventDate', text)}
            />
          </View>

          <View style={styles.timeRow}>
            <View style={[styles.inputGroup, styles.timeInput]}>
              <Text style={styles.label}>开始时间 *</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={newOrder.eventTimeslot.startTime}
                onChangeText={(text) => updateNestedField('eventTimeslot', 'startTime', text)}
              />
            </View>

            <View style={[styles.inputGroup, styles.timeInput]}>
              <Text style={styles.label}>结束时间 *</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={newOrder.eventTimeslot.endTime}
                onChangeText={(text) => updateNestedField('eventTimeslot', 'endTime', text)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>城市 *</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入城市名称"
              value={newOrder.eventAddress.city}
              onChangeText={(text) => updateNestedField('eventAddress', 'city', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>详细地址 *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="请输入详细地址"
              value={newOrder.eventAddress.street}
              onChangeText={(text) => updateNestedField('eventAddress', 'street', text)}
              multiline
              numberOfLines={2}
            />
          </View>
        </View>

        {/* Payment Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>费用信息</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>经纪人提成 *</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入提成金额"
              value={newOrder.pay.agentCommission}
              onChangeText={(text) => updateNestedField('pay', 'agentCommission', text)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>模特费用 *</Text>
            <TextInput
              style={styles.input}
              placeholder="例如: 100-500"
              value={newOrder.pay.modelPay}
              onChangeText={(text) => updateNestedField('pay', 'modelPay', text)}
            />
          </View>
        </View>

        {/* Requirements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>要求信息</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>发型要求</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="请描述发型要求"
              value={newOrder.targetHairStyleDescription}
              onChangeText={(text) => updateField('targetHairStyleDescription', text)}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>模特要求</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="请描述模特要求（年龄、身高、经验等）"
              value={newOrder.modelRequirements}
              onChangeText={(text) => updateField('modelRequirements', text)}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>活动说明 *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="请详细描述活动内容和要求"
              value={newOrder.eventDescription}
              onChangeText={(text) => updateField('eventDescription', text)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <SecondaryButton 
            title="取消"
            onPress={handleCancel}
            style={styles.button}
          />
          <PrimaryButton 
            title="提交"
            onPress={handleSubmit}
            style={styles.button}
            disabled={!validateForm()}
          />
        </View>
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
  placeholder: {
    width: 40,
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
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#333',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    flex: 1,
  },
});

export default CreateNewOrder;