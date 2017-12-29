<template>
  <LinkCard :disabled="disabled" :link="link" :image="image">{{season | capitalize}}</LinkCard>
</template>

<script>
import { currentNode } from '../api';
import LinkCard from './LinkCard';

export default {
  props: ['season'],
  subscriptions: {
    node: currentNode
  },
  computed: {
    link() {
      return this.node && this.node.fields[this.season] && this.node.fields[this.season].path
    },
    image() {
      return `/static/images/${this.season}.jpg`;
    },
    disabled() {
      return !(this.node && this.node.fields[this.season])
    }
  },
  components: {
    LinkCard
  }
}
</script>

<style>

</style>
