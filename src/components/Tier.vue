<template>
  <h1>
    <div class="handle" v-if="loggedIn">
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </div>
    {{micronode.fields.name}}
    <a v-if="loggedIn" @click="$emit('delete')" class="delete is-medium"></a>
  </h1>
</template>

<script>
import * as api from '../api'

export default {
  name: 'tier',
  props: ['micronode'],
  subscriptions: {
    loggedIn: api.loggedIn
  }
}
</script>

<style lang="scss" scoped>
.delete {
  opacity: 0;
  transition: opacity 0.2s ease;
}

h1:hover .delete {
  opacity: 1;
}
</style>