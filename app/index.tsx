import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, 
    shouldShowList: true,  
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Index = () => {
 
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Notification permissions are required.');
      }
    };
    requestPermissions();
  }, []);

  
  const getNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Notification at your disposal',
          body: 'This is my first notification',
          data: { user: 'jhon' },
        },
        trigger: {
          seconds: 3,
        },
      });
      console.log('Notification scheduled');
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Error', 'Failed to schedule notification.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Trigger Notification" onPress={getNotification} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});