<template>
<spinner v-if="loading" size="big"></spinner>
	<div v-else>
        <table class="table">
            <thead>
                <tr>
					<th>#</th>
					<th>Slug</th>
					<th>View</th>
					<th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.slug}}</td>
                    <td>{{item.view}}</td>
					<td>
						<router-link class="btn btn-primary" :to="'/dashboard/pages/' +item.id+'/update'"><icon name="pencil"></icon></router-link>
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
				url: '/api/pages',
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
				url: '/api/pages/' + id,
				headers: {
					'Authorization': 'Bearer ' + this.$auth.getToken()
				}
			})
			.then(response => {
				if(response.data.success) {
					this.getData();
				}
			})
			.catch(err => {
				this.$toasted.show(err.response.data.error, {type: 'error'})
			})
		}
    },
}
</script>

<style>

</style>