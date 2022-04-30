import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';
import token from './token';

export default combineReducers({ player, questions, token });