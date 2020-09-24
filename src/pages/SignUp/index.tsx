import React, { useState } from 'react';
import { Alert } from 'react-native';
import api from '../../services/api';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, GoBackButton, GoBackText } from './styles';


const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    async function handleSignUp () {
         try{
                const data = {
                    username,
                    email,
                    password,
                }

                const schema = Yup.object().shape({
                    username: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                      .required('E-mail obrigatório')
                      .email('Digite um e-mail válido'),
                    password: Yup.string().min(4, 'No mínimo 4 dígitos'),
                  });
          
                  await schema.validate(data, {
                    abortEarly: false,
                  });

             api.post('users', data);
             Alert.alert('Cadastro finalizado', 'Cadastro realizado com sucesso!')
            navigation.navigate('SignIn');
         } catch(e){
            Alert.alert('Erro no cadastro', 'Dados inválidos, verifique se os dados estão inseridos corretamente')
         }
    }

    return (
        <Container>
            <Title>Criar uma conta</Title>

            <Input 
                name = "user" 
                icon = "user" 
                placeholder="Usuario"
                onChangeText = {text => setUsername(text)} 
            />

            <Input 
                name = "email" 
                icon = "mail" 
                placeholder="E-mail" 
                onChangeText = {text => setEmail(text)}
            />

            <Input
                name = "password" 
                icon = "lock" 
                placeholder="Senha"
                secureTextEntry
                onChangeText = {text => setPassword(text)}
            />

            <Button
                onPress={() => handleSignUp()}
            >Criar uma Conta
            </Button>
                <GoBackButton onPress ={() => navigation.goBack()}>
                    <GoBackText>Voltar para o Login</GoBackText>
                </GoBackButton>

        </Container>
    );
}

export default SignUp;