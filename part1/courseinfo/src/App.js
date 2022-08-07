// Header component
const Header = (props) => {
  return (
    <p>
      <h1>{props.headerText}</h1>
    </p>
  );
};

// Content component
const Content = (props) => {
  return (
    <p>
      {props.part} {props.numberOfExercises}
    </p>
  );
};

// Total component: takes array
const Total = (props) => {
  return <p>Number of exercises {props.numArray.reduce((a, b) => a + b, 0)}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header headerText={course} />
      <Content part={part1} numberOfExercises={exercises1} />
      <Content part={part2} numberOfExercises={exercises2} />
      <Content part={part3} numberOfExercises={exercises3} />
      <Total numArray={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
