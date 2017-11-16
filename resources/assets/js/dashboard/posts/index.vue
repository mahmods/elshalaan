<template>
	<div>
		<div id="search-wrapper"><input type="text" id="search" v-model="search"></div>
		<nav class="pagination-wrapper">
			<ul class="pagination">
				<li class="page-item" :class="data.current_page == 1 ? 'disabled' : ''">
					<button  @click.prevent="previous" class="page-link">previous page</button>
				</li>
				<li class="page-item" :class="i == data.current_page ? 'active': ''" v-for="i in data.last_page" :key="i">
					<button v-text="i" @click.prevent="go(i)" class="page-link"></button>
				</li>
				<li class="page-item" :class="data.current_page == data.last_page ? 'disabled' : ''">
					<button @click.prevent="next" class="page-link">next page</button>
				</li>
			</ul>
		</nav>

		<spinner v-if="loading" size="big"></spinner>
        <table class="table" v-else>
            <thead>
                <tr>
					<th>#</th>
					<th>Title</th>
					<th>Description</th>
					<th>Category</th>
					<th>Date</th>
					<th>User</th>
					<th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredData" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.category.name}}</td>
                    <td>{{item.created_at}}</td>
					<td>{{item.user.name}}</td>
					<td>
						<router-link class="btn btn-primary" :to="'/dashboard/posts/' +item.id+'/update'"><icon name="pencil"></icon></router-link>
						<button class="btn btn-danger" v-on:click="remove(item.id)"><icon name="trash"></icon></button>
					</td>
                </tr>
            </tbody>
        </table>

		<nav class="pagination-wrapper">
			<ul class="pagination">
				<li class="page-item" :class="data.current_page == 1 ? 'disabled' : ''">
					<button  @click.prevent="previous" class="page-link">previous page</button>
				</li>
				<li class="page-item" :class="i == data.current_page ? 'active': ''" v-for="i in data.last_page" :key="i">
					<button v-text="i" @click.prevent="go(i)" class="page-link"></button>
				</li>
				<li class="page-item" :class="data.current_page == data.last_page ? 'disabled' : ''">
					<button @click.prevent="next" class="page-link">next page</button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			data: [],
			loading: true,
			search: ''
		}
	},
	computed: {
		filteredData: function () {
			const exp = new RegExp(this.search, 'i')
			return this.data.data.filter(item => {
				return ( exp.test(item.id) || exp.test(item.title) || exp.test(item.category.name) || exp.test(item.category.description))
			})
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			this.loading = true;
			this.$api.get('posts')
			.then(response => {
				this.data = response.data
				this.loading = false;
			})
		},
		remove(id) {
			this.$api.del('posts/' + id)
			.then(response => {
				if(response.data.success) {
					this.getData();
				}
			})
		},
		next() {
			this.loading = true;
			this.$api.get('posts?page=' + (this.data.current_page + 1))
			.then(response => {
				this.data = response.data
				this.loading = false;
			})
		},
		go(id) {
			this.loading = true;
			this.$api.get('posts?page=' + id)
			.then(response => {
				this.data = response.data
				this.loading = false;
			})
		},
		previous() {
			this.loading = true;
			this.$api.get('posts?page=' + (this.data.current_page - 1))
			.then(response => {
				this.data = response.data
				this.loading = false;
			})
		}
    },
}
</script>

<style>
	button {
		cursor: pointer;
	}

	input:focus,
	select:focus,
	textarea:focus,
	button:focus {
		outline: none;
	}

	.pagination-wrapper {
		display: flex;
		justify-content: center;
	}

	#search-wrapper {
		display: flex;
	}

	#search {
		margin: 20px auto;
		align-self: center;
		background: url('/images/search-dark.png') no-repeat 10px 15px #fcfcfc;
		color: #6a6f75;
		width: 400px;
		-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
		border: 0 none;
		font: bold 12px Arial,Helvetica,Sans-serif;
		padding: 15px 15px 15px 35px;
		-webkit-border-radius: 20px;
		-moz-border-radius: 20px;
		border-radius: 20px;
		-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;
		-webkit-transition: all 0.7s ease 0s;
		-moz-transition: all 0.7s ease 0s;
		-o-transition: all 0.7s ease 0s;
		transition: all 0.7s ease 0s;
		}

	#search:focus {
		color: #6a6f75;
		width: 500px;
		-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		-moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(0, 0, 0, 0.9) inset;
		text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
		}
</style>