<template>
  <section class="container years">
    <div class="columns">
      <div class="column is-one-third" v-for="year in node.children.elements" :key="year.uuid">
        <LinkCard :link="year.path" :image="year.fields.image.path" figureClass="year">
          {{year.fields.name}}
        </LinkCard>
      </div>
    </div>
  </section>
</template>

<script>
import LinkCard from './LinkCard'
import { isLoggedIn } from '../services/api.js'
import bus from '../services/bus'

export default {
  name: 'root',
  props: ['node'],
  data: function () {
    return {
      loggedIn: false
    }
  },
  methods: {
    addYear: function () {
      console.log("add");
    }
  },
  components: {
    LinkCard
  },
  created: function () {
    bus.$on('loggedIn', () => this.loggedIn = true)
  }
}
</script>

<style lang="scss" scoped>
.add {
  margin-bottom: 0px;
}
</style>
