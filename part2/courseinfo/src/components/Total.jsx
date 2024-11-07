const Total = ({ parts }) => {
  const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

export default Total;
