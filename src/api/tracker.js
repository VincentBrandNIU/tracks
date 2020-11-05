import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
	baseURL: 'http://10183c9e3941.ngrok.io',
});

instance.interceptors.request.use(
	//Called automatically when we make a request
	async (config) => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	//Called automatilcaly when an error happens
	(err) => {
		return Promise.reject(err);
	}
);

export default instance;
