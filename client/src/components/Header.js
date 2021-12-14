import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    height: 20vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeadingOne = styled.h1`
    text-align: center;
    color: white;
    font-family: Helvetica, Arial, sans-serif;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <HeadingOne>MangeTesCourses</HeadingOne>
        </HeaderContainer>
    );
};

export default Header;
