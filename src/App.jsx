
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import ThemeProvider from './contexts/theme/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
 
  return (
    <ThemeProvider>
      <SafeAreaProvider>
      <StatusBar style='auto' />
      <RootNavigator />
    </SafeAreaProvider>
    </ThemeProvider>
  );
}


