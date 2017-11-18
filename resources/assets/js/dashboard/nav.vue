<template>
  <div>
      <spinner v-if="loading" size="big"></spinner>
      <div v-else>

    <div class="col">
        <draggable class="list-group" element="ul" v-model="nav.items" @start="isDragging=true" @end="isDragging=false"> 
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="element in nav.items" :key="nav.items.indexOf(element)">
                <div class="form-row">
                    <div class="col">
                        <input class="form-control" placeholder="Name" type="text" v-model="element.name" required>
                    </div>
                    <div class="col">
                        <input class="form-control" placeholder="Url" type="text" v-model="element.url" required>
                    </div>
                    <div class="col">
                        <button class="btn btn-danger btn-sm" @click="remove(nav.items.indexOf(element))">X</button>
                    </div>
                </div>
            </li> 
          </transition-group>
      </draggable>
      <div class="list-group-item add" style="cursor: pointer;" @click="add">+</div>
    </div>
    <div class="col pt-2">
        <div v-show="errors.message" class="alert alert-danger" role="alert">{{errors.message}}</div>
      <button class="btn btn-primary" @click.prevent="save">Save</button>
    </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
    },
    data() {
        return {
            nav: {
                items:[]
            },
            errors: [],
            loading: true
        }
    },
    created() {
        this.$api.get('nav')
        .then(response => {
            this.nav.items = response.data
            this.loading = false
        })
    },
    methods: {
        save() {
            this.$api.post('nav', this.nav)
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    this.errors = []
                    this.$toasted.show('Changes saved successfully', {type: 'success'})
                }
            }).catch(err => {
                console.log(err.response.data)
                if(err.response.status === 422) {
					this.errors = err.response.data
				}
            })
        },
        add() {
            this.nav.items.push({
                name: '',
                url: ''
            })
        },
        remove(id) {
            this.nav.items.splice(id, 1)
        }
    }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
    display: flex;
    flex-direction: row;
    cursor: move;
}
.add {
    color: #606060;
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
}
.list-group-item i{
  cursor: pointer;
}
</style>
