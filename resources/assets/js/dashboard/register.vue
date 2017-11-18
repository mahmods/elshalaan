<template>
	<div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="register">
                    <h1>Register</h1>
                    <div class="form-group">
                    <label>Name</label>
                    <input v-model="form.name" type="text" class="form-control" :class="errors.name ? 'is-invalid':''">
                    <div v-if="errors.name != null" class="invalid-feedback">{{errors.name[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input v-model="form.email" type="email" class="form-control" :class="errors.email ? 'is-invalid':''">
                    <div v-if="errors.email != null" class="invalid-feedback">{{errors.email[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password" type="password" class="form-control" :class="errors.password ? 'is-invalid':''">
                    <div v-if="errors.password != null" class="invalid-feedback">{{errors.password[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Password Confirmation</label>
                    <input v-model="form.password_confirmation" type="password" class="form-control" :class="errors.password_confirmation ? 'is-invalid':''">
                    <div v-if="errors.password_confirmation != null" class="invalid-feedback">{{errors.password_confirmation[0]}}</div>
                </div>
                <div v-if="message != ''" class="alert alert-danger" role="alert">{{message}}</div>
                <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: [],
            message: ''
		}
	},
	methods: {
		register() {
            this.$api.post('register', this.form)
			.then(response => {
				if(response.data.registered) {
                    this.$router.push('/dashboard/login')
                } else {
                    this.error = "Your email or password is wrong."
                }
            })
            .catch(err => {
                this.errors = err.response.data.errors
                this.message = err.response.data.message
            })
		}
	}
}
</script>