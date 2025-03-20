import { View, StyleSheet } from 'react-native';
import { Link, Stack, Tabs } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      {/* <Tabs.Screen options={{ title: 'notfound' }} /> */}
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
