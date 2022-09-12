import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import {MdCheckBoxOutlineBlank, MdCheckBox, MdEdit, MdDelete} from "react-icons/md"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import FormControl from "react-bootstrap/FormControl"
import { useState } from "react"

export default function TodoList({todos, setTodos}) {

    const [show, setShow] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    const handleChange = (e) => {
        setCurrentTodo({...currentTodo, title: e.target.value})
    }

    const handleSaveChanges = async () => {
        await handleUpdate(currentTodo.id, {title: currentTodo.title})
        handleClose()
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleDelete = (id) => {
        axios.delete(`/api/todos/${id}/`)
        .then(()=>{
            const newTodos = todos.filter((todo) => todo.id !== id)
            setTodos(newTodos)
        }).catch((err) => {
            alert(err)
        })
        
    }

    const handleUpdate = async(id, value) => {
        axios.patch(`/api/todos/${id}/`, value)
        .then((res)=> {
            const {data} = res
            const newTodos = todos.map((todo) => {
                if(todo.id === data.id){
                    return data
                }else{
                    return todo
                }
        })
        setTodos(newTodos)
    }
    ).catch((err) => alert(err))}

    const renderListGroupItem = (todo)=> {
        return (
            <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                <div>
                    <span style={{marginRight:"12px", cursor:"pointer"}} onClick={()=>{handleUpdate(todo.id, {completed: !todo.completed, title: todo.title})}} >
                        {todo.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    </span>
                    <span>
                        {todo.title}
                    </span>
                </div>
                <div>
                    <MdEdit style={{marginRight:"12px", cursor:"pointer"}} onClick={
                        ()=>{
                            setCurrentTodo(todo)
                            setShow(true)
                        }
                    } />
                    <MdDelete style={{cursor:"pointer"}} onClick={()=>{
                        handleDelete(todo.id)
                    }} />
                </div>
            </ListGroup.Item>
        )
    }
    
    const completedTodos = todos.filter((todo) => todo.completed === true)
    const inCompletedTodos = todos.filter((todo) => todo.completed === false)

    return (
            <div>
                <div className="mb-2 mt-4">
                Incomplete Todos ({inCompletedTodos.length})
            </div>
                <ListGroup>
                    {inCompletedTodos.map(renderListGroupItem)}
                </ListGroup>
            <div className="mb-2 mt-4">
                Completed Todos ({completedTodos.length})
            </div>
                <ListGroup>
                    {completedTodos.map(renderListGroupItem)}
                </ListGroup>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit ToDo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl value={currentTodo ? currentTodo.title : ""} onChange={handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>     
            </Modal>
        </div>
    )
}