// Header component
const Header = ({ headerText }) => {
  return <h1>{headerText}</h1>;
};

// Content component: takes array of part objects
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} numberOfExercises={part.exercises} />
      ))}
    </div>
  );
};

// Part component
const Part = ({ name, numberOfExercises }) => {
  return (
    <p>
      {name} {numberOfExercises}
    </p>
  );
};

// Total component: takes array of part objects
const Total = ({ parts }) => {
  let sum = 0;
  parts.forEach((part) => {
    sum += part.exercises;
  });
  return <p>Number of exercises {sum}</p>;
};

// Course component: takes
const Course = ({ course }) => {
  return (
    <div>
      <Header headerText={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
