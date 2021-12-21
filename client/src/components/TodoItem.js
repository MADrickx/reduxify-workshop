import React from "react";
import styled from "styled-components";

const Item = styled.div`
    padding-bottom: 1rem;
    padding: 1rem;
    width: 50%;
`;

const TodoItem = ({filteredItem}) => {
    return (
        <Item>
            <p>{filteredItem}</p>
        </Item>
    );
};

export default TodoItem;
