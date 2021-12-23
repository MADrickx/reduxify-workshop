import React from "react";
import styled from "styled-components";

const Item = styled.div`
    padding-bottom: 1rem;
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ItemName = styled.span`
    padding-bottom: 1rem;
    padding: 0.25rem 0.5rem 0.25rem 0;
`;

const ItemQuantity = styled.span`
    padding-bottom: 1rem;
    padding: 0.25rem 0.5rem;
    width: 35px;
    background-color: lightgray;
    border-radius: 500px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
`;

const TodoItem = ({filteredItem, quantity}) => {
    return (
        <Item>
            <ItemName>{filteredItem}</ItemName>
            {quantity > 1 ? <ItemQuantity>{`x ${quantity}`}</ItemQuantity> : ""}
        </Item>
    );
};

export default TodoItem;
