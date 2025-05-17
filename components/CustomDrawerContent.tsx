// CustomDrawerContent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Arman</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default CustomDrawerContent;
