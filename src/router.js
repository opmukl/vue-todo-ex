import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Login = () => import('./components/Login.vue');
const Todo = () => import('./components/todo/Todo.vue');
const Memo = () => import('./components/memo/Memo.vue');
// const Login = {
//   template: '<p>Login Component</p>',
//   beforeRouteEnter(to, from, next) {
//     // Login 컴포넌트가 화면에 표시되기 전에 수행될 로직
//     // Login 컴포넌트는 아직 생성되지 않은 시점
//   },
//   beforeRouteUpdate(to, from, next) {
//     // 화면에 표시된 컴포넌트가 변경될 때 수행될 로직
//     // `this`로 Login 컴포넌트를 접근할 수 있음
//   },
//   beforeRouteLeave(to, from, next) {
//     // Login 컴포넌트를 화면에 표시한 url 값이 변경되기 직전의 로직
//     // `this`로 Login 컴포넌트를 접근할 수 있음
//   }
// };

// const requireAuth = () => (from, to, next) => {
//   const isAuthenticated = true;
//   if (isAuthenticated) return next();
//   next('/login?returnPath=me');
// };

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    // beforeEnter에서 인증정보가 없을 경우 로그인 화면으로 리다이렉트
    // { path: '/todo', component: Todo, beforeEnter: requireAuth },
    // { path: '/memo', component: Memo, beforeEnter: requireAuth }
    { path: '/todo', component: Todo, meta: { authRequired: true } },
    { path: '/memo', component: Memo, meta: { authRequired: true } }
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
    alert('로그인 해주세요!');
    next({ path: '/login' }); // 페이지 전환
  } else {
    console.log('routing success :' + to.path);
    next(); // 페이지 전환
  }
});
export default router;
