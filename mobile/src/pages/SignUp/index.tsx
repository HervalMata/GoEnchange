import React, {useRef} from 'react';

import {Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo-troca.png';
import { Title, Container, BackToLogin, BackToLoginText } from './styles';
import { Form } from '@unform/mobile';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={() => {}}>

              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress{() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <BackToLogin onPress={() => navigation.navigate('SignIn')}>
              <Icon name="arrow-left" size={20} color="fff" />
              <BackToLoginText>Voltar para o login</BackToLoginText>
            </BackToLogin>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
