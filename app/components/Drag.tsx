import React, { ReactNode, MouseEvent, useState } from 'react';
import { remote, ipcRenderer } from 'electron';
import styles from './drag.css';

type Props = {
  children: ReactNode;
};

export default function Drag(props: Props) {
  const { children } = props;

  const [isDrag, setIsDrag] = useState(false);
  const [biasX, setBiasX] = useState(0);
  const [biasY, setBiasY] = useState(0);

  const win = remote.getCurrentWindow();

  const handlerMouseDown = (e: MouseEvent): void => {
    const { nativeEvent } = e;
    if (nativeEvent.button === 0) {
      setBiasX(nativeEvent.x);
      setBiasY(nativeEvent.y);
      setIsDrag(true);
    }
  };

  const handlerMouseMove = (e: MouseEvent): void => {
    const { nativeEvent } = e;
    isDrag &&
      win.setPosition(nativeEvent.screenX - biasX, nativeEvent.screenY - biasY);
  };

  const handlerMouseUp = (): void => {
    setBiasX(0);
    setBiasY(0);
    setIsDrag(false);
  };

  return (
    <>
      <div
        className={styles.drag}
        onMouseDown={handlerMouseDown}
        onMouseMove={handlerMouseMove}
        onMouseUp={handlerMouseUp}
      >
        {children}
      </div>
    </>
  );
}
