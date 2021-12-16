import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";

const Main = styled.main`
    height: 60vh;
`;

const Login = ({admin, setAdmin}) => {
    return (
        <>
            <Header />
            <Main>
                <LoginForm admin={admin} setAdmin={setAdmin} />
            </Main>
            <Footer />
        </>
    );
};

export default Login;
