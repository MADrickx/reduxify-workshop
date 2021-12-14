import React, {useRef, useState} from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import CloseIcon from "@mui/icons-material/Cancel";

const TodoContainer = styled.div`
    background: #dde1e7;
    border-radius: 10px;
    box-shadow: -3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288);
    padding: 1rem;
    margin: 5rem auto;
    width: 50%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TodoHeading = styled.h2`
    width: 100%;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid lightgrey;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
`;

const ButtonAdd = styled.button`
    background-color: green;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonClear = styled.button`
    background-color: orange;
    color: white;
    border-radius: 5px;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;

const ButtonDelete = styled.button`
    background-color: red;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ItemContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    background-color: white;
    box-sizing: border-box;
    padding: 0;
`;

const FilteredContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    &:last-child {
        border: none;
    }
`;

const ModalAdd = styled.div`
    width: 100%;
    display: none;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const AddInput = styled.input`
    width: 100%;
    margin: 1rem 0;
    flex: 10;
`;

const AddButton = styled.button`
    background-color: green;
    border-radius: 5px;
    border: none;
    color: white;
    cursor: pointer;
    flex: 1;
    margin-left: 1rem;
    height: 1.5rem;
`;

const TodoList = () => {
    const [todoItem, setTodoItem] = useState([]);
    const [input, setInput] = useState("");
    const [displayModal, setDisplayModal] = useState(false);

    const Modal = useRef(null);
    const AddInputField = useRef(null);

    const handleAdd = () => {
        setDisplayModal(!displayModal);
        !displayModal
            ? (Modal.current.style.display = "flex")
            : (Modal.current.style.display = "none");
        AddInputField.current.focus();
    };

    const cancel = <CloseIcon />;

    const handleAddInput = (e) => {
        setInput(() => {
            return [e.target.value];
        });
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!(todoItem.filter((item) => item === input).length > 0)) {
            setTodoItem((prev) => [...prev, input]);
        }
        AddInputField.current.value = "";
        AddInputField.current.focus();
    };

    const handleKeypress = (ev) => {
        if (ev.keyCode === 13) {
            handleAddItem(ev);
        }
    };

    const handleClear = () => {
        setTodoItem([]);
    };

    const handleDelete = (index) => {
        const newArr = todoItem;
        newArr[index] = "";
        setTodoItem([...newArr.filter((item) => item !== "")]);
    };

    return (
        <div>
            <TodoContainer>
                <TodoHeading>Liste de courses</TodoHeading>
                <ButtonContainer>
                    <ButtonAdd onClick={handleAdd}>
                        {displayModal ? cancel : "add"}
                    </ButtonAdd>
                    <ButtonClear onClick={handleClear}>Clear</ButtonClear>
                </ButtonContainer>
                <ModalAdd ref={Modal} key={Modal}>
                    <AddInput
                        ref={AddInputField}
                        onChange={handleAddInput}
                        onKeyDown={handleKeypress}
                    />
                    <AddButton type={"submit"} onClick={handleAddItem}>
                        +
                    </AddButton>
                </ModalAdd>
                <ItemContainer>
                    {todoItem
                        .filter((item) => item !== "")
                        .map((filteredItem, index) => (
                            <FilteredContainer
                                id={index}
                                key={`${(filteredItem, index)}`}>
                                <TodoItem item={filteredItem} />
                                <ButtonDelete
                                    onClick={() => handleDelete(index)}>
                                    {cancel}
                                </ButtonDelete>
                            </FilteredContainer>
                        ))}
                </ItemContainer>
            </TodoContainer>
        </div>
    );
};

export default TodoList;
