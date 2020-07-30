import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import styles from './TodoInput.css';
import { todoItem } from './Todo';

type Props = todoItem & {
  update?: (todo: todoItem) => void;
};

export default function TodoInput(props: Props) {
  const { todoValue, isDone, update, create_at, modified_at } = props;
  const [value, setValue] = useState('');
  const [done, setDone] = useState(false);
  const [active, setActive] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(todoValue || '');
    setDone(isDone || false);
  }, [props]);

  useEffect(() => {
    ref.current && autoHeight(ref.current);
  }, []);

  const handleFocus = (e: ChangeEvent): void => {
    if (!e.target) return;
    const target = e.target as HTMLTextAreaElement;

    autoHeight(target);

    setActive(true);
  };

  const autoHeight = (target: HTMLTextAreaElement) => {
    target.style.height = 'auto';
    // 如果高度不够，再重新设置
    if (target.scrollHeight >= target.offsetHeight) {
      target.style.height = `${target.scrollHeight}px`;
    }
    return target;
  };

  const handleBlur = (e: ChangeEvent): void => {
    if (!e.target) return;
    const target = e.target as HTMLTextAreaElement;

    setValue(value.trim());
    autoHeight(target);

    setActive(false);
    update &&
      update({
        todoValue: value,
        isDone: done,
        create_at: todoValue === '' ? new Date() : create_at,
        modified_at: new Date(),
      });
  };

  const handleDone = () => {
    update &&
      update({
        todoValue: value,
        isDone: !done,
        create_at: todoValue === '' ? new Date() : create_at,
        modified_at: new Date(),
      });
  };

  const handleChange = (e: ChangeEvent): void => {
    if (!e.target) return;
    const target = e.target as HTMLTextAreaElement;
    autoHeight(target);

    const val = target.value || '';
    setValue(val);
  };

  return (
    <div className={`${styles['todo-input']} ${active ? styles.active : ''}`}>
      {/* <p>{value}</p> */}
      <div
        className={`${styles['done-btn']} ${done ? styles.done : ''}`}
        onClick={handleDone}
      >
        {done ? (
          <svg
            viewBox="0 0 14 14"
            className="check"
            style={{
              width: '12px',
              height: '12px',
              display: 'block',
              fill: 'white',
              flexShrink: 0,
              backfaceVisibility: 'hidden',
            }}
          >
            <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
          </svg>
        ) : (
          ''
        )}
      </div>
      <textarea
        rows={1}
        ref={ref}
        className={`${done ? styles.done : ''}`}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={active ? 'Type todo' : ''}
        onChange={handleChange}
      />
    </div>
  );
}
