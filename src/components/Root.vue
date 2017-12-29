<template>
  <section class="container years">
    <div class="columns">
      <div class="column is-one-third" v-for="year in years" :key="year.uuid">
        <LinkCard :link="year.path" :image="year.fields.image.path">
          {{year.fields.name}}
        </LinkCard>
      </div>
    </div>
  </section>
</template>

<script>
import LinkCard from './LinkCard'
import { isLoggedIn } from '../api.js'

export default {
  name: 'root',
  props: ['node'],
  computed: {
    years() {
      return this.node.children.elements.filter(it => it.fields.__typename === 'year').sort(yearSorter)
    }
  },
  components: {
    LinkCard
  }
}

function yearSorter(a, b) {
  return -a.fields.name.localeCompare(b.fields.name);
}
</script>

<style lang="scss">
.years .image img {
  height: 650px;
  object-fit: cover;
}

</style>
