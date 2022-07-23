import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={18} color="#666360" />
    <TextInput
      keyboardAppearence="dark"
      placeholderTextColor="#666360"
      {...rest}
    />
  </Container>
);

export default Input;
