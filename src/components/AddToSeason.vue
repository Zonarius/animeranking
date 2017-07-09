<template>
  <section>
    <p class="title">Hinzufügen</p>
    <div class="tabs">
      <ul>
        <li v-for="addComp in addComponents" :key="addComp" :class="{'is-active': currentAddComponent === addComp.component}">
          <a @click="showAdd(addComp.component)">{{addComp.name}}</a>
        </li>
      </ul>
    </div>
    <component :parentNode="parentNode" :is="currentAddComponent"></component>
  </section>
</template>

<script>
import AddAnime from './AddAnime'
import AddTier from './AddTier'

export default {
  name: 'addToSeason',
  props: ['parentNode'],
  data() {
    return {
      currentAddComponent: 'addAnime',
      addComponents: [
        { component: 'addAnime', name: 'Anime' },
        { component: 'addTier', name: 'Tier' }
      ]
    }
  },
  methods: {
    showAdd(component) {
      this.currentAddComponent = component;
    }
  },
  components: {
    AddAnime,
    AddTier
  }
}
</script>

<style>

</style>
