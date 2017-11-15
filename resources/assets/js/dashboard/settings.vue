<template>
<spinner v-if="loading" size="big"></spinner>
	<div v-else>
        <form @submit.prevent="save">
            <div class="form-group">
		    <label>Application Name</label>
		    <input v-model="setting('appname').setting_value" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Email Address 1</label>
		    <input v-model="setting('email1').setting_value" type="text" class="form-control" >
		  </div>
			<div class="form-group">
		    <label>Email Address 2</label>
		    <input v-model="setting('email2').setting_value" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Phone Number 1</label>
		    <input v-model="setting('phone1').setting_value" type="text" class="form-control" >
		  </div>
			<div class="form-group">
		    <label>Phone Number 2</label>
		    <input v-model="setting('phone2').setting_value" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Working days</label>
		    <input v-model="setting('work_days').setting_value" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Working hours</label>
		    <input v-model="setting('work_hours').setting_value" type="text" class="form-control" >
		  </div>
			<div class="form-group">
		    <label>Main Address</label>
		    <input v-model="setting('address').setting_value" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Address 1</label>
		    <input v-model="setting('address1').setting_value" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Address 2</label>
		    <input v-model="setting('address2').setting_value" type="text" class="form-control" >
		  </div>
		  <div class="form-group">
		    <label>Address 3</label>
		    <input v-model="setting('address3').setting_value" type="text" class="form-control" >
		  </div>
		  <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			settings: [],
			loading: true
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		setting(name) {
			return this.settings.filter(el => {
				return el.setting_name == name
			})[0]
		},
		getData() {
			this.loading = true;
			axios({
				method: 'GET',
				url: '/api/settings',
				headers: {
					'Authorization': 'Bearer ' + this.$auth.getToken()
				}
			})
			.then(response => {
				this.settings = response.data.settings
				this.loading = false;
			})
		},
		save() {
			axios({
				method: 'POST',
				url: '/api/settings',
				headers: {
					'Authorization': 'Bearer ' + this.$auth.getToken()
				},
				data: this.settings
			})
			.then(response => {
				if(response.data.success) {
					this.$toasted.show('Changes saved successfully!', {type: 'success'})
				}
				//this.settings = response.data.settings
				console.log(response.data)
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