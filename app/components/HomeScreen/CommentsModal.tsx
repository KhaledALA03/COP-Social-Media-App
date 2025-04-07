import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createComments } from '@/firebase/dbHelpers';
import { getComments } from '@/firebase/getComments ';


type CommentsModalProps = {
  visible: boolean;
  onClose: () => void;
  commentsCount: number;
  postId: string;
  userId: string;
};

export default function CommentsModal({
  visible,
  onClose,
  commentsCount,
  postId,
  userId,
}: CommentsModalProps) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);  // Comments state
  const [loading, setLoading] = useState(true);

  // Fetch comments when the modal becomes visible
  useEffect(() => {
    if (visible) {
      const fetchComments = async () => {
        const fetchedComments = await getComments(postId); // Fetch the comments
        setComments(fetchedComments);  // Update state
        setLoading(false);  // Turn off loading spinner
      };
      fetchComments();
    }
  }, [visible, postId]);  // Re-run when modal visibility or postId changes

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    await createComments(userId, commentText.trim(), postId); // Create comment
    setCommentText('');  // Clear input field

    // Optionally, trigger re-fetch to update comments
    setLoading(true); // Show loading while comments refresh
    const fetchedComments = await getComments(postId);
    setComments(fetchedComments);
    setLoading(false);  // Turn off loading after refresh
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
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.modalContainer}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Comments</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              {loading ? (
                <Text>Loading comments...</Text>  // Loading state
              ) : (
                <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                  <View style={styles.comment}>
                    <Text style={styles.username}>{item.userId}</Text>
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
                <TouchableOpacity onPress={handlePostComment} style={styles.sendBtn}>
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
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '60%',
    backgroundColor: '#ebebeb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    gap: 12,
    paddingBottom: 60,
  },
  comment: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  username: {
    fontWeight: '600',
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
  },
});
