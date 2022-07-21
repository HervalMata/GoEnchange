import React, { useCallback, useRef } from 'react';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (err) {
      // @ts-ignore
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
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
};

export default SignIn;
