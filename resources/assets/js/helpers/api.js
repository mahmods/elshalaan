import axios from 'axios'
import { api_token } from '../store/Auth'
import router from '../router/index'


export default function (Vue) {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + api_token
	axios.interceptors.response.use(function (response) {
		if(response.data.authenticated == false) {
			router.push('/dashboard/login')
			localStorage.clear()
		}
		return response;
	}, function (error) {
		return Promise.reject(error);
	});

	Vue.api = {
		get: (url) => {
			return axios({
				method: 'GET',
				url: '/api/' + url,
			})
		},
		
		post: (url, data) => {
			return axios({
				method: 'POST',
				url: '/api/' + url,
				data: data,
			})
		},
		del: (url) => {
			return axios({
				method: 'DELETE',
				url: '/api/' + url,
			})
		}
	}

	Object.defineProperty(Vue.prototype,'$api', {
		get: function get () { return Vue.api }
	})
}