<template>
  <section class="container years">
    <div class="columns">
      <div class="column is-one-third" v-for="year in years" :key="year.uuid">
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

export default {
  name: 'root',
  props: ['node'],
  computed: {
    years() {
      return this.node.children.elements.filter(it => it.fields.__typename === 'year')
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
  }
}
</script>

<style lang="scss" scoped>
.add {
  margin-bottom: 0px;
}
</style>
