import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import "./Login.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await fetch("http://localhost:8000/api/users/login/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            // console.log(response);

            if (!response.ok) {
                throw new Error("An error occurred while logging in");
            }

            const data = await response.json();
            sessionStorage.setItem("accessToken", data.access);
            sessionStorage.setItem("refreshToken", data.refresh);
            sessionStorage.setItem("username", username);

            navigate("/");
        } catch (error) {
            setError("Your username or password is incorrect");
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <Container>
            <LoginBox>
                <Title>Вход</Title>
                    <form onSubmit={handleSubmit}>
                    <Input 
                        type="text"
                        placeholder="Имя Пользователя" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                    <Input 
                        type="password" 
                        placeholder="Пароль" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <Button type="submit">Войти</Button>
                </form>
                <Footer>
                Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
                </Footer>
            </LoginBox>
        </Container>
    );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
`;

const LoginBox = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4facfe;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #4facfe;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #00c6ff;
  }
`;

const Footer = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;

  a {
    color: #4facfe;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;