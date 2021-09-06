import React, { useContext } from "react";
import styled from "styled-components";
import { LoginFunctionalities } from "./../App";

const SucessMessage = styled.h3`
    font-size: 20px;
    font-family: inherit;
    text-transform: uppercase;
    color: #6dabb9;
`;

const LinkAncor = styled.button`
    text-decoration: none;
    color: #fff;
    background: #e46f6f;
    padding: 6px 9px;
    font-size: 13px;
    border-radius: 6px;
    margin-top: 11px;
    border: none;
    cursor: pointer;
`;

function Success({ result }) {

    const { addedAnswers } = useContext(LoginFunctionalities);

    const submit = () => {
        addedAnswers(result);
    }
    
    return (
        <>
            <SucessMessage>Sucess Message</SucessMessage>
            <LinkAncor onClick={submit}>Home</LinkAncor>
        </>
    );
}

export default Success;