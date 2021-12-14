import React from "react";
import styled from "styled-components";

const Item = styled.div`
    padding-bottom: 1rem;
    padding: 1rem;
`;

const TodoItem = ({item}) => {
    return (
        <Item>
            <p>{item}</p>
        </Item>
    );
};

export default TodoItem;
