import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Todo = () => import("./components/todo/Todo.vue");
const Memo = () => import("./components/memo/Memo.vue");

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/todo"
    },
    { path: "/todo", component: Todo },
    { path: "/memo", component: Memo }
  ]
});

export default router;
