import React from 'react';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Logo GoExchange" />

      <form>
        <h1>Faça seu login</h1>

        <Input name="email" icon={FiMail} placeholder="Email" />
        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
