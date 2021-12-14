import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
const Login = ({admin, setAdmin}) => {
    return (
        <div>
            <Header />
            <LoginForm admin={admin} setAdmin={setAdmin} />
            <Footer />
        </div>
    );
};

export default Login;
