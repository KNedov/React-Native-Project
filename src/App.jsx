
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import ThemeProvider from './contexts/theme/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
 
  return (
  <SafeAreaProvider>
    <ThemeProvider>
      <StatusBar style='auto' />
      <RootNavigator />
    </ThemeProvider>
    </SafeAreaProvider>
    
  );
}


