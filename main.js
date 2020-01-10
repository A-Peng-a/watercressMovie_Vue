import Vue from 'vue'
import App from './App'
import newMovie from '@/src/newMovie.js'
Vue.prototype.newMovie=newMovie
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
