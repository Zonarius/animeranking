<template>
  <section>
    <div class="container">
      <div class="content">
        <draggable :options="draggableOptions" v-model="node.fields.anime" @end="save">
          <component v-for="(micronode, index) in node.fields.anime" :key="index" :is="micronode.__typename" :node="micronode" :place="place(index)">
          </component>
        </draggable>
      </div>
      <section>
        {{animeCount}} Anime gesamt
      </section>
    </div>
  </section>
</template>


<script>
import draggable from 'vuedraggable';
import Tier from './Tier';
import Reference from './Reference';
import { loggedIn, save } from '../api'

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
