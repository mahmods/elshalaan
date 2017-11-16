<template>
	<div class="dashboard">
		<div v-if="loggedIn()" class="dashboard__sideBar">
			<div class="dashboard__sideBar--wrapper">
			<h1 class="dashboard__sideBar--title">Dashboard</h1>
			<spinner v-if="loading" size="big"></spinner>
			<div v-else class="dashboard__sideBar--list">
				<div v-for="m in menu" :key="m.name" class="dashboard__sideBar--list-item">
					<router-link v-if="menuHasSingleItem(m)" :to="'/dashboard'+m.items[0].url" class="dashboard__sideBar--list-item-title"><icon v-show="m.icon" :name="m.icon"></icon> {{m.items[0].text}}</router-link>
					<div v-else>
						
						<h1 @click="toggleMenu(menu.indexOf(m))" class="dashboard__sideBar--list-item-title"><icon v-show="m.icon" :name="m.icon"></icon> {{m.name}}</h1>
						<transition name="">
							<div v-show="menu_state[menu.indexOf(m)]">
							<router-link 
							transition="slide-in-out"
							
							v-for="item in m.items" 
							:key="item.text" 
							:to="'/dashboard'+item.url" 
							class="dashboard__sideBar--list-item-link" >{{item.text}}
							
							</router-link>
							</div>
						</transition>
					</div>
				</div>
				<div v-show="this.$auth.getToken() != null" class="dashboard__sideBar--list-item">
					<h1 style="cursor: pointer;" class="dashboard__sideBar--list-item-title" @click="logout">Logout</h1>
				</div>
			</div>	
			</div>		
		</div>
		<div class="dashboard__content">
			<div v-if="loggedIn()"  class="dashboard__content--header">
				<h1>Dashboard</h1>
				<div>
					<router-link to="/dashboard">Home</router-link><span v-if="$route.meta.model || $route.params.model">  /  </span>
					<router-link v-if="$route.meta.model" :to="'/dashboard/'+$route.meta.model">{{$route.meta.model}}</router-link>
					<router-link v-else-if="$route.params.model" :to="'/dashboard/'+$route.params.model">{{$route.params.model}}</router-link>
				</div>
			</div>
			<router-view class="dashboard__content--container"></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			menu: [],
			menu_state: [],
			loading: true,
		}
	},
	created() {
		this.fetchMenu()
	},
	methods: {
		loggedIn() {
			return !this.$route.path.includes('login')
		},
		fetchMenu() {
			this.$api.get('menu')
			.then(response => {
				this.menu = response.data.menu
				this.menu.forEach(m => {
					this.menu_state.push(false)
				})
				this.loading = false
			})
			.catch(err => this.loading = false)
		},
		menuHasSingleItem(m) {
			if(m.items.length == 1 )
			{
				return true;
			}
			return false;
		},
		toggleMenu(id) {
			this.$set(this.menu_state, id, !this.menu_state[id])
        },
		logout() {
			this.$api.get('logout')
			.then(response => {
				if(response.data.success) {
					this.$auth.destroy()
					this.$router.go({path: 'dashboard/login',force: true})
				}
			})
		}
	}
}
</script>

<style>
	body {
		background: #f4f7fa;
		font-size: 0.8rem;
	}
	.wrapper, html, body {
		height:100%;
		margin:0;
	}
	
	button {
		cursor: pointer;
	}

	.form-control {
		font-size: 0.8rem;
	}

	.dashboard {
		height: 100%;
		display: flex;
	}

	.dashboard__sideBar {
		flex-basis: 250px;
		background: #2F3640;
	}

	.dashboard__sideBar--wrapper {
		background: #2F3640;
		position: fixed;
		width: 250px;
		top: 0;
		bottom: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		text-transform: capitalize;
	}

	.dashboard__sideBar--title {
		color: #fafafc;
		font-size: 2.0em;
	}

	.dashboard__sideBar--list {
		padding: 10px 10px;
	}

	.dashboard__sideBar--list-item {
		margin: 10px 0;
	}

	.dashboard__sideBar--list-item div {
		display: flex;
		flex-direction: column;
	}

	.dashboard__sideBar--list-item-title {
		color: #D5D6D4;
		font-size: 1.2em;
		cursor: pointer;
	}

	.dashboard__sideBar--list-item-title svg {
		margin-right: 10px;
	}

	.collapse-enter-active, .collapse-leave-active {
		transition: margin-top .2s
	}

	.collapse-enter, .collapse-leave-to {
		margin-top: -50px;
	}

	.dashboard__sideBar--list-item-link {
		color: #a3aab4;
		font-size: 1.2em;
		padding-left: 10px;
	}

	.dashboard__sideBar--image {
		margin-bottom: 40px;
		margin-top: 20px;
		width: 100%;
		height: auto;
		padding: 0 50px;
	}

	.dashboard__content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.dashboard__content--header {
		background: #fff;
		padding: 20px;
	}

	.dashboard__content--container {
		padding: 20px 50px;
	}
</style>