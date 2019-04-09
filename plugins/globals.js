import Vue from 'vue'
import { host, timeAgo } from '../util/filters'

Vue.filter('host', host)
Vue.filter('timeAgo', timeAgo)
