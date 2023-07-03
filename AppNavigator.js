/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Feed() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed</Text>
      <Button title="Open Modal" onPress={() => navigation.navigate('ModalScreen')} />
    </View>
  );
}
function ModalScreen() {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.navButton} />
      <Text style={styles.text}>ModalScreen</Text>
    </View>
  );
}

function FeedDrawerMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Feed Menu</Text>
    </View>
  );
}

function DrawerMenu({ drawerContent, routes, props }) {
  const params = props?.route?.params || {};
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'front',
      }}
      drawerContent={drawerContent}
      backBehavior="history"
    >
      {routes.map(screen => (
        <Drawer.Screen
          name={screen.route}
          key={screen.route}
          component={screen.component}
          initialParams={params}
        />
      ))}
    </Drawer.Navigator>
  );
}

const FeedDrawer = () =>
  DrawerMenu({
    drawerContent: FeedDrawerMenu,
    routes: [
      {
        route: 'feed_overview',
        component: Feed,
      },
    ],
  });

function Dashboard() {
  return (
    <Tab.Navigator
      keyboardHidesTabBar={false}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'crimson',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        tabBarStyle: { backgroundColor: 'white' },
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name="FEED"
        component={FeedDrawer}
        options={{
          title: 'Feed',
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Group
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen key="Dashboard" name="Dashboard" component={Dashboard} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            cardStyle: { backgroundColor: 'transparent' },
            presentation: 'modal',
            headerShown: false,
          }}
        >
          <Stack.Screen
            key="ModalScreen"
            name="ModalScreen"
            component={ModalScreen}
            options={{
              gestureResponseDistance: 140,
              contentStyle: {
                backgroundColor: 'transparent',
              },
              presentation: 'modal',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: { fontSize: 18, fontWeight: 'bold' },
  navButton: {
    position: 'absolute',
    top: 8,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'grey',
  },
});
