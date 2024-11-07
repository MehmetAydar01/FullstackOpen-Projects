import { useState } from 'react';

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ text, voteValue }) => {
  return (
    <div>
      <p>{text}</p>
      <p>
        has {voteValue} {voteValue > 1 ? 'votes' : 'vote'}
      </p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(anecdotes.map(_ => 0));

  const nextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  // console.log('points : ', points);
  // console.log('selected: ', selected);

  const maxPoint = Math.max(...points);
  const getIndexOfMaxPoint = points.indexOf(maxPoint);

  // console.log('maxPoint : ', maxPoint);
  // console.log('getIndexOfMaxPoint : ', getIndexOfMaxPoint);

  return (
    <div>
      <Title text='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]} voteValue={points[selected]} />
      <Button text='vote' onClick={handleVote} />
      <Button text='next anecdote' onClick={nextAnecdote} />
      <Title text='Anecdote with most votes' />
      <Anecdote text={anecdotes[getIndexOfMaxPoint]} voteValue={maxPoint} />
    </div>
  );
};

export default App;
