const HN_FIREBASE_BASEURL = 'https://hacker-news.firebaseio.com/v0/'
const HN_ITEM_URL = HN_FIREBASE_BASEURL + 'item/'
const HN_USER_URL = HN_FIREBASE_BASEURL + 'user/'
const ITEMS_PER_PAGE = 30
const SET_ITEMS = 'SET_ITEMS'
const SET_ITEM = 'SET_ITEM'
const SET_PAGES = 'SET_PAGES'
const SET_USER = 'SET_USER'

export const state = () => ({
  items: [],
  pages: 0,
  currentPage: 0,
  prevPageLink: '',
  nextPageLink: '',
  item: {},
  user: false
})

export const getters = {
  items: state => state.items,
  pages: state => state.pages,
  currentPage: state => state.currentPage,
  prevPageLink: state => state.prevPageLink,
  nextPageLink: state => state.nextPageLink,
  item: state => state.item,
  user: state => state.user
}

export const actions = {
  async getItems({ commit }, { section, page }) {
    // defaults
    section = section || 'top'
    page = Number(page) || 1
    // API call to get Top stories ids
    const ids = await this.$axios.$get(`${HN_FIREBASE_BASEURL}${section}stories.json`)
    const start = page > 1 ? ITEMS_PER_PAGE * (page - 1) : 0
    const end = start + ITEMS_PER_PAGE
    const pageIds = ids.slice(start, end)
    const items = await Promise.all(pageIds.map(id => this.$axios.$get(`${HN_ITEM_URL}${id}.json`)))
    commit(SET_PAGES, {
      pages: ids.length > ITEMS_PER_PAGE ? Math.round(ids.length / ITEMS_PER_PAGE) : 1,
      currentPage: page,
      prevPageLink: `/${section}/${page - 1}`,
      nextPageLink: `/${section}/${page + 1}`
    })
    commit(SET_ITEMS, items)
  },
  async getItemWithComments({ commit }, id) {
    const item = await this.$axios.$get(`${HN_ITEM_URL}${id}.json`)
    item.comments = []
    if (item.kids) {
      item.comments = await Promise.all(
        item.kids.map(id => this.$axios.$get(`${HN_ITEM_URL}${id}.json`))
      )
    }
    commit(SET_ITEM, item)
  },
  async getUser({ commit }, id) {
    const user = await this.$axios.$get(`${HN_USER_URL}${id}.json`)
    commit(SET_USER, user)
  }
}

export const mutations = {
  [SET_ITEMS]: (state, items) => {
    state.items = items
  },
  [SET_PAGES]: (state, payload) => {
    const { pages, currentPage, prevPageLink, nextPageLink } = payload
    state.pages = pages
    state.currentPage = currentPage
    state.prevPageLink = prevPageLink
    state.nextPageLink = nextPageLink
  },
  [SET_ITEM]: (state, item) => {
    state.item = item
  },
  [SET_USER]: (state, user) => {
    state.user = user
  }
}
