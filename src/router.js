import Vue from 'vue';
import VueRouter from 'vue-router';
import authStore from './store/modules/auth';

Vue.use(VueRouter);

const Login = () => import('./components/Login.vue');
const Todo = () => import('./components/todo/Todo.vue');
const Memo = () => import('./components/memo/Memo.vue');

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    {
      path: '/todo',
      component: Todo,
      meta: { authRequired: true }
    },
    { path: '/memo', component: Memo, meta: { authRequired: true } },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log('every single routing is pending');
  // to: 이동할 url에 해당하는 라우팅 객체
  if (
    to.matched.some(routeInfo => {
      return routeInfo.meta.authRequired;
    })
  ) {
    if (authStore.state.userAuth) {
      next();
    } else {
      alert('로그인이 필요합니다.');
      next({ path: '/login' });
    }
  } else {
    // console.log('routing success :' + to.path);
    next();
  }
});

export default router;
