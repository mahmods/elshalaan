<template>
  <div>
      <spinner v-if="loading" size="big"></spinner>
      <div v-else>
      <form @submit.prevent="save">
          <div class="form-group">
		    <label>Slug</label>
            <input v-model="form.slug" type="text" class="form-control" :class="(errors.slug) ? 'is-invalid' : ''">
            <div v-if="errors.slug" class="invalid-feedback">{{errors.slug[0]}}</div>
          </div>
          <div class="form-group">
		    <label>Template</label>
            <!-- <input v-model="form.view" type="text" class="form-control" :class="(errors.slug) ? 'is-invalid' : ''"> -->
            <select @change="template_change" v-model="form.template_id" class="form-control">
                <option v-for="template in templates" :key="template.id" :value="template.id">{{template.name}}</option>
            </select>
            <div v-if="errors.view" class="invalid-feedback">{{errors.view[0]}}</div>
          </div>
          <div class="form-group">
		    <label>Fields</label>
              <!-- <button class="btn btn-primary btn-sm" @click.prevent="addField">+</button> -->
              <div class="fields_wrapper">

            <div class="field" v-for="field in form.fields" :key="form.fields.indexOf(field)">

                <div v-show="fields_type[form.fields.indexOf(field)] == 'text'" class="col">
                    <label>Name</label>
                    <input v-model="field.name" type="text" class="form-control" :class="errors['fields.' + form.fields.indexOf(field) + '.name'] ? 'is-invalid' : ''">
                    <div v-if="errors['fields.' + form.fields.indexOf(field) + '.name']" class="invalid-feedback">{{errors['fields.' + form.fields.indexOf(field) + '.name'][0]}}</div>
                </div>
                <div v-show="fields_type[form.fields.indexOf(field)] == 'text'" class="col">
                    <label>Value</label>
                    <textarea cols="25" rows="10" v-model="field.value" type="text" class="form-control" :class="errors['fields.' + form.fields.indexOf(field) + '.value'] ? 'is-invalid' : ''"></textarea>
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
          </div>
          <div v-show="error" class="alert alert-danger" role="alert">{{error}}</div>
          <button class="btn btn-primary" type="submit">Save</button>
      </form>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            templates: [],
            categories: [],
            form: {
                slug: '',
                template_id: '',
                fields: []
            },
            fields_type: [],
            errors: [],
            error: '',
            loading: true
        }
    },
    created() {
        this.$api.get('pages/create')
        .then(response => {
            this.templates = response.data.templates
            this.categories = response.data.categories
            //this.form.fields.push({name:'', value:'', category:''})
            //this.fields_type.push('text')
            this.loading = false
        })
    },
    methods: {
        addField() {
            //this.form.fields.push({name:'', value:'', category:''})
            //this.fields_type.push('text')
        },
        template_change(e) {
            var template = this.templates[e.target.value-1]
            console.log(template.fields)
            console.log(template.fields_type)
            this.form.fields = []
            this.fields_type = []
            for (var i = 0; i < template.fields; i++) {
                this.form.fields.push({name:'', value:'', category:''})
                this.fields_type.push(template.fields_type.split('|')[i])
            }

        },
        save() {
            this.$api.post('pages', this.form)
            .then(response => {
                if (response.data.success) {
                    this.errors = []
                    this.$toasted.show('Page added successfully', {type: 'success'})
                    this.$router.push('/dashboard/pages')
                }
            }).catch(err => {
                this.errors = err.response.data.errors
                this.error = err.response.data.message
                console.log(err.response.data)
            })
        }
    }

}
</script>

<style>
.fields_wrapper {
    display: flex;
    flex-direction: column;
}
.field {
    flex: 1 auto;
    margin: 10px;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
