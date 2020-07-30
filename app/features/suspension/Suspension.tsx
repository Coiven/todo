import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { ipcRenderer } from 'electron';
import routes from '../../constants/routes';
import styles from './Suspension.css';
import { todoItem } from '../todo/Todo';

const Store = require('electron-store');

const store = new Store({
  schema: {
    'todo-list': {
      type: 'array',
      default: [],
    },
  },
});

export default function Suspension() {
  const ref = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  let timer: NodeJS.Timeout;
  useEffect(() => {
    if (timer) clearTimeout(timer);
    if (ref.current) {
      ref.current.style.borderRadius = '100%';
    }

    const list: todoItem[] = store.get('todo-list');
    const len: number = list.length;
    const done: number = list.filter((l: todoItem) => l.isDone).length;
    const num: number = ~~((done / len) * 100);
    setProgress(num);
    if (waveRef.current) {
      waveRef.current.style.top = `${60 - 1.2 * num}%`;
    }
  }, []);

  const handleSuspensionClick = () => {
    history.push(routes.HOME);
    ipcRenderer.send('suspension-hide');
  };

  return (
    <div
      ref={ref}
      className={styles.container}
      onDoubleClick={handleSuspensionClick}
    >
      <h1 className={styles.progress}>{progress}
%
</h1>
      <div ref={waveRef} className={styles.wave} />
      {/* <div className={styles.wave}></div>
      <div className={styles.wave}></div> */}
    </div>
  );
}
