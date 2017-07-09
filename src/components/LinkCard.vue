<template>
  <a @click.prevent="goto(link)" :href="link">
    <div class="card year">
      <div class="card-image">
        <figure class="image" :class="figureClass">
          <img :src="image" alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="content has-text-centered">
          <h1>
            <slot></slot>
          </h1>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import { goto } from '../api'

export default {
  name: 'LinkCard',
  props: ['link', 'image', 'figureClass'],
  methods: {
    goto() {
      if (this.link) {
        goto(this.link)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/variables.sass";
.card-image {
  background-color: $grey-lighter;
}

.card-content {
  .content {
    color: $white;
  }
}

.image img {
  display: block;
}

.image.year {
  text-align: center;
  img {
    max-height: 400px;
    width: auto;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
