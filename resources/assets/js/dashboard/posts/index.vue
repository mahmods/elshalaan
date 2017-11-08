<template>
	<div v-if="!loading">
		<input type="text" name="" id="" v-model="search">
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
</style>