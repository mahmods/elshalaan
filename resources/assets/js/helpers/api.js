import axios from 'axios'
import { api_token } from '../store/Auth'

export function get(url) {
	return axios({
		method: 'GET',
		url: '/api/' + url,
		headers: {
			'Authorization': 'Bearer ' + api_token
		}
	})
}

export function post(url, data) {
	return axios({
		method: 'POST',
		url: '/api/' + url,
		data: data,
		headers: {
			'Authorization': 'Bearer ' + api_token
		}
	})
}

export function del(url) {
	return axios({
		method: 'DELETE',
		url: '/api/' + url,
		headers: {
			'Authorization': 'Bearer ' + api_token
		}
	})
}