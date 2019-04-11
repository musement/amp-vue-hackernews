<template>
  <div id="app">
    <amp-install-serviceworker src="/sw.js" data-iframe-src="install-sw.html" layout="nodisplay" />
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <amp-img
            layout="fixed"
            height="24px"
            width="24px"
            class="logo"
            src="/ampproject-official.svg"
            alt="logo"
          />
        </router-link>
        <router-link to="/top">
          Top
        </router-link>
        <router-link to="/new">
          New
        </router-link>
        <router-link to="/show">
          Show
        </router-link>
        <router-link to="/ask">
          Ask
        </router-link>
        <router-link to="/job">
          Jobs
        </router-link>
        <a
          class="github"
          href="https://github.com/musement/amp-vue-hackernews"
          target="_blank"
          rel="noopener"
        >AMP version generated with Nuxt & Vue.js</a>
      </nav>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        amp: undefined, // "amp" has no value
        lang: 'en'
      },
      meta: [
        {
          name: 'description',
          content: 'Hacker News reader progressive web app made with AMP, Nuxt.js and Vue.js'
        }
      ],
      script: [
        {
          'data-safe': undefined,
          async: undefined,
          src: 'https://cdn.ampproject.org/v0.js'
        },
        {
          'data-safe': undefined,
          async: undefined,
          'custom-element': 'amp-install-serviceworker',
          src: 'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js'
        }
      ],
      link: [
        { rel: 'canonical', href: this.$appConfig.get().absPath }
        // uncomment line below if AMP and canonical page are different
        // { rel: 'amphtml', href: this.$appConfig.get().absPath }
      ]
    }
  }
}
</script>

<style lang="stylus">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  padding-top: 55px;
  color: #34495e;
  overflow-y: scroll;
}

a {
  color: #34495e;
  text-decoration: none;
}

.header {
  background-color: white;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;
  }

  a {
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: 0.075em;
    margin-right: 1.8em;

    &:hover {
      color: gray;
    }

    &.router-link-active {
      color: #fff;
      font-weight: 400;
    }

    &:nth-child(6) {
      margin-right: 0;
    }
  }

  .github {
    font-size: 0.9em;
    margin: 0;
    float: right;
  }
}

.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.view {
  max-width: 960px;
  margin: 20px auto;
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}

@media (max-width: 720px) {
  .header {
    .github {
      display: none;
    }
  }
}

@media (max-width: 600px) {
  .header {
    .inner {
      padding: 15px;
    }

    a {
      margin-right: 1em;
    }
  }
}
</style>
