import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

import React, { useState, useEffect } from "react";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos/")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setTodos(data)
      });
    
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" style={{marginBottom:"20px"}}>
        <Container>
          <Navbar.Brand href="#">Todo App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
}

export default App;
