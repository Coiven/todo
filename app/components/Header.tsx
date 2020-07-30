import React from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router';
import styles from './Header.css';
import routes from '../constants/routes';

export default function Header(): JSX.Element {
  const history = useHistory();

  const handleHeaderClick = () => {
    ipcRenderer.send('suspension-show');
    history.push(routes.SUSPENSION);
  };

  return (
    <div
      className={styles.container}
      id="header"
      data-tid="container"
      onDoubleClick={handleHeaderClick}
    >
      <div
        className={styles.close}
        onClick={() => ipcRenderer.send('window-close')}
      >
        x
      </div>
      <div className={styles.toSuspension} onClick={handleHeaderClick}>
        o
      </div>
    </div>
  );
}
