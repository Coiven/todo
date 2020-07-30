import React, { useEffect, useState } from 'react';
import styles from './Todo.css';
import TodoInput from './TodoInput';

export type todoItem = {
  todoValue: string;
  isDone?: boolean;
  create_at?: Date;
  modified_at?: Date;
};

const Store = require('electron-store');

const store = new Store({
  schema: {
    'todo-list': {
      type: 'array',
      default: [],
    },
  },
});

export default function Todo() {
  const defaultItem = {
    todoValue: '',
    isDone: false,
    create_at: new Date(),
    modified_at: new Date(),
  };
  const [list, setList] = useState<todoItem[]>([]);
  const [temp, setTemp] = useState<todoItem>(defaultItem);

  const handleUpdate = (todo: todoItem, index?: number) => {
    setTemp(defaultItem);
    let plist: todoItem[];
    if (typeof index === 'undefined') {
      plist = [...list, todo];
    } else {
      list.splice(index, 1, todo);
      plist = list;
    }
    plist = plist.filter((l: todoItem) => l.todoValue !== '');
    setList(plist);
    console.log(plist);
    store.set('todo-list', plist);
  };

  useEffect(() => {
    const list = store.get('todo-list');
    console.log(list);
    setList(list);
  }, []);

  return (
    <div className={styles.todo}>
      {list.length > 0 &&
        list.map((l: todoItem, index: number) => {
          if (!l.todoValue) return '';
          return (
            <TodoInput
              key={index}
              todoValue={l.todoValue}
              isDone={l.isDone}
              update={(todo) => handleUpdate(todo, index)}
            />
          );
        })}
      <TodoInput
        todoValue={temp.todoValue}
        isDone={temp.isDone}
        update={handleUpdate}
      />
    </div>
  );
}
