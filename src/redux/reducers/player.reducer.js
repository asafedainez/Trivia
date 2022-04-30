import {
  ADD_ASSERTION,
  ADD_SCORE,
  ADD_PLAYER } from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_ASSERTION:
    return { ...state, assertions: state.assertions + 1 };
  case ADD_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case ADD_SCORE:
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
};

export default player;