import axios from 'axios'
import { api_token } from '../store/Auth'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + api_token

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    if(response.data.authenticated == false) {
			localStorage.clear()
	}
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export function get(url) {
	return axios({
		method: 'GET',
		url: '/api/' + url,
	})
}

export function post(url, data) {
	return axios({
		method: 'POST',
		url: '/api/' + url,
		data: data,
	})
}

export function del(url) {
	return axios({
		method: 'DELETE',
		url: '/api/' + url,
	})
}