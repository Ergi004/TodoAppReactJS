import React, { useRef } from "react";

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label className="text-blue-100 m-5" htmlFor="todo-text">
          Todo text
        </label>
        <input
          placeholder="Type here"
          className=" input-bordered input w-full max-w-xs"
          type="text"
          id="todo-text"
          ref={textInputRef}
        />
      </div>
      <button className="btn btn-outline btn-accent m-10" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default NewTodo;
