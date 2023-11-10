import React, { useState } from 'react';
import { ReactSurvey } from './components/ReactSurvey';

export const App = () => {
  const question = 'What is your favorite color?';

  const [poll, setPoll] = useState({
    pollAnswers: [
      { option: 'Red', votes: 19 },
      { option: 'Blue', votes: 0 },
    ],
  });
  const handleVote = (voteAnswer) => {
    const { pollAnswers } = poll;
    const newPollAnswers = pollAnswers.map((answer) => {
      if (answer.option === voteAnswer) answer.votes++;
      return answer;
    });
    setPoll({
      pollAnswers: newPollAnswers,
    });
  };
  console.log('poll handleVote', poll);

  return <ReactSurvey question={question} answers={poll.pollAnswers} onVote={handleVote} />;
};
