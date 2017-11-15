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
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    padding: 30px;
    background-color: #fff;
    margin: 20px 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
