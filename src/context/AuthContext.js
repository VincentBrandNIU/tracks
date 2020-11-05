import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'signin':
			return { errorMessage: '', token: action.payload };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		case 'signout':
			return { token: null, errorMessage: '' };
		default:
			return state;
	}
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' });
};

const tryLocalSignin = (dispatch) => async () => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		dispatch({ type: 'signin', payload: token });
	} else {
		navigate('loginFlow');
	}
};

const signup = (dispatch) => async ({ email, password }) => {
	//Make APi Request to sign up with that email and password
	try {
		const response = await trackerApi.post('/signup', { email, password });
		//Store token in local storage
		await AsyncStorage.setItem('token', response.data.token);
		//update state from reducer
		dispatch({ type: 'signin', payload: response.data.token });
		//navigate to main flow
		navigate('TrackList');
	} catch (err) {
		console.log(err);
		dispatch({ type: 'add_error', payload: 'Something went wrong during sign up' });
	}
};

const signin = (dispatch) => async ({ email, password }) => {
	try {
		const response = await trackerApi.post('/signin', { email, password });
		await AsyncStorage.setItem('token', response.data.token);
		dispatch({ type: 'signin', payload: response.data.token });
		navigate('TrackList');
	} catch (err) {
		console.log(err);
		dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
	}
};

const signout = (dispatch) => async () => {
	await AsyncStorage.removeItem('token', (err) => console.log('token', err));
	dispatch({ type: 'signout' });
	navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin },
	{ token: null, errorMessage: '' }
);
