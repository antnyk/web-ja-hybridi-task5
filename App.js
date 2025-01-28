import { SafeAreaView } from 'react-native';
import styles from './style/Styles';
import Map from './screens/Map';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.map}>
      <Map/>
      <StatusBar hidden={true}/>
    </SafeAreaView>
  );
}
