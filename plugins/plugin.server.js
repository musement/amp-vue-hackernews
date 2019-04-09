import Vue from 'vue'

export default ({ req, beforeNuxtRender }, inject) => {

  inject('appConfig', new Vue({
    methods: {
      // -> app.$appConfig.get()
      // -> this.$appConfig.get() in vue components
      // -> this.$appConfig.get() in store actions/mutations
      get() {
        return req.appConfig
      }
    }
  }))
}
