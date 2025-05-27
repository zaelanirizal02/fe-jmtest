import { createRouter, createWebHistory } from "vue-router";
import masterPath from "../views/master/master-path";
import { requireAuth } from "../utils/requireAuth";
import authLayout from "../layout/auth.vue";
import defaultLayout from "../layout/default.vue";
import dashboard from "../views/dashboard.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: defaultLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: dashboard,
      },
    ],
    beforeEnter: requireAuth,
  },
  {
    path: "/anggota",
    name: "anggota",
    component: () => import("../views/anggota/anggota.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",
    component: authLayout,
    meta: {
      // hideNavbar: true,
      // hideSidebar: true,
    },
  },

  ...masterPath,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
