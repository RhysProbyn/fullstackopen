import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  return (
    <div>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {good + bad + neutral}</p>
      <p>average: {(good - bad) / (good + bad + neutral)}</p>
      <p>positive: {(good / (good + bad + neutral)) * 100} %</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
