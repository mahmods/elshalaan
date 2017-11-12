<template>
  <div>
      <form @submit.prevent="save">
          <div class="form-group">
		    <label>Slug</label>
            <input v-model="form.slug" type="text" class="form-control">
          </div>
          <div class="form-group">
		    <label>View</label>
            <input v-model="form.view" type="text" class="form-control">
            <!-- <select v-model="form.view_id" class="form-control">
                <option v-for="view in views" :key="view.id" :value="view.id">{{view.name}}</option>
            </select> -->
          </div>
          <div class="form-group">
		    <label>Fields</label>
              <button @click.prevent="addField">add field</button>
            <div v-for="field in form.fields" :key="form.fields.indexOf(field)">
                <div class="form-check form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" v-model="fields_type[form.fields.indexOf(field)]" value="text"> Regular Text
                </label>
                </div>
                <div class="form-check form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" v-model="fields_type[form.fields.indexOf(field)]" value="category"> From Category
                </label>
                </div>
                <div v-show="fields_type[form.fields.indexOf(field)] == 'text'" class="col">
                    <label>Name</label>
                    <input v-model="field.name" type="text" class="form-control">
                </div>
                <div v-show="fields_type[form.fields.indexOf(field)] == 'text'" class="col">
                    <label>Value</label>
                    <textarea v-model="field.value" type="text" class="form-control"></textarea>
                </div>
                <div v-show="fields_type[form.fields.indexOf(field)] == 'category'" class="col">
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
                view: '',
                fields: []
            },
            fields_type: []
        }
    },
    created() {
        get('pages/' + this.$route.params.id + '/edit')
        .then(response => {
            this.views = response.data.views
            this.categories = response.data.categories
            this.form = response.data.form
            this.form.fields = response.data.fields
            this.form.fields.forEach(f => {
                if (f.category == '') {
                    this.fields_type.push('text')
                } else {
                    this.fields_type.push('category')
                }
            })
        })
    },
    methods: {
        addField() {
            this.form.fields.push({name:'', value:'', category:''})
            this.fields_type.push('text')
        },
        save() {
            post('pages/' + this.$route.params.id + '?_method=PUT', this.form)
            .then(response => {
                console.log(response.data)
            })
        }
    }

}
</script>

<style>

</style>
