import React from "react";
import './styles.css'
interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul className="">
      {props.items.map((todo) => (
        <li
          className="border-2 bg-slate-700 border-accent flex justify-between text-xl rounded-box "
          key={todo.id}
        >
          <span className="text-white  m-5">{todo.text} </span>
          <button className="m-5 btn btn-sm btn-outline btn-error" onClick={props.onDeleteTodo.bind(null, todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
