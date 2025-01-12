import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { WebViewMessageEvent } from "react-native-webview";
import Teller from "./components/teller";

export default function App() {
  const [modal, setModal] = useState(false);

  function handleEnroll(event: WebViewMessageEvent) {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Button title="Add Institution" onPress={() => setModal(true)} />
      <StatusBar style="auto" />
      <Teller
        show={modal}
        handleHideModal={() => setModal(false)}
        onEnroll={handleEnroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
