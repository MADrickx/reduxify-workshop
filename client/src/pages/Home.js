import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "../components/TodoList";
import styled from "styled-components";

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
