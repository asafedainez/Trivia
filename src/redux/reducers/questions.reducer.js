import { ADD_QUESTIONS, ERROR_API } from '../actions/actionsType';

const INITIAL_STATE = {};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return action.payload;
  case ERROR_API:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default questions;