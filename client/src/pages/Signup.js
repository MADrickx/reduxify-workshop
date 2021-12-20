import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Signup from "../components/Signup";
import styled from "styled-components";

const Main = styled.main`
    height: 60vh;
`;

const SignupPage = () => {
    return (
        <>
            <Header />
            <Main>
                <Signup />
            </Main>
            <Footer />
        </>
    );
};

export default SignupPage;
