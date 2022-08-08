// Header component
const Header = (props) => {
  return <h1>{props.headerText}</h1>;
};

// Content component: takes array of part objects
const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part name={part.name} numberOfExercises={part.exercises} />
      ))}
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

// Total component: takes array of part objects
const Total = (props) => {
  let sum = 0;
  props.parts.forEach((part) => {
    sum += part.exercises;
  });
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header headerText={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
