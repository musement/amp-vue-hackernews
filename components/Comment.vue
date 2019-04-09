<template>
  <li class="comment">
    <amp-state :id="commentStateID">
      <script data-safe type="application/json" v-html="JSON.stringify(commentState)" />
    </amp-state>

    <div class="by">
      <router-link :to="'/user/' + item.by">
        {{ item.by }}
      </router-link>
      {{ item.time | timeAgo }} ago
    </div>
    <div class="text" v-html="item.text" />
    <div
      v-if="item.kids && item.kids.length"
      class="toggle"
      v-bind="{'[class]': `${commentStateID}.expanded ? 'toggle open' : 'toggle'`}"
    >
      <a
        v-bind="{
          on: `tap:AMP.setState({
            ${this.commentStateID}: { expanded: !${this.commentStateID}.expanded }
          })`
        }"
      >toggle replies</a>
    </div>

    <ul
      v-if="item.kids"
      hidden
      v-bind="{'[hidden]':`${this.commentStateID}.expanded == false`}"
      class="comment-children"
    >
      <amp-list
        v-for="kid in item.kids"
        :id="'comment_' + kid"
        :key="kid"
        :src="'https://hacker-news.firebaseio.com/v0/item/' + kid + '.json'"
        template="itemCommentsTpl.html"
        items="."
        single-item
        layout="responsive"
        width="100"
        height="30"
      />
    </ul>
  </li>
</template>

<script>

export default {
  name: 'Comment',
  props: ['item'],
  head() {
    return {
      script: [
        {
          hid: 'amp-bind',
          src: 'https://cdn.ampproject.org/v0/amp-bind-0.1.js',
          async: undefined,
          'data-safe': undefined,
          'custom-element': 'amp-bind'
        },
        {
          hid: 'amp-list',
          src: 'https://cdn.ampproject.org/v0/amp-list-0.1.js',
          async: undefined,
          'data-safe': undefined,
          'custom-element': 'amp-list'
        },
        {
          hid: 'amp-mustache',
          src: 'https://cdn.ampproject.org/v0/amp-mustache-0.2.js',
          async: undefined,
          'data-safe': undefined,
          'custom-template': 'amp-mustache'
        }
      ]
    }
  },
  data() {
    return {
      commentStateID: `commentState_${this.item.id}`
    }
  },
  created() {
    this.commentState = {
      expanded: false
    }
  }
}
</script>

<style lang="stylus">
.comment-children
  position relative
  .comment-children
    margin-left 1.5em

.comment
  border-top 1px solid #eee
  position relative
  .by, .text, .toggle
    font-size .9em
    margin 1em 0
  .by
    color #828282
    a
      color #828282
      text-decoration underline
  .text
    overflow-wrap break-word
    a:hover
      color #ff6600
    pre
      white-space pre-wrap
  .toggle
    background-color #fffbf2
    padding .3em .5em
    border-radius 4px
    a
      color #828282
      cursor pointer
    &.open
      padding 0
      background-color transparent
      margin-bottom -0.5em

.list-overflow[overflow]
  position absolute
  bottom 0
  left 0
  right 0
</style>
