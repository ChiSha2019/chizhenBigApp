import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from './components/PrimaryButton';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'a' && password === '123') {
      router.push('/admin');
    } else {
      Alert.alert('登录失败', '用户名或密码错误，请重试');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>智真模特经纪管理系统</Text>
      <Text style={styles.subtitle}>请输入您的账户信息</Text>
      <TextInput
        placeholder="用户名"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="密码"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <PrimaryButton 
        title="登录" 
        onPress={handleLogin}
        style={styles.loginButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 8, 
    textAlign: 'center',
    color: '#333' 
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
  },
});
