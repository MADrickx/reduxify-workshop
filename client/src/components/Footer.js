import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";

const FooterContainer = styled.footer`
    height: 10vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const Cred = styled.p`
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 50%;
`;

const Footer = () => {
    const heart = <FavoriteIcon />;
    return (
        <FooterContainer>
            <Cred>Made with love by : adminski {heart}</Cred>
        </FooterContainer>
    );
};

export default Footer;
