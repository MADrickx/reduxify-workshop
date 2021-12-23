import React, {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import CloseIcon from "@mui/icons-material/Cancel";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddIcon from "@mui/icons-material/Add";
import CheckCircle from "@mui/icons-material/Check";
import {mobile} from "../responsive";
import {db} from "../firebase";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import {InputLabel} from "@mui/material";

const TodoContainer = styled.div`
    background-color: ${(props) =>
        props.done ? "rgba(0,255,0,0.25)" : "rgba(255,0,0,0.25)"};
    border-radius: 10px;
    box-shadow: -3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288);
    padding: 1rem;
    margin: 2rem auto 7rem auto;
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
    border-bottom: 1px solid white;
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

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 1rem 1rem 0;
    background-color: white;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1rem;
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

const ButtonSwitch = styled.button`
    background-color: ${(props) => (props.done ? "green" : "red")};
    color: white;
    border-radius: 5px;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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
    width: 90%;
    margin: 1rem 0;
    flex: 10;
`;
const QuantityInput = styled.input`
    width: 90%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
`;

const TodoList = () => {
    const [todoItem, setTodoItem] = useState([]);
    const [doneItem, setDoneItem] = useState([]);
    const [input, setInput] = useState("");
    const [quantity, setQuantity] = useState("");
    const [displayModal, setDisplayModal] = useState(false);
    const [done, setDone] = useState(false);
    const itemsCollectionRef = collection(db, "items");
    const Modal = useRef(null);
    const AddInputField = useRef(null);
    const QuantityInputField = useRef(null);

    const cancel = <CloseIcon />;
    const clear = <ClearAllIcon />;
    const add = <AddIcon />;
    const success = <CheckCircle />;

    useEffect(() => {
        const getItems = async () => {
            // eslint-disable-next-line no-unused-vars
            const data = await getDocs(itemsCollectionRef).then((data) => {
                setTodoItem(
                    data.docs.map((doc) => ({...doc.data(), id: doc.id})),
                );
            });
        };

        getItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAdd = () => {
        setDisplayModal(!displayModal);
        setDone(false);
        !displayModal
            ? (Modal.current.style.display = "flex")
            : (Modal.current.style.display = "none");
        AddInputField.current.focus();
    };

    const handleSwitch = () => {
        setDone(!done);
        const newArr = todoItem.filter((item) => {
            return item.isDone === true;
        });
        setDoneItem(newArr);
        console.log(newArr);
    };

    const handleAddInput = (e) => {
        setInput(() => {
            return e.target.value;
        });
    };

    const handleQuantityInput = (e) => {
        setQuantity(() => {
            return e.target.value;
        });
    };

    const handleAddItem = async (e) => {
        await addDoc(itemsCollectionRef, {
            name: input,
            isDone: false,
            quantity,
        }).then(function (docRef) {
            setTodoItem((prev) => [
                ...prev,
                {name: input, id: docRef.id, quantity},
            ]);
        });
        AddInputField.current.value = "";
        setInput("");
        QuantityInputField.current.value = "";
        setQuantity("");
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

    const handleSetToDone = async (id) => {
        const userDoc = doc(db, "items", id);
        await updateDoc(userDoc, {
            isDone: true,
        }).then(() => {
            const index = todoItem.findIndex((x) => x.id === id);
            const newArr = todoItem;
            newArr[index].isDone = true;
            setDoneItem((prev) => [...prev, newArr[index]]);
        });
    };

    const handleDelete = async (id) => {
        const userDoc = doc(db, "items", id);
        await deleteDoc(userDoc).then(() => {
            if (done) {
                const newArr = doneItem.filter((item) => {
                    return item.id !== id;
                });
                setDoneItem(newArr);
                console.log(doneItem);
            } else {
                const newArr = todoItem.filter((item) => {
                    return item.id !== id;
                });
                setTodoItem(newArr);
                console.log(todoItem);
            }
        });
    };

    return (
        <div>
            <TodoContainer done={done}>
                <TodoHeading>
                    Liste de courses{" "}
                    {done ? "dans le panier" : "pas encore dans le panier"}
                </TodoHeading>
                <ButtonContainer>
                    <ButtonAdd onClick={handleAdd}>
                        {displayModal ? cancel : add}
                    </ButtonAdd>
                    <ButtonSwitch done={!done} onClick={handleSwitch}>
                        {!done ? success : cancel}
                    </ButtonSwitch>
                    <ButtonClear onClick={handleClear}>{clear}</ButtonClear>
                </ButtonContainer>
                <ModalAdd ref={Modal} key={Modal}>
                    <InputContainer>
                        <InputLabel>name</InputLabel>
                        <AddInput
                            ref={AddInputField}
                            onChange={handleAddInput}
                            onKeyDown={handleKeypress}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>quantity</InputLabel>
                        <QuantityInput
                            type={"number"}
                            ref={QuantityInputField}
                            onChange={handleQuantityInput}
                            onKeyDown={handleKeypress}
                        />
                    </InputContainer>
                    <AddButton type={"submit"} onClick={handleAddItem}>
                        {add}
                    </AddButton>
                </ModalAdd>
                <ItemContainer>
                    {!done
                        ? todoItem
                              .filter((item) => {
                                  return item.isDone !== true;
                              })
                              .map((filteredItem) => (
                                  <FilteredContainer key={`${filteredItem.id}`}>
                                      <TodoItem
                                          filteredItem={filteredItem.name}
                                          quantity={filteredItem.quantity}
                                      />
                                      <ButtonContainer2>
                                          <ButtonSetToDone
                                              onClick={() =>
                                                  handleSetToDone(
                                                      filteredItem.id,
                                                  )
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
                              ))
                        : doneItem?.map((filteredItem) => (
                              <FilteredContainer key={`${filteredItem.id}`}>
                                  <TodoItem
                                      filteredItem={filteredItem.name}
                                      quantity={filteredItem.quantity}
                                  />
                                  <ButtonContainer2>
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
