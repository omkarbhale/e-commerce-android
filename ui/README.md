# Welcome to your Expo App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 📖 Overview

This project is the client-side of a larger application. It is built using Expo and React Native, providing a cross-platform mobile app experience.

## 🚀 Get Started

### Prerequisites

- Node.js installed on your system.
- Expo CLI installed globally (optional but recommended).

### Steps

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Set up constants**

    - Open the `constants.js` file in the root of the `ui` directory.
    - Update the `serverUrl` constant to point to your server's base URL (replace the placeholder with the actual value):
        ```javascript
        export const serverUrl = "http://<your-server-ip>:3001";
        ```

3. **Start the app**

    ```bash
    npx expo start
    ```

4. **Run the app**

    - Open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/).
    - Use an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) or [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/).
    - Alternatively, scan the QR code in the terminal using [Expo Go](https://expo.dev/go).

### Development

Start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals and advanced topics.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Step-by-step guide to building a project.

## 🤝 Join the Community

- [Expo on GitHub](https://github.com/expo/expo): Contribute to the open-source platform.
- [Discord community](https://chat.expo.dev): Chat with other developers and ask questions.
