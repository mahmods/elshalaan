<template>
	<div v-if="!loading">
        <form @submit.prevent="save">
            <h1>Roles</h1>
            <div v-for="role in data.roles" :key="role[0]" class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" :value="role[0]" v-model="selected">
                {{role[1]}}
            </label>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: [],
            loading: true,
            selected: []
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
			this.$api.get('users/' + this.$route.params.id + '/roles')
			.then(response => {
                this.data = response.data
                this.data.roles.forEach(role => {
                    if(role[2]) {
                        this.selected.push(role[0])
                    }
                })
				this.loading = false;
			})
        },
        save() {
			this.$api.post('users/' + this.$route.params.id + '/roles', this.selected)
			.then(response => {
			})
        }
    }
}
</script>

<style>
	button {
		cursor: pointer;
	}
</style>