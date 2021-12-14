import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

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

const LoginForm = ({admin, setAdmin}) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        setAdmin(true);
        if (admin) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    };

    return (
        <Form>
            <InputsContainer>
                <Label>username</Label>
                <Inputs />
            </InputsContainer>
            <InputsContainer>
                <Label>password</Label>
                <Inputs />
            </InputsContainer>
            <InputsContainer>
                <Submit type={"submit"} onClick={handleClick}>
                    Se Connecter
                </Submit>
            </InputsContainer>
        </Form>
    );
};

export default LoginForm;
