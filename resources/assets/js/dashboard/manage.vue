<template>
	<div v-if="!loading">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="col in this.data.columns" :key="col">{{col[1]}}</th>
					<th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in this.data.items" :key="item.id">
                    <td v-for="k in item" :key="k">{{k}}</td>
					<td>
						<router-link class="btn btn-primary" :to="'/dashboard/'+ $route.params.model + '/' +item.id+'/update'"><icon name="pencil"></icon></router-link>
						<button class="btn btn-danger" v-on:click="remove(item.id)"><icon name="trash"></icon></button>
					</td>
                </tr>
            </tbody>
        </table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: [],
			loading: true
		}
	},
	mounted() {
		Permissions.init()
		this.getData()
	},
	watch: {
		'$route.params.model'() {
			this.getData()
		}
	},
	methods: {
		getData() {
			this.loading = true;
			this.$api.get(this.$route.params.model)
			.then(response => {
				this.data = response.data
				this.loading = false;
			})
		},
		remove(id) {
			this.$api.del(this.$route.params.model + '/' + id)
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
	
</style>