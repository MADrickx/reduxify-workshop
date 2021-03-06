import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";

const Main = styled.main`
    height: 60vh;
`;

const Login = () => {
    return (
        <>
            <Header />
            <Main>
                <LoginForm />
            </Main>
            <Footer />
        </>
    );
};

export default Login;
