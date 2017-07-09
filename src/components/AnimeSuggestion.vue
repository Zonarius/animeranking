<template>
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img :src="item.thumbnail_url">
      </p>
    </figure>
    <div class="media-content">
      <div class="columns is-mobile">
        <div class="column">
          <p class="title">
            {{item.name}}
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scoped>
article {
  margin-top: 7px;
  margin-left: 15px;
  &:hover {
    background-color: whitesmoke;
  }
}
</style>
