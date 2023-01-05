import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

export default function TodoForm({ todos, setTodos }) {


  const [title, setTitle] = useState("");

    const handleChange = e => {
      setTitle(e.target.value);
    }

  const addTodo = async (e) => {
    if (!title) {
      alert("Please provide a valid value for todo");
      return;
  }
    axios.post("/api/todos/", {title: title})
    .then((res) => {
      setTitle("");
      const {data} = res
      setTodos([...todos, data])
      e.target.value = ""
    }).catch((err) => alert(err))
  };



  return (
    <div>
      <Form>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="New Todo"
            aria-label="Enter a Todo"
            onChange={handleChange}
            value={title}
          />
            <Button variant="outline-primary" onClick={addTodo}>Add Todo</Button>
        </InputGroup>
      </Form>
    </div>
  );
}