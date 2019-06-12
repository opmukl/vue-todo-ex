import Vue from 'vue';
import VueRouter from 'vue-router';
import authStore from './store/modules/auth';

Vue.use(VueRouter);

const Login = () => import('./components/Login.vue');
const Todo = () => import('./components/todo/Todo.vue');
const Memo = () => import('./components/memo/Memo.vue');

// const requireAuth = () => (from, to, next) => {
//   // const isAuthenticated = false;
//   // if (isAuthenticated) return next();
//   alert('로그인이 필요합니다.');
//   next({ path: '/login' }); // 페이지 전환
// };

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    // beforeEnter에서 인증정보가 없을 경우 로그인 화면으로 리다이렉트
    // { path: '/todo', component: Todo, beforeEnter: requireAuth },
    // { path: '/memo', component: Memo, beforeEnter: requireAuth }
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
      next({ path: '/login' }); // 페이지 전환
    }
  } else {
    console.log('routing success :' + to.path);
    next(); // 페이지 전환
  }
});

export default router;
