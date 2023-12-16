import { Dialog, DialogTitle, IconButton, DialogContent, DialogContentText, Input, TextField, Select, MenuItem, InputLabel, Button } from '@mui/material'
import React, { useCallback, useState } from 'react';
import { Close } from '@mui/icons-material';
import "./styles.css"


const AddTodo = (props) => {
    const [option, setOption] = useState("Pending")
    const OnSelectChange = useCallback((item) => {
        setOption(item.target.value)
    }, []);
    const onFormSubmit = useCallback((e) => {
        e.preventDefault();
        // console.log("values =>", e);
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());
        if(props.todoItem.Id) {
            props.onFormSubmit({...values, Id: props.todoItem.Id}, true);
        } else {
            props.onFormSubmit(values, false)
        }
        props.onHandleClose();
    }, [props.onFormSubmit, props.onHandleClose]);
    return (
        <div>
            <Dialog
                open={props.openPanel}
                keepMounted
                onClose={props.onHandleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle>{props.message}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.onHandleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <DialogContent>
                    <form onSubmit={onFormSubmit}>
                        <InputLabel variant="standard" fullWidth>Title</InputLabel>
                        <TextField id="outlined-basic" variant="outlined" fullWidth name='title' defaultValue={props.todoItem.title ?? ''}/>
                        <br />
                        
                        <br />
                        <InputLabel variant="standard" fullWidth>Status</InputLabel>
                        <Select defaultValue={props.todoItem.status ?? option} onChange={OnSelectChange} fullWidth name='status'>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                        <div className='btn-submit'>
                            <Button style={{ padding: "10px", margin: "5px" }} variant="outlined" type='submit'>{props.todoItem.Id ? "Update" : "Add"}</Button>
                            <Button style={{ padding: "10px", margin: "5px" }} variant="outlined" onClick={props.onHandleClose}>Cancel</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddTodo