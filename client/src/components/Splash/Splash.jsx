import React, { useState, useEffect } from 'react';
import styles from './splash.css';

const Splash = ({ setHasUser }) => {
  const [username, setUsername] = useState('');

  const saveUsername = e => {
    e.preventDefault();
    localStorage.setItem('username', username);
    setHasUser(true);
  };

  return (
    <div className={styles.splashContainer}>
      <form className={styles.usernameForm} onSubmit={saveUsername}>
        <label htmlFor="username">Input a username!</label>
        <input
          type="text"
          name="username"
          id="usernameInput"
          onChange={() => setUsername(document.getElementById('usernameInput').value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Splash;
