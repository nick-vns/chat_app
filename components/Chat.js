import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;

  useEffect(() => {
    let name = route.params.name;
    let color = route.params.color;
    navigation.setOptions({ title: name, headerStyle: { background: color } });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      <Text style={styles.title}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    color: "#000080",
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    paddingBottom: 50,
  },
});

export default Chat;
