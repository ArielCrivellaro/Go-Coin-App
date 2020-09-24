import React, { useState } from 'react';
import { Image, Alert } from 'react-native';
import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, CreateAccountButton, CreateAccountText } from './styles';

const Signin: React.FC = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    async function handleSignIn () {
        try{
            await api.post('auth', { username, password} );
            Alert.alert('Suceso realizado', 'Bem vindo ao GoCoin!')
            navigation.navigate('Dashboard');
         } catch(e){
            Alert.alert('Erro no login', 'Dados inválidos tente novamente!')
         }
        
    }

    return (
        <Container>
            <Image source = {logoImg} />

            <Title>Faça seu logon</Title>

            <Input 
                name = "user" 
                icon = "user" 
                placeholder="Usuario"
                onChangeText = {text => setUsername(text)}
             />

            <Input 
                name = "password" 
                icon = "lock" 
                placeholder="Senha"
                onChangeText = {text => setPassword(text)}
                secureTextEntry
            />

            <Button onPress={() => handleSignIn()}>Entrar</Button>
            
                <CreateAccountButton onPress ={() => navigation.navigate('SignUp')}>
                    <CreateAccountText>Criar uma Conta</CreateAccountText>
                </CreateAccountButton>

        </Container>
    );
}

export default Signin;