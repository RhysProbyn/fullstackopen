// Header component
const Header = ({ headerText }) => {
  return <h1>{headerText}</h1>;
};

// Content component: takes array of part objects
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          numberOfExercises={part.exercises}
        />
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
  const sum = parts.reduce((total, part) => part.exercises + total, 0);
  return <h4>Total of {sum} exercises</h4>;
};

// Course component
const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header headerText={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};

export default Course;
