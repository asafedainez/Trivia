import { combineReducers } from 'redux';
import player from './player.reducer';
import questions from './questions.reducer';
import token from './token.reducer';

export default combineReducers({ player, questions, token }); 