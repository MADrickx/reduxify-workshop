import React, {useRef, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {mobile} from "../responsive";
const Form = styled.form`
    width: 50%;
    background: #dde1e7;
    border-radius: 10px;
    box-shadow: -3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288);
    padding: 1rem;
    margin: 5rem auto;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${mobile({
        width: "90%",
        boxSizing: "border-box",
        padding: "5%",
    })};
`;

const InputsContainer = styled.div`
    width: 90%;
    padding: 1rem 5%;
    display: flex;
    flex-direction: column;
`;

const Inputs = styled.input`
    border-radius: 5px;
    border: none;
    padding: 0.5rem 0.25rem;
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
    &:focus {
        box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff73;
    }
`;

const Label = styled.label`
    margin: 1rem 0;
`;

const Submit = styled.button`
    border-radius: 5px;
    background-color: green;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;

const ErrorBox = styled.p`
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    padding: 1rem 0;
    border-radius: 5px;
    width: 90%;
    margin: 0 1rem;
    text-align: center;
`;

const LoginForm = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (err) {
            setError("failed to log in");
        }
        setLoading(false);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {error && <ErrorBox>{error}</ErrorBox>}
            <InputsContainer>
                <Label>email</Label>
                <Inputs ref={emailRef} />
            </InputsContainer>
            <InputsContainer>
                <Label>password</Label>
                <Inputs type="password" ref={passwordRef} />
            </InputsContainer>
            <InputsContainer>
                <Submit type={"submit"} disabled={loading}>
                    Se Connecter
                </Submit>
            </InputsContainer>
        </Form>
    );
};

export default LoginForm;
