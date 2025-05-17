import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet,  } from 'react-native';
import StandardCalculator from './components/StandardCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import Converter from './components/Converter'; 

const Drawer = createDrawerNavigator();

export default function App() {
  const [mode, setMode] = useState<'standard' | 'scientific' | 'converter'>('standard');

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
        }}
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            {/* Drawer items */}
            <DrawerItem
              label="Standard Mode"
              labelStyle={styles.drawerText}
              onPress={() => {
                setMode('standard');
                props.navigation.closeDrawer();
              }}
            />
            <DrawerItem
              label="Scientific Mode"
              labelStyle={styles.drawerText}
              onPress={() => {
                setMode('scientific');
                props.navigation.closeDrawer();
              }}
            />

            <DrawerItem
              label="Converter"
              labelStyle={styles.drawerText}
              onPress={() => {
                setMode('converter');
                props.navigation.closeDrawer();
              }}
            />
            
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Developed by Arman</Text>
            </View>
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen name="Calculator">
          {() =>
            mode === 'standard' ? (
              <StandardCalculator />
            ) : mode === 'scientific' ? (
              <ScientificCalculator />
            ) : (
              <Converter />
            )

          }
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerText: {
    fontSize: 18,
    color: 'black',
  },
  footerContainer: {
    marginTop: 580,  // Push this to the bottom
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'gray',
  },
});
