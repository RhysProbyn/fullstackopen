import { useState } from "react";
import "./App.css";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const History = ({ allClicks }) => {
    if (allClicks.length === 0) {
      return <div>the app is used by pressing the buttons</div>;
    }
    return <div>button press history: {allClicks.join(" ")}</div>;
  };
  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };
  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
