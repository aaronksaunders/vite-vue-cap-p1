import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { getCurrentUser } from "vuefire";
import TabRootVue from "./views/Tabs/TabRoot.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: () => import("./views/Auth/LoginPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("./views/Auth/SignUpPage.vue"),
  },
  {
    path: "/teams",
    component: () => import("./views/Teams/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/players",
    component: () => import("./views/Players/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/players/:playerId",
    component: () => import("./views/Players/PlayerPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    component: TabRootVue,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        component: () => import("./views/Tabs/HomePage.vue"),
      },
      {
        path: "search",
        component: () => import("./views/Tabs/SearchPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: "/login",
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirect || '/')`
          redirect: to.fullPath,
        },
      };
    }
  }
});

export default router;
