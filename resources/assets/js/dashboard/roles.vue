<template>
	<div v-if="!loading">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="col in this.data.columns" :key="col[0]">{{col[1]}}</th>
					<th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in this.data.items" :key="item.id">
                    <td v-for="k in item" :key="k">{{k}}</td>
					<td>
						<router-link class="btn btn-success" :to="'/dashboard/roles/' +item.id+'/permissions'">Permissions</router-link>
						<router-link class="btn btn-primary" :to="'/dashboard/roles/' +item.id+'/update'">Edit</router-link>
						<button class="btn btn-danger" v-on:click="remove(item.id)">Delete</button>
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
		this.getData()
	},
	watch: {
		'$route.params.p'() {
			this.getData()
		}
	},
	methods: {
		getData() {
			this.loading = true;
			this.$api.get('roles')
			.then(response => {
				this.data = response.data
				this.loading = false;
			})
		},
		remove(id) {
			this.$api.del(`roles/${id}`)
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