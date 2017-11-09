<template>
	<div v-if="!loading">
		<div id="search-wrapper"><input type="text" id="search" v-model="search"></div>
        <table class="table">
            <thead>
                <tr>
					<th>#</th>
					<th>Title</th>
					<th>Description</th>
					<th>Category</th>
					<th>Date</th>
					<th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredData" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.category.name}}</td>
                    <td>{{item.created_at}}</td>
					<td>
						<router-link class="btn btn-primary" :to="'/dashboard/posts/' +item.id+'/update'"><icon name="pencil"></icon></router-link>
						<button class="btn btn-danger" v-on:click="remove(item.id)"><icon name="trash"></icon></button>
					</td>
                </tr>
            </tbody>
        </table>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			data: [],
			loading: true,
			search: ''
		}
	},
	computed: {
		filteredData: function () {
			const exp = new RegExp(this.search, 'i')
			return this.data.items.filter(item => {
				return ( exp.test(item.id) || exp.test(item.title) || exp.test(item.category.name) || exp.test(item.category.description))
			})
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			this.loading = true;
			axios({
				method: 'GET',
				url: '/api/posts',
				headers: {
					'Authorization': 'Bearer ' + this.$auth.getToken()
				}
			})
			.then(response => {
				this.data = response.data
				this.loading = false;
			})
		},
		remove(id) {
			axios({
				method: 'DELETE',
				url: '/api/posts/' + id,
				headers: {
					'Authorization': 'Bearer ' + this.$auth.getToken()
				}
			})
			.then(response => {
				if(response.data.success) {
					this.getData();
				}
			})
		}
    },
}
</script>

<style>
	button {
		cursor: pointer;
	}

	input:focus,
	select:focus,
	textarea:focus,
	button:focus {
		outline: none;
	}

	#search-wrapper {
		display: flex;
	}

	#search {
		margin: 20px auto;
		align-self: center;
		background: url('/images/search-dark.png') no-repeat 10px 15px #fcfcfc;
		color: #6a6f75;
		width: 400px;
		-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
		border: 0 none;
		font: bold 12px Arial,Helvetica,Sans-serif;
		padding: 15px 15px 15px 35px;
		-webkit-border-radius: 20px;
		-moz-border-radius: 20px;
		border-radius: 20px;
		-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;
		-webkit-transition: all 0.7s ease 0s;
		-moz-transition: all 0.7s ease 0s;
		-o-transition: all 0.7s ease 0s;
		transition: all 0.7s ease 0s;
		}

	#search:focus {
		color: #6a6f75;
		width: 500px;
		-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
		}
</style>