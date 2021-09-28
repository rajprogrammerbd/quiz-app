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
            <SucessMessage>Are you sure?</SucessMessage>
            <LinkAncor onClick={submit}>Finally Submit</LinkAncor>
        </>
    );
}

export default Success;