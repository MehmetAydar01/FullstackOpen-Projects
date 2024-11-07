const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0)
  return <p>Number of exercises {sum}</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);

const App = () => {
   const course = {
     name: 'Half Stack application development',
     parts: [
       {
         name: 'Fundamentals of React',
         exercises: 10,
       },
       {
         name: 'Using props to pass data',
         exercises: 7,
       },
       {
         name: 'State of a component',
         exercises: 14,
       },
     ],
   };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
