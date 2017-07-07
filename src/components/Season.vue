<template>
  <section>
    <div class="container">
      <div class="content">
        <draggable :options="draggableOptions" v-model="node.fields.anime">
          <component v-for="(micronode, index) in node.fields.anime" :key="index" :is="micronode.__typename" :node="micronode" :place="place(index)">
          </component>
        </draggable>
      </div>
      <section>
        loggedIn: {{loggedIn}} {{animeCount}} Anime gesamt
      </section>
    </div>
  </section>
</template>


<script>
import draggable from 'vuedraggable';
import Tier from './Tier';
import Reference from './Reference';
import { loggedIn } from '../services/api'

export default {
  name: 'season',
  props: ['node'],
  subscriptions: {
    loggedIn
  },
  computed: {
    draggableOptions() {
      return {
        disabled: !this.loggedIn,
        handle: '.handle'
      };
    },
    animeCount() {
      if (this.node.fields.anime) {
        return this.node.fields.anime.filter(it => it.__typename === 'reference').length;
      } else {
        return 0;
      }
    }
  },
  components: {
    draggable, Tier, Reference
  },
  methods: {
    output() {
      console.log(JSON.stringify(this.node.fields.anime))
    },
    place(index) {
      let array = this.node.fields.anime;
      let place = index + 1;
      for (let i = 0; i < index; i++) {
        if (array[i].__typename !== 'reference') {
          place--;
        }
      }
      return place;
    }
  }
}
</script>

<style>

</style>
