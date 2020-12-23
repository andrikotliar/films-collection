import Vue from 'vue'
import App from './App.vue'
import store from './store';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 }
	}
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
