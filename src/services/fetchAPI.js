const triviaTokenURL = 'https://opentdb.com/api_token.php?command=request';
const triviaQuestionsURL = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchToken = async () => {
  const response = await fetch(triviaTokenURL);
  const token = await response.json();

  return token;
};

export const fetchQuestions = async (token) => {
  const response = await fetch(triviaQuestionsURL + token);
  const questions = await response.json();

  return questions;
};