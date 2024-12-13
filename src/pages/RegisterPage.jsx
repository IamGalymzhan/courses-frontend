import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const register = async (username, email, password) => {
    try {
      const response = await fetch("https://courses-platform-backend.onrender.com/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while registering");
      }

    } catch (error) {
      setError(error.message);
    }
  }

  const login = async (username, password) => {
    try {
        const response = await fetch("https://courses-platform-backend.onrender.com/api/users/login/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        console.log(response);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    register(formData.username, formData.email, formData.password)
    .then(() => login(formData.username, formData.password));
  };

  return (
    <Container>
      <LoginBox>
        <Title>Регистрация</Title>
        <form onSubmit={handleSubmit}>
          <Input 
            type="text" 
            placeholder="Имя Пользователя"
            name="username"
            value={formData.username}
            onChange={handleChange} 
            required />
          <Input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required />
          <Input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required />
          <Button type="submit">Зарегистироваться</Button>
        </form>
        <Footer>
          Уже есть аккаунт? <Link to="/login">Войдите</Link>
        </Footer>
      </LoginBox>
    </Container>
  );
};

export default RegisterPage;

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