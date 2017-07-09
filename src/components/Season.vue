<template>
  <section>
    <div class="container">
      <div class="content" v-if="restNode">
        <draggable :options="draggableOptions" v-model="restNode.fields.anime" @end="save(restNode)">
          <component v-for="(micronode, index) in restNode.fields.anime" :key="micronode.uuid" :is="micronode.microschema.name" :micronode="micronode" :place="place(index)" @delete="del(index)">
          </component>
        </draggable>
      </div>
      <section class="section">
        {{animeCount}} Anime gesamt
      </section class="section">
      <AddToSeason v-if="loggedIn" :parentNode="restNode"></AddToSeason>
    </div>
  </section>
</template>


<script>
import draggable from 'vuedraggable';
import Tier from './Tier';
import Reference from './Reference';
import AddToSeason from './AddToSeason'

import * as api from '../api'
import Rx from 'rxjs/Rx'

export default {
  name: 'season',
  props: ['node'],
  data() {
    return {
      restNode: undefined,
    }
  },
  subscriptions() {
    return {
      loggedIn: api.loggedIn,
    }
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
    draggable, Tier, Reference, AddToSeason
  },
  methods: {
    place(index) {
      let array = this.restNode.fields.anime;
      let place = index + 1;
      for (let i = 0; i < index; i++) {
        if (array[i].microschema.name !== 'reference') {
          place--;
        }
      }
      return place;
    },
    save: api.save,
    log: console.log,
    del(index) {
      this.restNode.fields.anime.splice(index, 1)
      api.save(this.restNode).then(it => this.restNode.version = it.version)
    }
  },
  created() {
    api.getNode(this.node.uuid).then(it => {
      this.restNode = it
      if (!it.fields.anime) {
        it.fields.anime = []
      }
    })
    api.nodeUpdated.filter(it => it.uuid === this.node.uuid).subscribe(node => {
      this.restNode.version = node.version
    })
  }
}
</script>

<style>

</style>
