import React, { useState, useEffect } from 'react';
import styles from './app.css';
import Splash from '../components/Splash/Splash.jsx';
import Game from '../components/Game/Game.jsx';

const App = () => {
  const [hasUser, setHasUser] = useState(true);
  const username = localStorage.getItem('username');
  // const deck_id = localStorage.getItem('deck_id');

  useEffect(() => {
    setHasUser(!!username);
  }, []);

  return (
    <div className={styles.appContainer}>
      <div>Welcome back {username}!</div>
      <Game />
      {!hasUser && <Splash setHasUser={setHasUser} />}
    </div>
  );
};

export default App;
