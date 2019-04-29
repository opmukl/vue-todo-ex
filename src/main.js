import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store'
import VeeValidator from 'vee-validate'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VeeValidator)
Vue.config.productionTip = false

const Todo = () => import('./components/Todo.vue')
const TodoDone = () => import('./components/TodoDone.vue')

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Todo,
      // children: [
      //   {
      //     path: 'posts',
      //     component: UserPost
      //   },
      //   {
      //     path: 'profile',
      //     component: UserProfile
      //   }
      // ]
    },
    { path: '/todoDone', component: TodoDone },
  ],
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
