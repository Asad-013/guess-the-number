import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [target, setTarget] = useState(0);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState('easy');
  const [maxAttempts, setMaxAttempts] = useState(10);
  const [score, setScore] = useState(0);

  const levels = {
    easy: { max: 100, attempts: 10 },
    medium: { max: 500, attempts: 8 },
    hard: { max: 1000, attempts: 6 },
  };

  useEffect(() => {
    startNewGame();
  }, [level]);

  const startNewGame = () => {
    const { max, attempts } = levels[level];
    setTarget(Math.floor(Math.random() * max) + 1);
    setAttempts(0);
    setMaxAttempts(attempts);
    setMessage('');
    setGameOver(false);
    setGuess('');
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userGuess === target) {
      const newScore = score + calculateScore(newAttempts);
      setScore(newScore);
      setMessage(`Congratulations! You guessed it in ${newAttempts} attempts.`);
      setGameOver(true);
    } else if (newAttempts >= maxAttempts) {
      setMessage(`Game over! The number was ${target}.`);
      setGameOver(true);
    } else if (userGuess < target) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
    setGuess('');
  };

  const calculateScore = (attempts) => {
    const baseScore = levels[level].max;
    return Math.max(baseScore - (attempts - 1) * 10, 10);
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  return (
    <div className="App">
      <h1>Guess the Number</h1>
      <div className="level-selector">
        {Object.keys(levels).map((l) => (
          <button
            key={l}
            onClick={() => handleLevelChange(l)}
            className={level === l ? 'active' : ''}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>
      <p>I'm thinking of a number between 1 and {levels[level].max}.</p>
      <p>Attempts left: {maxAttempts - attempts}</p>
      <p>Score: {score}</p>
      <form onSubmit={handleGuess}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          min="1"
          max={levels[level].max}
          required
          disabled={gameOver}
        />
        <button type="submit" disabled={gameOver}>Guess</button>
      </form>
      <p className={gameOver ? 'game-over' : ''}>{message}</p>
      {gameOver && <button onClick={startNewGame}>New Game</button>}
    </div>
  );
}

export default App;