import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { AuthProvider } from './src/context/AuthContext';
import { RestaurantProvider } from './src/context/RestaurantContext';
import { StyleSheet } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';

enableScreens();

const App = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AuthProvider>
          <RestaurantProvider>
            <RootNavigator />
          </RestaurantProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
