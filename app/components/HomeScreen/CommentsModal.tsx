import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createComments } from "@/firebase/dbHelpers";
import { getComments } from "@/firebase/getComments ";
import { FIREBASE_AUTH } from "@/firebase/FirebaseConfig";
import Colors from "@/constants/Colors";

type CommentsModalProps = {
  visible: boolean;
  onClose: () => void;
  commentsCount: number;
  postId: string;
  userId: string;
  userEmail: string;
  setCommentsCount: (count: number) => void;
};

export default function CommentsModal({
  visible,
  onClose,
  commentsCount,
  setCommentsCount,
  postId,
  userId,
  userEmail,
}: CommentsModalProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      const fetchComments = async () => {
        const fetchedComments = await getComments(postId);
        setComments(fetchedComments);
        setLoading(false);
      };
      fetchComments();
    }
  }, [visible, postId]);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    const currentUserEmail = FIREBASE_AUTH.currentUser?.email;
    const username = `@${currentUserEmail?.slice(
      0,
      currentUserEmail.indexOf("@")
    )}`;

    await createComments(userId, commentText.trim(), postId, username);
    setCommentText("");

    const updatedCount = commentsCount + 1;
    setCommentsCount(updatedCount);

    setLoading(true);
    const fetchedComments = await getComments(postId);
    setComments(fetchedComments);

    setLoading(false);
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={styles.modalContainer}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Comments</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color={Colors.primary300} />
                </TouchableOpacity>
              </View>

              {loading ? (
                <Text>Loading comments...</Text>
              ) : comments.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  No comments yet.
                </Text>
              ) : (
                <FlatList
                  data={comments}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.list}
                  renderItem={({ item }) => (
                    <View style={styles.comment}>
                      <Text style={styles.username}>{item.userEmail}</Text>
                      <Text>{item.content}</Text>
                    </View>
                  )}
                />
              )}
              <View style={styles.inputRow}>
                <TextInput
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={handlePostComment}
                  style={styles.sendBtn}
                >
                  <Ionicons name="send" size={22} color="white" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "60%",
    backgroundColor: "#ebebeb",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary300,
  },
  list: {
    gap: 12,
    paddingBottom: 60,
  },
  comment: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
  },
  username: {
    fontWeight: "600",
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginBottom: 20,
    
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: Colors.primary300,
    padding: 10,
    borderRadius: 20,
  },
});
