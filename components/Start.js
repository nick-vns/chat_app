import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

const backgroundColors = {
  purple: { backgroundColor: "#474056" },
  darkBlue: { backgroundColor: "#191347" },
  blue: { backgroundColor: "#63787D" },
  pink: { backgroundColor: "#4E3264" },
};

const SelectedColorOverlay = () => <View style={styles.selectedColorOverlay} />;

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const image = {
    uri: "https://img.freepik.com/free-vector/vector-social-contact-seamless-pattern-white-blue_1284-41919.jpg",
  };

  const colorOptions = Object.entries(backgroundColors).map(([key, value]) => (
    <TouchableOpacity
      key={key}
      style={[
        styles.color,
        value,
        color === value.backgroundColor && styles.colorSelected,
      ]}
      onPress={() => setColor(value.backgroundColor)}
    >
      {color === value.backgroundColor && <SelectedColorOverlay />}
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="blue"
          />
          <View style={styles.colorContainer}>
            <Text style={styles.colorText}>Choose your Background Color:</Text>
            <View style={styles.colorOptions}>{colorOptions}</View>
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Start chatting"
            accessibilityHint="Let you enter the chat"
            accessibilityRole="button"
            style={styles.button}
            title="Start Chatting"
            onPress={() =>
              navigation.navigate("Chat", { name: name, color: color })
            }
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "50%",
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
  },
  button: {
    height: 50,
    width: "60%",
    backgroundColor: "#000080",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  buttonText: {
    padding: 10,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorContainer: {
    width: "100%",
    flex: 1,
    borderRadius: 25,
    padding: 10,
    margin: 10,
  },
  colorText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000080",
    marginBottom: 10,
    marginTop: "10%",
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  selectedColorOverlay: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#000080",
    top: -4,
    left: -4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "#000080",
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  text: {
    color: "#000080",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    width: "75%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
    borderColor: "blue",
    backgroundColor: "white",
    textAlign: "center",
    opacity: 0.8,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    opacity: 0.7,
  },
});

export default Start;
