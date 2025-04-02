import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  PressableProps,
} from 'react-native';
import Colors from '@/constants/Colors';


type PressableElement = React.ElementRef<typeof Pressable>;


interface SubmitButtonProps {
  title?: string;
  onPress: () => void;
}


const SubmitButton = forwardRef<PressableElement, SubmitButtonProps>(
  ({ title = 'Submit', onPress }, ref) => {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    );
  }
);



export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary100,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
