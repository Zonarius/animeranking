<template>
  <footer class="footer">
    <div class="container">
      <div v-if="!loggedIn">
        <h3 class="title">Login</h3>
        <form @submit.prevent="login" class="login">
          <div class="field">
            <p class="control">
              <input v-model="username" class="input" type="text" placeholder="Username">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input v-model="password" class="input" type="password" placeholder="Password">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-primary">Submit</button>
            </p>
          </div>
        </form>
      </div>
      <div v-else>
        Eingeloggt als {{currentUser.username}}
      </div>
    </div>
  </footer>
</template>

<script>
import * as api from '../api.js'
export default {
  name: 'myfooter',
  data() {
    return {
      username: undefined,
      password: undefined
    }
  },
  methods: {
    login() {
      api.login(this.username, this.password)
    }
  },
  subscriptions: {
    loggedIn: api.loggedIn,
    currentUser: api.currentUser
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
@media screen and (min-width: $tablet) {
  .login {
    max-width: 300px
  }
}
</style>
