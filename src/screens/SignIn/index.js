import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';

import {
    Container,
    InputArea,
    CustomBottom,
    CustomBottomText,
    SignMessageButtom,
    SignMessageButtomText,
    SignMessageButtomTextBold,

} from './styles'

import Api from '../../Api'

import SignInput from '../../components/SignInput'

import ProjetoLogo from '../../assets/logo.svg'
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField);
            if (json.token) {
                await AsyncStorage.setItem('token', json.token);

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                });
            } else {
                alert("E-mail e/ou senha errados!");
            }
        } else {
            alert("Preencha os campos !");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    }


    return (
        <Container>
            <ProjetoLogo width="100%" heigth="160" />

            <InputArea>
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />


                <CustomBottom onPress={handleSignClick} >
                    <CustomBottomText>LOGIN</CustomBottomText>
                </CustomBottom>
            </InputArea>

            <SignMessageButtom onPress={handleMessageButtonClick} >
                <SignMessageButtomText>Ainda não possui uma conta?</SignMessageButtomText>
                <SignMessageButtomTextBold>Cadastre-se</SignMessageButtomTextBold>
            </SignMessageButtom>

        </Container>
    )
}