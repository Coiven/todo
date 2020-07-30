import React from 'react';
import Header from './Header';
import styles from './Home.css';
import Content from './Content';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <Header />
      <Content />
    </div>
  );
}
