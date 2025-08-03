import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ModelPage = () => (
  <View style={styles.pageContainer}>
    <Text style={styles.pageTitle}>!y¡</Text>
  </View>
);

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ModelPage;