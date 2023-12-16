import React, { useCallback, useState } from 'react'
import { Button, ButtonGroup, Card, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, MenuItem, Select } from '@mui/material';
import { Close, Add, Edit } from '@mui/icons-material';
import './styles.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTodo from './AddTodo';


const Todo = () => {

    const [openPanel, setOpenPanel] = useState(false);
    const [option, setOption] = useState("All");
    const [todoItems, setTodoItems] = useState(JSON.parse(window.localStorage.getItem("todo")) ?? []);
    const [lastId, setLastId] = useState(Number(window.localStorage.getItem("lastId")) ?? 0);
    const [message, setMessage] = useState("");
    const [todoItem, setToItem] = useState({});
    const onAddEditClick = useCallback((item) => {
        console.log("Item ==>", item);
        setOpenPanel(true);
        if(item) {
           setMessage("Update TODO");
           setToItem(item);
        } else {
            setMessage("Add TODO")
        }
    }, []);

    const handleClose = useCallback(() => {
        setOpenPanel(false);
        setToItem({})
    }, [])

    const OnSelectChange = useCallback((value) => {
        console.log("value-->", value);
        setOption(value.target.value);
        const allData = JSON.parse(window.localStorage.getItem("todo"))
        if (value.target.value === "All") {
            setTodoItems(allData);
        }else {
            setTodoItems(allData.filter((item) => item.status === value.target.value));
        }
    }, []);

    const onDeleteClick = useCallback((item) => {
        console.log("item -->", item);
        const updatedData = JSON.parse(window.localStorage.getItem("todo")).filter((todo) => todo.Id !== item.Id);
        const filteredItems = todoItems.filter((todo) => todo.Id !== item.Id);
        setTodoItems(filteredItems);
        window.localStorage.setItem("todo", JSON.stringify(updatedData))
    }, [todoItems]);

    const onFormSubmit = useCallback((values, isUpdate) => {
        if (!isUpdate) {
            const item = {...values, Id: lastId + 1}
            setLastId(lastId +1)
            if(option === "All") {
                setTodoItems((prev) => [...prev, item]);
            } else {
                setTodoItems((prev) => item.status === option ? [...prev, item]: prev)
            }
            localStorage.setItem("todo", JSON.stringify([...JSON.parse(window.localStorage.getItem("todo")), item]))
            localStorage.setItem("lastId", lastId + 1);
        } else {
            const newData = todoItems.map((todo) => {
                if (todo.Id === values.Id) {
                    todo.title= values.title;
                    todo.status= values.status;
                }
                return todo;
            });
            setTodoItems(newData);
            window.localStorage.setItem("todo", JSON.stringify(newData));
            setToItem({});
        }
    }, [todoItems, option]);

    return (
        <div className='app'>
            <div className='title'>TODO LIST</div>
            <div className='button'>
                <Button
                    onClick={() => onAddEditClick(undefined)}
                    variant='outlined'
                    endIcon={<Add />}

                >
                    ADD
                </Button>
                <Select value={option} onChange={OnSelectChange}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                </Select>
            </div>
            <div className='todolist'>
                {!todoItems.length && (
                    <Card>
                        <CardContent>
                            No Items Found
                        </CardContent>
                    </Card>
                )}
                {todoItems.length ? (
                    todoItems.map((item) => (
                        <Card className='card'>
                            <CardContent>
                                {item.title}
                            </CardContent>
                            <ButtonGroup variant="outlined" aria-label="text button group">
                                <Button onClick={() => onAddEditClick(item)}><Edit /></Button>
                                <Button onClick={() => onDeleteClick(item)}><DeleteIcon /></Button>
                            </ButtonGroup>

                        </Card>
                    ))
                ) : ""}
            </div>

            {openPanel && (
                <AddTodo
                    onHandleClose={handleClose}
                    openPanel={openPanel}
                    onFormSubmit={onFormSubmit}
                    todoItem={todoItem}
                    message={message}
                />
            )}
        </div>
    )
}

export default Todo;