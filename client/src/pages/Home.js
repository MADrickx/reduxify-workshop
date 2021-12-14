import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "../components/TodoList";

const Home = () => {
    return (
        <>
            <Header />
            <TodoList />
            <Footer />
        </>
    );
};

export default Home;
