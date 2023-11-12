import React, { useState } from 'react';
import { ReactSurvey } from './components/ReactSurvey';

interface Answer {
  option: string;
  votes: number;
}

export const App = () => {
  const question = 'What is your favorite color?';

  const [vote, setVote] = useState(false);
  const [poll, setPoll] = useState({
    pollAnswers: [
      { option: 'Red', votes: 19 },
      { option: 'Blue', votes: 0 },
    ],
  });
  const handleVote = (voteAnswer: Answer) => {
    const { pollAnswers } = poll;
    const newPollAnswers = pollAnswers.map((answer) => {
      if (answer.option === voteAnswer.option) answer.votes++;
      return answer;
    });

    setVote(true);
    setPoll({
      pollAnswers: newPollAnswers,
    });
  };

  return <ReactSurvey vote={vote} question={question} answers={poll.pollAnswers} onVote={handleVote} />;
};

export default App;
