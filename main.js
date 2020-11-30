import Vue from 'vue'
import App from './App'
import uView from "./components/uview-ui"; //jf
Vue.use(uView);//jf
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
