import {
  StyleSheet,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  useEffect(() => {
    let name = route.params.name;
    let color = route.params.color;
    navigation.setOptions({ title: name, headerStyle: { background: color } });
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#7306AF",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderTime = (props) => {
    return (
      <Text
        style={{
          color: "#a9a9a9",
          fontSize: 9,
          margin: 8,
          marginTop: 0,
        }}
      >
        {props.currentMessage.createdAt.toLocaleString()}
      </Text>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        renderTime={renderTime}
        user={{
          _id: userID,
          name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
