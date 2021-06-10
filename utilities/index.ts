import { QandA, QandAsDocument, Answer } from '../types';

export const getRandomQuestionAndAnswer = (
  questionsAndAnswers: QandAsDocument
) => {
  const { questions } = questionsAndAnswers;
  const randomNumber = Math.random();
  const lengthOfQuestions = questions.length;
  const randomIndex = Math.floor(randomNumber * lengthOfQuestions);

  return questions[randomIndex];
};

export const getVotesCount = (randomQueAndAns: QandA) => {
  const { answers } = randomQueAndAns;
  const votes = answers.map((answer: Answer) => answer.votes);

  return votes.reduce((acc, curr) => acc + curr);
};

export const getPollPercentage = (votes: number, totalVotes: number) => {
  return ((votes / totalVotes) * 100).toFixed().toString();
};

export const getMaxPollAnswer = (answers: Answer[], currPoll: Answer) => {
    const answersAfterVote = [...answers];
    const indexOfMax = answers.indexOf(currPoll);
    if (indexOfMax <= -1) return;

    answersAfterVote[indexOfMax] = {
      ...currPoll,
      votes: currPoll.votes + 1,
    };

    return answersAfterVote.reduce(function (prev, current) {
      return prev.votes > current.votes ? prev : current;
    });
}