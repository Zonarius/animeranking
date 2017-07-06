<template>
  <div id="app">
    <div class="mycontent">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-1">Anime Ranking</h1>
            <nav v-if="!isRoot" class="breadcrumb">
              <ul v-if="currentNode">
                <li :class="{'is-active': isRoot}">
                  <a href="/">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </a>
                </li>
                <li v-for="crumb in currentNode.breadcrumb" :key="crumb.uuid">
                  <a :href="crumb.path">{{crumb.fields.name}}</a>
                </li>
                <li v-if="!isRoot" class="is-active">
                  <a>{{currentNode.fields.name}}</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <component :is="currentView" :node="currentNode"></component>
    </div>
    <footer class="footer">
      <div class="container">
        <a @click="login">Login</a>
      </div>
    </footer>
  </div>
</template>

<script>
import Root from './components/Root'
import Year from './components/Year'
import Season from './components/Season'
import { webroot, login } from './services/api'

let data = {
  loading: false,
  currentView: '',
  currentNode: undefined
}

function onlySchema(schemaName) {
  return (result) => {
    result.data.node.children.elements = result.data.node.children.elements.filter(it => it.fields.__typename === schemaName)
    return result
  }
}

export default {
  name: 'app',
  data: function () {
    return data
  },
  computed: {
    isRoot() {
      return location.pathname === '/';
    }
  },
  methods: {
    navigate: function (event) {
      event.preventDefault();
      console.log(event)
      this.loading = true;
      this.currentView = undefined;
      history.pushState(undefined, undefined, event.srcElement.pathname);
    },
    login
  },
  components: {
    Root, Year, Season
  },
  created: function () {
    this.loading = true;
    webroot(location.pathname).then(onlySchema('year')).then(node => {
      this.loading = false;
      this.currentNode = node.data.node;
      if (location.pathname === '/') {
        this.currentView = 'root'
      } else {
        this.currentView = node.data.node.fields.__typename
      }
    })
  }
}
</script>

<style lang="scss" src="bulma"></style>

<style>
@import "~font-awesome/css/font-awesome.css";
</style>

<style lang="scss" scoped>
.mycontent {
  min-height: 1080px;
}

.hero {
  margin-bottom: 10px;
}
</style>