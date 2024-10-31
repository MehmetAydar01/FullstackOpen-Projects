import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, setFunction, value }) => {
  return <button onClick={() => setFunction(value + 1)}>{text}</button>;
};

const Buttons = ({ statistics, setFunctions }) => {
  return (
    <div>
      <Button
        text='good'
        setFunction={setFunctions[0]}
        value={statistics.good}
      />
      <Button
        text='neutral'
        setFunction={setFunctions[1]}
        value={statistics.neutral}
      />
      <Button text='bad' setFunction={setFunctions[2]} value={statistics.bad} />
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === 'positive' && '%'}
      </td>
    </tr>
  );
};

const Statistics = ({ statistics }) => {
  const { good, neutral, bad, total, avg, positiveFeedbackPercentage } =
    statistics;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={positiveFeedbackPercentage} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const avg = (good * 1 + neutral * 0 + bad * -1) / total;
  const positiveFeedbackPercentage = (good / total) * 100 || 0;

  const statistics = {
    good,
    neutral,
    bad,
    total,
    avg,
    positiveFeedbackPercentage,
  };
  const setFunctions = [setGood, setNeutral, setBad];

  return (
    <div>
      <Header text='give feedback' />
      <Buttons statistics={statistics} setFunctions={setFunctions} />
      <h2>statistics</h2>
      <Statistics statistics={statistics} setFunctions={setFunctions} />
    </div>
  );
};

export default App;
