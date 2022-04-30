import { ADD_TOKEN, ERROR_API, RECOVERY_TOKEN } from '../actions/actionTypes.action';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ADD_TOKEN:
		return action.payload.token;
	case ERROR_API:
		return { ...state, error: action.payload };
	case RECOVERY_TOKEN:
		return action.payload;
	default:
		return state;
	}
};

export default token;