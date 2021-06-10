import * as React from 'react';
import styled from 'styled-components';
import { QandAsDocument } from '../types';
import { getRandomQuestionAndAnswer, getVotesCount } from '../utilities';
import PollAnswers from './PollAnswers';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  margin: 80px auto;
  max-width: 400px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.1);
`;

const PollQuestion = styled.div`
  font-size: 22px;
  line-height: 25px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const VotesWrapper = styled.div`
  color: #9c9b9b;
  margin-top: 20px;
  font-size: 13px;
`;

export default function Poll({ qandas }: Props) {
  const [randomQandA] = React.useState(getRandomQuestionAndAnswer(qandas));
  const [votesCount, setVotesCount] = React.useState<number>(
    getVotesCount(randomQandA)
  );

  const {
    question: { text },
    answers,
  } = randomQandA;

  return (
    <PollWrapper>
      <PollQuestion>{text}</PollQuestion>
      <PollAnswers
        answers={answers}
        setVotesCount={setVotesCount}
        votesCount={votesCount}
      />
      <VotesWrapper>{votesCount} votes</VotesWrapper>
    </PollWrapper>
  );
}
