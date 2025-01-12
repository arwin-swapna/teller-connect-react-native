import { View, Text, Modal } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import React, { useRef } from "react";

interface Props {
  show: boolean;
  handleHideModal: () => void;
  onEnroll: (event: WebViewMessageEvent) => void;
}

export default function Teller({ show, handleHideModal, onEnroll }: Props) {
  const webViewRef = useRef<WebView>(null);

  function handleEnroll(event: WebViewMessageEvent) {
    handleHideModal();
    onEnroll(event);
  }

  return (
    <Modal visible={show} animationType="slide">
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={require("./teller-connect.html")}
          javaScriptEnabled={true}
          onMessage={handleEnroll}
          scalesPageToFit={true}
        />
      </View>
    </Modal>
  );
}
