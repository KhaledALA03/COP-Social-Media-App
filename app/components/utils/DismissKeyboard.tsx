import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

interface DismissKeyboardProps {
  children: React.ReactNode;
}

const DismissKeyboard = ({ children }: DismissKeyboardProps): JSX.Element => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
