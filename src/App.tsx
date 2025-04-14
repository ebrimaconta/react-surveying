import React, { useState, useCallback } from 'react';
import { ReactSurvey } from './components/ReactSurvey';

interface Answer {
  option: string;
  votes: number;
}

interface PollState {
  pollAnswers: Answer[];
}

const INITIAL_POLL_STATE: PollState = {
  pollAnswers: [
    { option: 'Red', votes: 19 },
    { option: 'Blue', votes: 0 },
  ],
};

export const App: React.FC = () => {
  const [vote, setVote] = useState<boolean>(false);
  const [poll, setPoll] = useState<PollState>(INITIAL_POLL_STATE);

  const handleVote = useCallback((voteAnswer: Answer) => {
    setPoll((prevPoll) => ({
      pollAnswers: prevPoll.pollAnswers.map((answer) =>
        answer.option === voteAnswer.option ? { ...answer, votes: answer.votes + 1 } : answer
      ),
    }));
    setVote(true);
  }, []);

  return (
    <ReactSurvey vote={vote} question='What is your favorite color?' answers={poll.pollAnswers} onVote={handleVote} />
  );
};

export default App;
