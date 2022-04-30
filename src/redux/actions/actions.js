import {
	ADD_ASSERTION, ADD_SCORE,
	ADD_QUESTIONS, ADD_TOKEN, ADD_PLAYER,
	ERROR_API, RECOVERY_TOKEN,
} from './actionTypes.action';

import { fetchQuestions, fetchToken } from '../../services/fetchAPI';

export const addAssertion = () => ({
	type: ADD_ASSERTION,
});

export const addScore = (score) => ({
	type: ADD_SCORE,
	payload: score,
});

const addQuestions = (questions) => ({
	type: ADD_QUESTIONS,
	payload: questions,
});

const addToken = (token) => ({
	type: ADD_TOKEN,
	payload: token,
});

export const recoveryToken = (token) => ({
	type: RECOVERY_TOKEN,
	payload: token,
});

export const addPlayer = (user) => ({
	type: ADD_PLAYER,
	payload: user,
});

const failedAPI = (error) => ({
	type: ERROR_API,
	payload: error,
});

export const dispatchQuestions = (token) => async (dispatch) => {
	try {
		const requestResponse = await fetchQuestions(token);
		dispatch(addQuestions(requestResponse));
	} catch (error) {
		dispatch(failedAPI(error.message));
	}
};

export const dispatchToken = () => async (dispatch) => {
	try {
		const requestResponse = await fetchToken();
		dispatch(addToken(requestResponse));
	} catch (error) {
		dispatch(failedAPI(error.message));
	}
};