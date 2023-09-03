import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import StudentView from "../views/StudentView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/student/:studentId",
    name: "Student",
    component: StudentView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
