<template>
  <div>
    <component v-if="node" :is="node.schema.name" :node="node" :place="place" @delete="$emit('delete')">
    </component>
  </div>
</template>

<script>
import Anime from './Anime'
import * as api from '../api'
import Rx from 'rxjs/Rx'

export default {
  name: 'reference',
  props: ['micronode', 'place'],
  components: {
    Anime
  },
  subscriptions() {
    return {
      node: this.micronode ? Rx.Observable.fromPromise(api.getNode(this.micronode.fields.reference.uuid)) : Rx.Observable.never()
    }
  }
}
</script>

<style>

</style>
