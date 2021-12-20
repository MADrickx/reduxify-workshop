import React, {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import CloseIcon from "@mui/icons-material/Cancel";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddIcon from "@mui/icons-material/Add";
import CheckCircle from "@mui/icons-material/Check";
import {mobile} from "../responsive";
import {db} from "../firebase";
import {addDoc, collection, doc, getDocs, deleteDoc} from "firebase/firestore";
const TodoContainer = styled.div`
    background: #dde1e7;
    border-radius: 10px;
    box-shadow: -3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288);
    padding: 1rem;
<<<<<<< HEAD
    margin: 1rem auto 7rem auto;
=======
    margin: 2rem auto 7rem auto;
>>>>>>> 80e301aa8ec4654f2355a0cadf71d1576514f552
    width: 50%;
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

const ButtonContainer2 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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
    display: flex;
    align-items: center;
    justify-content: center;
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

const ButtonSetToDone = styled.button`
    background-color: green;
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0;
`;

const TodoList = () => {
    const [todoItem, setTodoItem] = useState([]);
    const [input, setInput] = useState("");
    const [displayModal, setDisplayModal] = useState(false);
    const itemsCollectionRef = collection(db, "items");
    const Modal = useRef(null);
    const AddInputField = useRef(null);

    const cancel = <CloseIcon />;
    const clear = <ClearAllIcon />;
    const add = <AddIcon />;
    const success = <CheckCircle />;
    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemsCollectionRef);
            setTodoItem(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getItems();
    }, []);

    const handleAdd = () => {
        setDisplayModal(!displayModal);
        !displayModal
            ? (Modal.current.style.display = "flex")
            : (Modal.current.style.display = "none");
        AddInputField.current.focus();
    };

    const handleAddInput = (e) => {
        setInput(() => {
            return e.target.value;
        });
    };

    const handleAddItem = async (e) => {
        await addDoc(itemsCollectionRef, {
            name: input,
            isDone: false,
            quantity: 1,
        }).then(function (docRef) {
            setTodoItem((prev) => [...prev, {name: input, id: docRef.id}]);
        });
        AddInputField.current.value = "";
        AddInputField.current.focus();
    };

    const handleKeypress = (ev) => {
        if (ev.keyCode === 13) {
            handleAddItem(ev);
        }
    };

    const handleClear = () => {
        todoItem.forEach(async (item) => {
            const userDoc = doc(db, "items", item.id);
            await deleteDoc(userDoc).then(() => {
                console.log("deleted object with ID : " + item.id);
            });
        });
        setTodoItem([]);
    };

    const handleSetToDone = () => {};

    const handleDelete = async (id) => {
        const userDoc = doc(db, "items", id);
        await deleteDoc(userDoc).then(() => {
            const newArr = todoItem.filter((item) => {
                return item.id !== id;
            });
            setTodoItem(newArr);
        });
    };

    return (
        <div>
            <TodoContainer>
                <TodoHeading>Liste de courses</TodoHeading>
                <ButtonContainer>
                    <ButtonAdd onClick={handleAdd}>
                        {displayModal ? cancel : add}
                    </ButtonAdd>
                    <ButtonClear onClick={handleClear}>{clear}</ButtonClear>
                </ButtonContainer>
                <ModalAdd ref={Modal} key={Modal}>
                    <AddInput
                        ref={AddInputField}
                        onChange={handleAddInput}
                        onKeyDown={handleKeypress}
                    />
                    <AddButton type={"submit"} onClick={handleAddItem}>
                        {add}
                    </AddButton>
                </ModalAdd>
                <ItemContainer>
                    {todoItem.map((filteredItem) => (
                        <FilteredContainer key={`${filteredItem.id}`}>
                            <TodoItem filteredItem={filteredItem.name} />
                            <ButtonContainer2>
                                <ButtonSetToDone
                                    onClick={() =>
                                        handleSetToDone(filteredItem.id)
                                    }>
                                    {success}
                                </ButtonSetToDone>
                                <ButtonDelete
                                    onClick={() =>
                                        handleDelete(filteredItem.id)
                                    }>
                                    {cancel}
                                </ButtonDelete>
                            </ButtonContainer2>
                        </FilteredContainer>
                    ))}
                </ItemContainer>
            </TodoContainer>
        </div>
    );
};

export default TodoList;
