<template>
	<div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="login">
                    <h1>Login</h1>
                <div class="form-group">
                    <label>Email Address</label>
                    <input v-model="form.email" type="email" class="form-control">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password" type="password" class="form-control">
                </div>
                <div v-if="error !== null" class="alert alert-danger" role="alert">{{error}}</div>
                <button type="submit" class="btn btn-primary">Login</button>
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
                email: '',
                password: ''
            },
            error: null
		}
    },
    created() {
        if(this.$auth.getToken()) {
            this.$router.push('/dashboard')
        }
    },
	methods: {
		login() {
            this.$api.post('login', this.form)
			.then(response => {
				if(response.data.authenticated) {
                    this.$auth.setAuth(response.data.api_token, response.data.user_id)
                    this.$router.go({path: 'dashboard',force: true})
                } else {
                    this.error = "Your email or password is wrong."
                }
			})
		}
	}
}
</script>