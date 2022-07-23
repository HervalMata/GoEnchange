import React from 'react';

import { Image } from 'react-native';
import logoImg from '../../assets/logo-troca.png';
import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu login</Title>
    </Container>
  );
};

export default SignIn;
