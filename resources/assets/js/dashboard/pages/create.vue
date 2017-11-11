<template>
  <div>
      <form @submit.prevent="save">
          <div class="form-group">
		    <label>Slug</label>
            <input v-model="form.slug" type="text" class="form-control">
          </div>
          <div class="form-group">
		    <label>View</label>
            <select v-model="form.view_id" class="form-control">
                <option v-for="view in views" :key="view.id" :value="view.id">{{view.name}}</option>
            </select>
          </div>
          <div class="form-group">
		    <label>Fields</label>
              <button @click.prevent="addField">add field</button>
            <div v-for="field in form.fields" :key="field.name" class="form-row">
                <div class="col">
                    <label>Name</label>
                    <input v-model="field.name" type="text" class="form-control">
                </div>
                <div class="col">
                    <label>Value</label>
                    <input v-model="field.value" type="text" class="form-control">
                </div>
                <div class="col">
                    <label>Category</label>
                    <select v-model="field.category" class="form-control">
                        <option v-for="category in categories" :key="category.id" :value="category.slug">{{category.name}}</option>
                    </select>
                </div>
            </div>
          </div>
          <button type="submit">Save</button>
      </form>
  </div>
</template>

<script>
import { get, post } from '../../helpers/api'
export default {
    data() {
        return {
            views: [],
            categories: [],
            form: {
                slug: '',
                view_id: 0,
                fields: []
            }
        }
    },
    created() {
        get('pages/create')
        .then(response => {
            this.views = response.data.views
            this.categories = response.data.categories
            this.form.fields.push({name:'', value:'', category:''})
        })
    },
    methods: {
        addField() {
            this.form.fields.push({name:'', value:'', category:''})
        },
        save() {
            post('pages', this.form)
            .then(response => {
                console.log(response.data)
            })
        }
    }

}
</script>

<style>

</style>
