// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store.js';

/* eslint-disable no-new */
new Vue({
	store,
	router,
	template: '<App>',
	components: {App}
}).$mount('#app');

let indexScrollTop = 0;
router.beforeEach((route, redirect, next) => {
	if (route.path !== '/') {
		indexScrollTop = document.body.scrollTop;
	}
	document.title = route.meta.title || document.title;
	next();
});

router.afterEach(route => {
	if (route.path !== '/') {
		document.body.scrollTop = 0;
	} else {
		Vue.nextTick(() => {
			document.body.scrollTop = indexScrollTop;
		});
	}
});
