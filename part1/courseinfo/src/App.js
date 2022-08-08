// Header component
const Header = (props) => {
  return <h1>{props.headerText}</h1>;
};

// Content component
const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} numberOfExercises={props.exercises1} />
      <Part name={props.part2} numberOfExercises={props.exercises2} />
      <Part name={props.part3} numberOfExercises={props.exercises3} />
    </div>
  );
};

// Part component
const Part = (props) => {
  return (
    <p>
      {props.name} {props.numberOfExercises}
    </p>
  );
};

// Total component: takes array
const Total = (props) => {
  return <p>Number of exercises {props.numArray.reduce((a, b) => a + b, 0)}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header headerText={course} />
      <Content
        part1={part1.name}
        part2={part2.name}
        part3={part3.name}
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
      <Total numArray={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  );
};

export default App;
