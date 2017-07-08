<template>
  <article class="media">
    <div class="handle" v-if="loggedIn">
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </div>
    <figure class="media-left">
      <p class="image">
        <img :src="node.fields.thumbnailUrl">
      </p>
    </figure>
    <div class="media-content">
      <div class="columns is-mobile">
        <div v-if="place <= 3" class="column is-narrow trophy" :class="{['place' + place]: true}">
          <i class="fa fa-trophy" aria-hidden="true"></i>
        </div>
        <div class="column">
          <a :href="malLink" target="_blank">
            <p class="title">{{node.fields.name}}</p>
            <p class="subtitle">MAL Score: {{node.fields.malScore}}</p>
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import * as api from '../api'
export default {
  name: 'anime',
  props: ['node', 'place'],
  computed: {
    malLink() {
      return `https://myanimelist.net/anime/${this.node.fields.malId}`;
    }
  },
  subscriptions: {
    loggedIn: api.loggedIn
  }
}
</script>

<style lang="scss" scoped>
.handle {
  cursor: move;
  align-self: center;
  font-size: 30px;
  color: lightgrey;
  width: 20px;
}

.trophy {
  align-self: center;
  margin-left: 9px;
  font-size: 40px;
  .fa {
    display: block
  }
}

.place1 {
  color: gold
}

.place2 {
  color: silver
}

.place3 {
  color: #CD7F32
}
</style>
