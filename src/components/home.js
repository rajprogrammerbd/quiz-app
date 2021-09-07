import React from "react";
import Header from "./header";
import styled from "styled-components";
import LoginFunctionality from "./login";
import Success from "./sucess";
import Test from "./test";

const MainContainer = styled.main`
    width: 70%;
    height: 60%;
    border-radius: 8px;
    border: 0.4px solid #e6e6e6;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MainContainerLeft = styled.div`
    width: 50%;
    height: 100%;
    border-right: 0.4px solid #e6e6e6;
    background: #6fa6b3;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const MainContainerLeftText = styled.h3`
    color: white;
    font-size: 26px;
    font-family: inherit;
    margin-left: 15px;
    text-transform: uppercase;
    font-weight: lighter;
`;

const MainContainerRight = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;



function Home({ login, done }) {

    return (
        <>
            <Header />

            <MainContainer>

                <MainContainerLeft>
                    <MainContainerLeftText>Here</MainContainerLeftText>
                    <MainContainerLeftText>You can play</MainContainerLeftText>
                    <MainContainerLeftText>Quiz game</MainContainerLeftText>
                </MainContainerLeft>

                <MainContainerRight>
                    { ( login ) ? ( done ) ? <Success /> : <Test login={login} /> : <LoginFunctionality /> }
                </MainContainerRight>

            </MainContainer>
        </>
    );
}

export default Home;