<template>
  <div class="view">
    <div class="item-view-header">
      <h1>Seems you're device is offline</h1>
      <p>If you're feeling lucky, try the lottery</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Offline'
}
</script>

<style lang="stylus">
.item-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
</style>
