<template>
  <component :is="node.reference.fields.__typename" :node="node.reference" :place="place">
  </component>
</template>

<script>
import Anime from './Anime'

export default {
  name: 'reference',
  props: ['node', 'place'],
  components: {
    Anime
  }
}
</script>

<style>

</style>
