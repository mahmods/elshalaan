<template>
<div>
	<spinner v-if="loading" size="big"></spinner>
	<div v-else>
		<form @submit.prevent="save">
			<h1>{{action}} {{$route.params.model}}</h1>
		  <div v-for="item in data.form" :key="item.name" class="form-group">
		    <label>{{item.label}}</label>
		    <input v-if="item.type == 'input'" v-model="item.value" :type="item.innerType" class="form-control" :class="errors[item.model] ? 'is-invalid' : ''">
			<vue-editor v-if="item.editor" v-model="item.value" class="form-control" :class="errors[item.model] ? 'is-invalid' : ''"></vue-editor>
		    <textarea v-if="item.type == 'textarea' && !item.editor" v-model="item.value" class="form-control" :class="errors[item.model] ? 'is-invalid' : ''"></textarea>
			<select v-if="item.type == 'select'" class="form-control" :class="errors[item.model] ? 'is-invalid' : ''" v-model="item.value">
				<option v-for="option in item.options" :key="option.id" :value="option.id">{{option.name}}</option>
			</select>
			<div v-if="item.type == 'image'" class="form-control" :class="errors[item.model] ? 'is-invalid' : ''">
				<input @change="onFileChange(item, $event)" type="file" accept="images/*" class="form-control-file">
				<img :src="image" alt="">
			</div>
			<div v-if="errors[item.model]" class="invalid-feedback">{{errors[item.model][0]}}</div>
		  </div>
		  <button type="submit" class="btn btn-primary">Save</button>
		</form>
	</div>
</div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import Pluralize from 'pluralize'
import Spinner from 'vue-simple-spinner'


export default {
	components: {
	  VueEditor,
	  Spinner
   },
	data() {
		return {
			data: [],
			form: [],
			errors: [],
			image: null,
            loading: true,
            initializeURL: '',
            storeURL: '',
            action: 'Create'
		}
	},
	created() {
        this.fetchForm()
	},
	watch: {
		'$route.params.model'() {
			this.fetchForm()
		},
		'$route.params.id'() {
			this.fetchForm()
		}
	},
	methods: {
		fetchForm() {
            this.initializeURL = `${this.$route.params.model}/create`
            this.storeURL = `${this.$route.params.model}`
            if(this.$route.meta.mode === 'edit') {
                this.initializeURL = `${this.$route.params.model}/${this.$route.params.id}/edit`
                this.storeURL = `${this.$route.params.model}/${this.$route.params.id}?_method=PUT`
                this.action = 'Edit'
            }

			this.loading = true;
			this.$api.get(this.initializeURL)
			.then(response => {
				this.data = response.data
				this.loading = false;
				if(this.data.form[2]) {
					this.setPreview(this.data.form[2])
				}
			})
		},
		onFileChange(item, e) {
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			item.value = files[0]
			this.setPreview(item)

		},
		setPreview(item) {
				if(item.value instanceof File ) {
					const fileReader = new FileReader()
					fileReader.onload = (event) => {
					  this.image = event.target.result
					  //item.value = event.target.result
					  
					}
					fileReader.readAsDataURL(item.value)
				} else if (typeof item.value === 'string') {
					this.image = `/images/${item.value}`
				} else {
					this.image = null
				}
			},
		save() {
			var form = new FormData()
			this.data.form.forEach(input => {
				form.set(input.model, input.value)
			})
			this.$api.post(this.storeURL, form)
			.then(response => {
				this.data.form.id = response.data.id
				if(response.data.success) {
					this.$toasted.show(
                        this.capitalizeFirstLetter(Pluralize.singular(this.$route.params.model))
                        + ' #' +  this.data.form.id + ' '
                        + this.action.toLowerCase()
                        + 'ed successfully!', {type: 'success'})
					this.$router.push('/dashboard/' + this.$route.params.model)
					
				}
				console.log(response.data)
			})
			.catch(err => {
				if(err.response.status === 422) {
					this.errors = err.response.data.errors
				}
			})
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
	}
}
</script>