import { StatusBar } from "expo-status-bar";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCYvb3W4Ic9TUbPBhQ20jwMXe-hZx_2ttk",
    authDomain: "chat-app-27c30.firebaseapp.com",
    projectId: "chat-app-27c30",
    storageBucket: "chat-app-27c30.appspot.com",
    messagingSenderId: "482424545646",
    appId: "1:482424545646:web:450c15cbd1d4c2ee4e617f",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} db={db} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
