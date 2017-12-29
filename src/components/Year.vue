<template>
  <section class="container">
    <div class="columns">
      <div class="column">
        <SeasonCard season="winter"></SeasonCard>
      </div>
      <div class="column">
        <SeasonCard season="spring"></SeasonCard>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <SeasonCard season="summer"></SeasonCard>
      </div>
      <div class="column">
        <SeasonCard season="fall"></SeasonCard>
      </div>
    </div>
  </section>
</template>

<script>
import SeasonCard from './SeasonCard'
export default {
  components: {
    SeasonCard
  }
}
</script>
