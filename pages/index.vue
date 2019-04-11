<template>
  <div id="app" class="view">
    <amp-live-list id="top-items" data-poll-interval="15000" data-max-items-per-page="30">
      <!-- pagination is optional -->
      <div class="news-list-nav" pagination>
        <span v-if="currentPage > 1">
          <a :href="prevPageLink" title="go to previous page">prev</a>
        </span>
        <span>{{ currentPage }} / {{ pages }}</span>
        <span v-if="currentPage < pages">
          <a :href="nextPageLink" title="go to next page">next</a>
        </span>
      </div>
      <button update on="tap:top-items.update" class="update_list">
        You have updates!
      </button>
      <ul items class="items">
        <item
          v-for="(item) in displayItems"
          :key="item.id"
          :item="item"
        />
      </ul>
    </amp-live-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Item from '../components/Item'

export default {
  components: {
    Item
  },
  head() {
    return {
      script: [
        {
          'data-safe': undefined,
          'custom-element': 'amp-live-list',
          async: undefined,
          src: 'https://cdn.ampproject.org/v0/amp-live-list-0.1.js'
        }
      ]
    }
  },
  async fetch({ store, params }) {
    const { section, page } = params
    await Promise.all([
      store.dispatch('section/getItems', { section, page })
    ])
  },
  computed: {
    ...mapGetters('section', [
      'items',
      'pages',
      'currentPage',
      'prevPageLink',
      'nextPageLink'
    ]),
    displayItems() {
      // sometimes item can be null...
      return this.items.filter(item => !!item)
    }
  }
}
</script>

<style lang="stylus">
.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  background-color #1c79c0
  color white
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
    color white
  .disabled
    color #ccc
.items
  margin 70px auto
  width 100%
  max-width 960px
  padding 0
button.update_list
  position fixed
  right 10px
  top 62px
  color #1c79c0
  background-color white
  border none
  border-radius 2px
  width 245px
  height 35px
  font-size 16px
  font-weight bold
  cursor pointer
  box-shadow 0 1px 2px rgba(0,0,0,0.1)
</style>
