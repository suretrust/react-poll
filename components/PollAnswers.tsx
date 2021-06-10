import React, { useState } from 'react';
import { Answer } from '../types';
import SinglePollAnswer from './SinglePollAnswer';

type Props = {
  answers: Answer[];
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
  votesCount: number;
};

const PollAnswers = ({ answers, setVotesCount, votesCount }: Props) => {
  const [showPollResult, setShowPollResult] = useState(false);

  return (
    <>
      {answers.map((answer) => (
        <SinglePollAnswer
          votesCount={votesCount}
          answer={answer}
          showPollResult={showPollResult}
          setShowPollResult={setShowPollResult}
          answers={answers}
          key={answer.text}
          setVotesCount={setVotesCount}
        />
      ))}
    </>
  );
};

export default PollAnswers;
