import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { LoginFunctionalities } from "./../App";

const MainContainerRightForm = styled.form`
    width: 250px;
    max-width: 85%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const FormLabel = styled.label`
    font-size: 13px;
    color: #000;
    font-weight: 100;
    letter-spacing: 1px;
    margin-bottom: 4px;
    margin-top: 10px;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 3px 9px;
    border-radius: 6px;
    border: 0.3px solid #ddd;
    font-family: inherit;
    font-size: 12px;
`;

const FormErrorText = styled.small`
    color: red;
    font-size: 11px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: -11px;
    margin-top: 5px;
`;

function LoginFunctionality() {

    const [ state, setState ] = useState({ email: '', password: '' });
    const { login, error, loginFunction } = useContext(LoginFunctionalities);

    const formSubmitted = e => {
        e.preventDefault();
        if ( login === null ) {
            loginFunction({ email: state.email.trim(), password: state.password.trim() });
        }
    }

    return (
        <>
            <MainContainerRightForm onSubmit={formSubmitted}>
                <FormGroup>
                    <FormLabel htmlFor="#email_value">Email</FormLabel>
                    <FormInput type="email" value={state.email} onChange={e => setState({ ...state, email: e.target.value })} required placeholder="Enter your email" id="email_value" />
                </FormGroup>

                <FormGroup>
                    <FormLabel htmlFor="password_value">Password</FormLabel>
                    <FormInput type="password" value={state.password} onChange={e => setState({ ...state, password: e.target.value })} required id="password_value" placeholder="Enter your password" />
                </FormGroup>
                { (error === false) ? null : <FormErrorText>{error}</FormErrorText> }
                <FormInput type="submit" style={{ marginTop: 20, cursor: 'pointer' }} value="Login" />
            </MainContainerRightForm>
        </>
    );
}

export default LoginFunctionality;