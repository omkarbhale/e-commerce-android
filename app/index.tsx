import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { PlatformOSType } from "react-native";


export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Index Hello world</Text>
      <Link href="/tabout" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});