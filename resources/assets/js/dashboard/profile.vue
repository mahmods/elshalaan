<template>
	<div v-if="!loading">
        <form @submit.prevent="save">
            <div class="form-group">
		    <label>Nickname</label>
		    <input v-model="profile.nickname" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>First Name</label>
		    <input v-model="profile.first_name" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Last Name</label>
		    <input v-model="profile.last_name" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Description</label>
		    <textarea v-model="profile.description" type="text" class="form-control" ></textarea>
		  </div>
		  <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			profile: {
				nickname: '',
				first_name: '',
				last_name: '',
				description: ''
			},
			loading: true
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			this.loading = true;
			this.$api.get('profile')
			.then(response => {
				console.log(response.data)
				this.profile = response.data.profile
				this.loading = false;
			})
		},
		save() {
			this.$api.post('profile', this.profile)
			.then(response => {
				if(response.data.success) {
					this.$toasted.show('Changes saved successfully!', {type: 'success'})
				}
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