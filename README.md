# Teller Connect for React Native

This repository provides a workaround for integrating Teller Connect into React Native applications. While a package (`teller-connect-react`) exists for web, it didn't work for React Native in my case. This repo uses a WebView-based approach to display the Teller Connect interface.

## How It Works

- The Teller Connect script is embedded in a custom HTML file (`teller-connect.html`).
- Modifications to the script are included in the HTML file to make it compatible with React Native.
- The React Native WebView component is used to display the Teller Connect interface.

## Getting Started

### Prerequisites

- A [Teller.io](https://teller.io/) account.
- Your Teller application ID.

### Usage

1. **Download the `teller-connect.html` file**  
   Add the `teller-connect.html` file to your project. Modify the script in the file to include your Teller application ID and specify the desired environment (`sandbox` , `development` or `production`).

2. **Integrate the WebView in Your App**  
   Use the React Native WebView component to load the `teller-connect.html` file and handle user interactions.

3. **Example Code**  
   Below is an example implementation:

   ```jsx
   import { View, Modal } from "react-native";
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
             source={require("path/to/teller-connect.html")}
             javaScriptEnabled={true}
             onMessage={handleEnroll}
             scalesPageToFit={true}
           />
         </View>
       </Modal>
     );
   }
   ```

4. **Run Your App**  
   Test the implementation on your React Native application to verify that the Teller Connect interface works as expected.

### Notes
- This approach **does not work for web applications** since WebView is not supported on the web. For web, consider using the [Teller Connect React package](https://github.com/tellerhq/teller-connect-react).
- Replace `path/to/teller-connect.html` with the actual path to the HTML file in your project.

### Disclaimer

This project is not affiliated with Teller.io in any way. It is an independent workaround to make Teller Connect work in React Native applications.
