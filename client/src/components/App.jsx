import React, { useState, useEffect } from 'react';
import styles from './app.css';
import Splash from '../components/Splash/Splash.jsx';

const App = () => {
  const [hasUser, setHasUser] = useState(true);
  const username = localStorage.getItem('username');

  useEffect(() => {
    setHasUser(!!username);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>Welcome back {username}!</div>
      {!hasUser && <Splash setHasUser={setHasUser} />}
    </div>
  );
};

export default App;
