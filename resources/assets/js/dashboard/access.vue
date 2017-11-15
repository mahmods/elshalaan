<template>
<spinner v-if="loading" size="big"></spinner>
	<div v-else>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="col in this.data.columns" :key="col[0]">{{col[1]}}</th>
					<th v-if="hasAccess">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in this.data.items" :key="item.id">
                    <td v-for="k in item" :key="k">{{k}}</td>
					<td v-if="hasAccess">
						<router-link class="btn btn-primary" :to="'/dashboard/'+ $route.params.model + '/' +item.id+'/update'"><icon name="pencil"></icon></router-link>
						<button class="btn btn-danger" v-on:click="remove(item.id)"><icon name="trash"></icon></button>
					</td>
                </tr>
            </tbody>
        </table>
	</div>
</template>

<script>
import axios from 'axios'
import Permissions from '../store/Permissions'
export default {
	data() {
		return {
			data: [],
			permissions: null,
			loading: true
		}
	},
	created() {
		Permissions.init().then(r => this.permissions = r.data.permissions)
		this.getData()
	},
	watch: {
		'$route.params.model'() {
			this.loading = true
			this.getData()
		}
	},
	methods: {
		getData() {
			axios({
				method: 'GET',
				url: '/api/' + this.$route.params.model,
				headers: {
					'Authorization': 'Bearer ' + this.$auth.getToken()
				}
			})
			.then(response => {
				this.data = response.data
				this.loading = false
			})
		},
		remove(id) {
			axios({
				method: 'DELETE',
				url: '/api/' + this.$route.params.model + '/' + id,
				headers: {
					'Authorization': 'Bearer ' + this.$auth.getToken()
				}
			})
			.then(response => {
				if(response.data.success) {
					this.$toasted.show(this.$route.params.model + ' deleted successfully!', {type: 'success'})
					this.getData();
				}
			})
		}
	},
	computed: {
		hasAccess() {
			if(!this.permissions) { return false }
			return this.permissions.filter(i => {
				return (i.perm === `${this.$route.params.model}.manage`)
			}).length > 0
		}
	}
}
</script>