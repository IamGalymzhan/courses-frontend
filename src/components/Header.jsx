import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    const username = sessionStorage.getItem("username");

    return (
        <Container>
            <Left>
                <StyledLink to="/">Главная</StyledLink>
                <StyledLink to="/about">О нас</StyledLink>
            </Left>
            <Right>
                <StyledLink >{username}</StyledLink>
                <StyledLink to="/login">Выйти</StyledLink>
            </Right>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 80px;
    background: #eee;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Left = styled.div`
    display: flex;
`;

const Right = styled.div`
    display: flex;
`;

const StyledLink = styled(Link)`
    margin: 0 20px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: color 0.2s;

    &:hover {
        color: #007acc;
    }
`;
