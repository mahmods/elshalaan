<template>
  <div>
      <div class="message" v-for="m in messages" :key="m.id">
          <div class="message__item">Name: {{m.name}}</div>
          <div class="message__item">Email Address: {{m.email}}</div>
          <div class="message__item">Phone: {{m.phone}}</div>
          <div class="message__item">Message: {{m.message}}</div>
          <div class="message__item">Date: {{m.created_at}}</div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
		return {
			messages: [],
		}
	},
    created() {
        axios({
            method: 'GET',
            url: '/api/CRUD/contactus',
            headers: {
                'Authorization': 'Bearer ' + this.$auth.getToken()
            }
        })
        .then(response => {
            console.log(response.data)
            this.messages = response.data.rows
        })
    }
}
</script>

<style>
.message {
    display: flex;
    flex-direction: column;
    padding: 30px;
    background-color: #a3aab4;
    margin: 10px 20px;
}
</style>
