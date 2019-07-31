import React, { useState, useEffect } from 'react';
import { appContainer } from './app.css';
// import Splash from '../components/Splash/Splash.jsx';
import Game from '../components/Game/Game.jsx';

const App = () => {
  // testing some ideas of local persistance of user/deck_id to continue the game

  // const [hasUser, setHasUser] = useState(true);
  // const username = localStorage.getItem('username');
  // const deck_id = localStorage.getItem('deck_id');

  // useEffect(() => {
  //   setHasUser(!!username);
  // }, []);

  return (
    <div className={appContainer}>
      {/* 
      // testing persistance of user and deck ID
      <div>Welcome back {username}!</div>
      {!hasUser && <Splash setHasUser={setHasUser} />} */}
      <Game />
    </div>
  );
};

export default App;
