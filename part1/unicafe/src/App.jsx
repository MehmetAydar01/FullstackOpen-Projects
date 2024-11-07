import { useState } from 'react';

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};


const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>no feedback given</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine label='good' value={good} />
          <StatisticLine label='neutral' value={neutral} />
          <StatisticLine label='bad' value={bad} />
          <StatisticLine label='all' value={total} />
          <StatisticLine label='average' value={(good - bad) / total} />
          <StatisticLine label='positive' value={(100 * good) / total + ' %'} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
