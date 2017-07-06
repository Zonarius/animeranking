<template>
  <section class="container">
    <div class="columns">
      <div class="column">
        <LinkCard :link="path('spring')" image="/static/images/spring.jpg">Spring</LinkCard>
      </div>
      <div class="column">
        <LinkCard :link="path('summer')" image="/static/images/summer.jpg">Summer</LinkCard>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <LinkCard :link="path('fall')" image="/static/images/fall.jpg">Fall</LinkCard>
      </div>
      <div class="column">
        <LinkCard :link="path('winter')" image="/static/images/winter.jpg">Winter</LinkCard>
      </div>
    </div>
  </section>
</template>

<script>
import LinkCard from './LinkCard'
export default {
  name: 'year',
  props: ['node'],
  components: {
    LinkCard
  },
  methods: {
    path(season) {
      return this.node.fields[season] && this.node.fields[season].path
    }
  }
}
</script>
<style>

</style>
