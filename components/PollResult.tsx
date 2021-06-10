import React from 'react';
import styled from 'styled-components';
import { SingleAnswerProps } from '../types';

type Props = {
  percentage: string;
  hasMaximumVotes: boolean;
};

const PollResultView = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${(props: SingleAnswerProps) =>
    props.hasMaximumVotes ? 'cyan' : '#f0f0f0'};
  width: ${(props: SingleAnswerProps) => `${props.percentage}%`};
  height: 100%;
  z-index: -1;
`;

const PollResult = ({ percentage, hasMaximumVotes }: Props) => {
  return (
    <PollResultView percentage={percentage} hasMaximumVotes={hasMaximumVotes} />
  );
};

export default PollResult;
