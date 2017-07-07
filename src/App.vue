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
                  <a @click.prevent="goto('/')" href="/">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </a>
                </li>
                <li v-for="crumb in currentNode.breadcrumb" :key="crumb.uuid">
                  <a @click.prevent="goto(crumb.path)" :href="crumb.path">{{crumb.fields.name}}</a>
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
import * as api from './services/api'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/observable/fromEvent'

export default {
  name: 'app',
  methods: {
    login: api.login,
    goto: api.goto
  },
  components: {
    Root, Year, Season
  },
  subscriptions() {
    return {
      isRoot: api.currentNode.map(it => location.pathname === '/'),
      currentNode: api.currentNode,
      currentView: api.currentNode.map(it => this.isRoot ? 'root' : it.fields.__typename)
    }
  },
  created: function () {
    api.webroot(location.pathname)
    api.checkLoginState()
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