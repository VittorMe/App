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

import SignInput from '../../components/SignInput'

import Api from '../../Api'

import ProjetoLogo from '../../assets/logo.svg'
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');



    const handleSignClick = async () => {
        if (nameField != '' && emailField != '' && passwordField != '') {
            let res = await Api.signIn(nameField, emailField, passwordField);
            if (res.token) {
                await AsyncStorage.setItem('token', res.token);

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                });

                navigation.reset({
                    routes:[{name:'MainTab'}]
                });
            } else {
                alert("Erro:" + res.error);
            }
        } else {
            alert("Peencha os Campos 2")
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }


    return (
        <Container>
            <ProjetoLogo width="100%" heigth="160" />

            <InputArea>
                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)}
                />
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
                    <CustomBottomText>CADASTRAR</CustomBottomText>
                </CustomBottom>
            </InputArea>

            <SignMessageButtom onPress={handleMessageButtonClick} >
                <SignMessageButtomText>Já possui uma conta?</SignMessageButtomText>
                <SignMessageButtomTextBold>Faça login</SignMessageButtomTextBold>
            </SignMessageButtom>

        </Container>
    )
}