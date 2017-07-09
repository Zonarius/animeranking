<template>
  <div class="field is-grouped">
    <p class="control is-expanded" :class="{'is-loading': loading}">
      <v-autocomplete :items="suggestions" v-model="item" :get-label="getLabel" :auto-select-one-item="false" :component-item='template' @change="updateItems" placeholder="Suche..." input-class="input" :disabled="loading" @item-selected="add">
      </v-autocomplete>
    </p>
  </div>
</template>

<script>
import * as api from '../api'
import template from './AnimeSuggestion'

function anime(mal, parentNode) {
  return {
    language: 'en',
    parentNode: { uuid: parentNode.uuid },
    schema: { name: 'anime' },
    fields: {
      name: mal.name,
      thumbnailUrl: mal.thumbnail_url,
      malId: String(mal.id),
      malScore: mal.payload.score
    }
  }
}

function reference(node) {
  return {
    microschema: { name: 'reference' },
    fields: {
      reference: { uuid: node.uuid }
    }
  }
}

export default {

  name: 'addAnime',
  props: ['parentNode'],
  data() {
    return {
      item: undefined,
      suggestions: [],
      template,
      loading: false,
      value: undefined
    }
  },
  methods: {
    getLabel(item) {
      return item.name
    },
    updateItems(text) {
      if (text.length >= 1) {
        api.searchAnime(text).then((response) => {
          this.suggestions = response
        }).catch(api.catchCancel)
      }
    },
    add(item) {
      this.loading = true
      api.createNode(anime(item, this.parentNode)).then(node => {
        this.parentNode.fields.anime.push(reference(node))
        return api.save(this.parentNode)
      }).then(it => {
        this.parentNode.version = it.version
        this.loading = false
        this.item = undefined
        this.suggestions = []
      })
    }
  }
}
</script>

<style lang="scss">
.v-autocomplete .v-autocomplete-list {
  position: static;
}
</style>
