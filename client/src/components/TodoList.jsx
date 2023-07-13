import React, { useEffect, useState } from "react";
import TodoEdit from "./TodoEdit";

const TodoList = () => {
  const [todo, setTodo] = useState([]);

  //delete todo function

  const deleteTodo = async (id) => {
    try {

      const deleteTodo = await fetch(
        `https://full-app-0eu6.onrender.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      setTodo(todo.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodo = async () => {
    try {
      const response = await fetch("https://full-app-0eu6.onrender.com/todos");
      const jsonData = await response.json();

      setTodo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  console.log(todo);

  return (
    <>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {todo.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <TodoEdit todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;