import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Answer } from '../types';
import { getMaxPollAnswer, getPollPercentage } from '../utilities';
import PollResult from './PollResult';
import { SinglePollAnswerProps } from '../types';

type Props = {
  answer: Answer;
  answers: Answer[];
  showPollResult: boolean;
  setShowPollResult: React.Dispatch<React.SetStateAction<boolean>>;
  setVotesCount: React.Dispatch<React.SetStateAction<number>>;
  votesCount: number;
};

const SingleAnswerWrapper = styled.div`
  border: 1px solid #d6d6d6;
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  background: transparent;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  pointer-events: ${(props: SinglePollAnswerProps) =>
    props.showPollResult ? 'none' : 'auto'};
`;

const AnswerTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnswerDetails = styled.div`
  display: flex;
  align-items: center;
`;

const CheckMark = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

const SinglePollAnswer = ({
  answer,
  showPollResult,
  setShowPollResult,
  votesCount,
  answers,
  setVotesCount,
}: Props) => {
  const [isChosenPoll, setIsChosenPoll] = useState(false);
  const [hasMaximumVotes, setHasMaximumVotes] = useState(false);
  const { votes, text } = answer;
  const currVote = isChosenPoll ? votes + 1 : votes;
  const percentage = showPollResult
    ? getPollPercentage(currVote, votesCount)
    : '';

  const handlePolling = () => {
    setIsChosenPoll(true);
    setShowPollResult(true);
    setVotesCount((votesCount) => votesCount + 1);
  };

  useEffect(() => {
    const currPoll = answers.find((ans) => ans.text === text);
    if (!currPoll) return;

    const maxPollAnswer = getMaxPollAnswer(answers, currPoll);
    if (!maxPollAnswer) return;

    if (text === maxPollAnswer.text) setHasMaximumVotes(true);
  }, [isChosenPoll]);

  return (
    <>
      <SingleAnswerWrapper
        showPollResult={showPollResult}
        onClick={handlePolling}
      >
        <AnswerTextContainer>
          <AnswerDetails>
            {text}
            {isChosenPoll && (
              <CheckMark src={require('../static/check-circle.svg')} />
            )}
          </AnswerDetails>
          {showPollResult && <div>{percentage}%</div>}
        </AnswerTextContainer>
        <PollResult percentage={percentage} hasMaximumVotes={hasMaximumVotes} />
      </SingleAnswerWrapper>
    </>
  );
};

export default SinglePollAnswer;
