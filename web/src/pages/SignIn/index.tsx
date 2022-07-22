import React, { useCallback, useRef } from 'react';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        // @ts-ignore
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },    [signIn]  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo GoExchange" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input name="password" type="password" icon={FiLock} placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
