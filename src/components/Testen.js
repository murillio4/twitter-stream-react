import React from 'react'

const TodoList = ({ data, onTodoClick }) => (
  <ul>
      <button onClick={onTodoClick}>
        {data}
      </button>
  </ul>
);

export default TodoList;