<template>
  <div>
    <div class="col">
        <draggable class="list-group" element="ul" v-model="nav" @start="isDragging=true" @end="isDragging=false"> 
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="element in nav" :key="nav.indexOf(element)">
                <div class="form-row">
                    <div class="col">
                        <input class="form-control" placeholder="Name" type="text" v-model="element.name" required>
                    </div>
                    <div class="col">
                        <input class="form-control" placeholder="Url" type="text" v-model="element.url" required>
                    </div>
                    <div class="col">
                        <button class="btn btn-danger btn-sm" @click="remove(nav.indexOf(element))">X</button>
                    </div>
                </div>
            </li> 
          </transition-group>
      </draggable>
      <div class="list-group-item add" style="cursor: pointer;" @click="add">+</div>
    </div>
      <button class="btn btn-primary" @click.prevent="save">Save</button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {get, post} from '../helpers/api'
export default {
    components: {
        draggable,
    },
    data() {
        return {
            nav: [],
        }
    },
    created() {
        get('nav')
        .then(response => {
            this.nav = response.data
        })
    },
    methods: {
        save() {
            post('nav', this.nav)
            .then(response => console.log(response.data))
        },
        add() {
            this.nav.push({
                name: '',
                url: ''
            })
        },
        remove(id) {
            this.nav.splice(id, 1)
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
    color: #ccc;
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
}
.list-group-item i{
  cursor: pointer;
}
</style>
