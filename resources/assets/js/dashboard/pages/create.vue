<template>
  <div>
      <form @submit.prevent="save">
          <div class="form-group">
		    <label>Slug</label>
            <input v-model="form.slug" type="text" class="form-control" :class="(errors.slug) ? 'is-invalid' : ''">
            <div v-if="errors.slug" class="invalid-feedback">{{errors.slug[0]}}</div>
          </div>
          <div class="form-group">
		    <label>View</label>
            <input v-model="form.view" type="text" class="form-control" :class="(errors.slug) ? 'is-invalid' : ''">
            <div v-if="errors.view" class="invalid-feedback">{{errors.view[0]}}</div>
            <!-- <select v-model="form.view_id" class="form-control">
                <option v-for="view in views" :key="view.id" :value="view.id">{{view.name}}</option>
            </select> -->
          </div>
          <div class="form-group">
		    <label>Fields</label>
              <button class="btn btn-primary btn-sm" @click.prevent="addField">+</button>
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
                    <input v-model="field.name" type="text" class="form-control" :class="errors['fields.' + form.fields.indexOf(field) + '.name'] ? 'is-invalid' : ''">
                    <div v-if="errors['fields.' + form.fields.indexOf(field) + '.name']" class="invalid-feedback">{{errors['fields.' + form.fields.indexOf(field) + '.name'][0]}}</div>
                </div>
                <div v-show="fields_type[form.fields.indexOf(field)] == 'text'" class="col">
                    <label>Value</label>
                    <textarea v-model="field.value" type="text" class="form-control" :class="errors['fields.' + form.fields.indexOf(field) + '.value'] ? 'is-invalid' : ''"></textarea>
                    <div v-if="errors['fields.' + form.fields.indexOf(field) + '.value']" class="invalid-feedback">{{errors['fields.' + form.fields.indexOf(field) + '.value'][0]}}</div>
                </div>
                <div v-show="fields_type[form.fields.indexOf(field)] == 'category'" class="col">
                    <label>Category</label>
                    <select v-model="field.category" class="form-control">
                        <option v-for="category in categories" :key="category.id" :value="category.slug">{{category.name}}</option>
                    </select>
                </div>
            </div>
          </div>
          <div v-show="error" class="alert alert-danger" role="alert">{{error}}</div>
          <button class="btn btn-primary" type="submit">Save</button>
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
            fields_type: [],
            errors: [],
            error: ''
        }
    },
    created() {
        get('pages/create')
        .then(response => {
            this.views = response.data.views
            this.categories = response.data.categories
            this.form.fields.push({name:'', value:'', category:''})
            this.fields_type.push('text')
        })
    },
    methods: {
        addField() {
            this.form.fields.push({name:'', value:'', category:''})
            this.fields_type.push('text')
        },
        save() {
            post('pages', this.form)
            .then(response => {
                if (response.data.success) {
                    this.errors = []
                    this.$toasted.show('Page added successfully', {type: 'success'})
                    this.$router.push('/dashboard/pages')
                }
            }).catch(err => {
                this.errors = err.response.data.errors
                this.error = err.response.data.message
            })
        }
    }

}
</script>

<style>

</style>
