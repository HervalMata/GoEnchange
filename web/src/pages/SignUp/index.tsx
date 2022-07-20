import React from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background/>
      <Content>
        <img src={logoImg} alt="Logo GoExchange"/>

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Email"/>
          <Input name="email" icon={FiMail} placeholder="Email"/>
          <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>

          <Button type="submit">Cadastrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiArrowLeft/>
          Voltar para o login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
