<template>
	<div class="dashboard">
		<div class="dashboard__sideBar">
			<h1 class="dashboard__sideBar--title">Dashboard</h1>
			<div class="dashboard__sideBar--list">
				<div v-for="m in menu" :key="m.name" class="dashboard__sideBar--list-item">
					<router-link v-if="menuHasSingleItem(m)" :to="'/dashboard'+m.items[0].url" class="dashboard__sideBar--list-item-title">{{m.items[0].text}}</router-link>
					<div v-else>
						<h1 class="dashboard__sideBar--list-item-title">{{m.name}}</h1>
						<router-link 
						v-for="item in m.items" 
						:key="item.name" 
						:to="'/dashboard'+item.url" 
						class="dashboard__sideBar--list-item-link" >{{item.text}}</router-link>
					</div>
				</div>
				<div v-show="this.$auth.getToken() != null" class="dashboard__sideBar--list-item">
					<h1 style="cursor: pointer;" class="dashboard__sideBar--list-item-title" @click="logout">Logout</h1>
				</div>
			</div>			
		</div>
		<div class="dashboard__content">
			<div class="dashboard__content--header">
				<h1>Dashboard</h1>
				<div>
					<router-link to="/dashboard">Home</router-link><span v-if="$route.params.p">  /  </span>
					<router-link v-if="$route.params.p" :to="'/dashboard/'+$route.params.p">{{$route.params.p}}</router-link>
				</div>
			</div>
			<router-view class="dashboard__content--container"></router-view>
		</div>
	</div>
</template>

<script>
import { get, post } from '../helpers/api'
export default {
	data() {
		return {
			menu: [],
			api_token: '',
		}
	},
	created() {
		this.fetchMenu()
	},
	methods: {
		fetchMenu() {
			get('menu')
			.then(response => this.menu = response.data.menu)
		},
		menuHasSingleItem(m) {
			if(m.items.length == 1 )
			{
				return true;
			}
			return false;
		},
		logout() {
			get('logout')
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
	}
	
	button {
		cursor: pointer;
	}

	.dashboard__sideBar {
		position: fixed;
		width: 300px;
		overflow-y: scroll;
		top: 0;
		bottom: 0;
		background: #232730;
		flex-basis: 300px;
		padding: 30px;
		display: flex;
		flex-direction: column;
		text-transform: capitalize;
	}

	.dashboard__sideBar--title {
		color: #fafafc;
		font-size: 2.5em;
		padding: 0 10px;
	}

	.dashboard__sideBar--list {
		padding: 10px 10px;
	}

	.dashboard__sideBar--list-item div {
		margin-bottom: 40px;
		display: flex;
		flex-direction: column;
	}

	.dashboard__sideBar--list-item-title {
		color: #fafafc;
		font-size: 1.5em;
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
		margin-left: 300px;
		display: flex;
		flex-direction: column;
	}

	.dashboard__content--header {
		background: #fff;
		padding: 50px;
	}

	.dashboard__content--container {
		padding: 50px;
	}
</style>