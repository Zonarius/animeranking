<template>
  <form @submit.prevent="add">
    <div class="field has-addons">
      <p class="control">
        <input v-model="name" class="input" type="text" placeholder="Tier">
      </p>
      <p class="control">
        <a @click="add" class="button is-info">
          Hinzufügen
        </a>
      </p>
    </div>
  </form>
</template>

<script>
import * as api from '../api'

function tier(name) {
  return {
    microschema: {
      name: 'tier'
    },
    fields: {
      name: name
    }
  }
}

export default {
  name: 'addTier',
  props: ['parentNode'],
  data() {
    return {
      name: undefined
    }
  },
  methods: {
    add() {
      this.$emit('create', this.name)
      this.parentNode.fields.anime.push(tier(this.name))
      api.save(this.parentNode).then(it => this.parentNode.version = it.version)
      this.name = undefined
    }
  }
}
</script>

<style>

</style>
