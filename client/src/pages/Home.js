import React, {useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "../components/TodoList";
import styled from "styled-components";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const Main = styled.main``;

const Home = () => {
    return (
        <>
            <Header />
            <Main>
                <TodoList />
            </Main>
            <Footer />
        </>
    );
};

export default Home;
