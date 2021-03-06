import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
'   background-color: #fe9500;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
    padding-top: -30px
  
`;

export const CustomBottom = styled.TouchableOpacity`
    height: 60px;
    background-color: #cb7700;
    border-radius:30px;
    justify-content: center;
    align-items:center;
`;
export const CustomBottomText = styled.Text`
    font-size: 18px;
    color: #fff;
`;

export const SignMessageButtom = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin- bottom: 20px;
`;
export const SignMessageButtomText = styled.Text`
    font-size: 16px;
    color: rgb(169,121,54);
`;
export const SignMessageButtomTextBold = styled.Text`
    font-size: 16px;
    color: rgb(169,121,54);
    font-weight: bold;
    margin-left: 5px;
`;


