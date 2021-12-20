import React, {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {mobile} from "../responsive";

const HeaderContainer = styled.header`
    height: 20vh;
    background-color: black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    ${mobile({
        flexDirection: "column",
    })};
`;

const HeadingOne = styled.h1`
    text-align: center;
    color: white;
    font-family: Helvetica, Arial, sans-serif;
`;

const UserName = styled.p`
    color: white;
`;

const Header = () => {
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            setError("Failed to logout");
        }
    }

    const handleRedirect = () => {
        navigate("/login");
    };

    return (
        <HeaderContainer>
            {currentUser ? (
                <UserName>{currentUser?.email}</UserName>
            ) : (
                <UserName>not logged in</UserName>
            )}

            <HeadingOne>MangeTesCourses</HeadingOne>
            <div>
                {currentUser ? (
                    <button
                        onClick={() => {
                            handleLogout();
                        }}>
                        logout
                    </button>
                ) : (
                    <button onClick={handleRedirect}>Log In</button>
                )}
            </div>
            {error && <p>{error}</p>}
        </HeaderContainer>
    );
};

export default Header;
