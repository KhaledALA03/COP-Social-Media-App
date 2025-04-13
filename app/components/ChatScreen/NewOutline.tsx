import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import NewChatModal from './NewChatModal';

type Props = {
  onSelectUser: (chatId: string, email: string) => void;
};

export default function NewOutline({ onSelectUser }: Props) {
  const [visible, setVisible] = React.useState(false);
  const onClose = () => setVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Ionicons name="create-outline" size={30} />
      </TouchableOpacity>

      <NewChatModal visible={visible} onClose={onClose} onSelectUser={onSelectUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    right: 10,
  },
});
