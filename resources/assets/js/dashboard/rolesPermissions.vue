<template>
	<div v-if="!loading">
        <form @submit.prevent="save">
            <h1>Permissions</h1>
            <div v-for="permission in data.permissions" :key="permission[0]" class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" :value="permission[0]" v-model="selected">
                {{permission[1]}}
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
			this.$api.get(`roles/${this.$route.params.id}/permissions`)
			.then(response => {
                this.data = response.data
                this.data.permissions.forEach(permission => {
                    if(permission[2]) {
                        this.selected.push(permission[0])
                    }
                })
				this.loading = false;
			})
        },
        save() {
			this.$api.post(`roles/${this.$route.params.id}/permissions`, this.data)
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