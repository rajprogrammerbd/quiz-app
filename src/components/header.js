import React, { useContext } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoginFunctionalities } from "./../App";

const HeaderDiv = styled.header`
    width: 100%;
    display: flex;
    flex-direction: center;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 9px 0px #eaeaea;
    position: fixed;
    top: 0;
    background: #fff;
`;

const HeaderContainer = styled.div`
    width: 92%;
    max-width: 960px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const HeaderContainerLeft = styled.div`
    width: 50%;
    min-height: 39px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const HeaderContainerRight = styled.div`
    width: 50%;
    min-height: 39px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const HContentTitle = styled(Link)`
    font-family: inherit;
    font-weight: lighter;
    font-size: 17px;
    text-decoration: none;
    color: #353535;
`;

const HContentQuestion = styled(Link)`
    text-decoration: none;
    margin-right: 20px;
    font-weight: lighter;
    color: grey;
    font-size: 13px;
    text-transform: uppercase;
`;

const HContentLogout = styled.p`
    font-weight: lighter;
    color: grey;
    font-size: 13px;
    text-transform: uppercase;
    cursor: pointer;
`;

function Header() {

    const { logout, login } = useContext(LoginFunctionalities);

    const logoutButton = () => {
        if ( login !== null ) {
            logout();
        }
    }

    return (
        <HeaderDiv>
            <HeaderContainer>
                <HeaderContainerLeft>
                    <HContentTitle to="/">Quiz App</HContentTitle>
                </HeaderContainerLeft>

                <HeaderContainerRight>
                    { ( login ) ? (
                        <>
                        { (login.type === "Admin") ? <HContentQuestion to="/questions">Questions</HContentQuestion> : null }
                        <HContentLogout onClick={logoutButton}>Logout</HContentLogout>
                        </>
                    ) : null }
                </HeaderContainerRight>
            </HeaderContainer>
        </HeaderDiv>
    );
}

export default Header;