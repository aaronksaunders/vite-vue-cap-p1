import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { currentUser } from './services/firebase-service';
import TabRootVue from './views/Tabs/TabRoot.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/signup',
    component: () => import('./views/Auth/SignUpPage.vue'),
  },
  {
    path: '/signin',
    component: () => import('./views/Auth/SignInPage.vue'),
  },
  {
    path: '/',
    component: TabRootVue,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('./views/Tabs/HomePage.vue'),
      },
      {
        path: 'search',
        component: () => import('./views/Tabs/SearchPage.vue'),
      },
    ],
    meta : {
      requiresAuth : true
    }
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

router.beforeEach((to)=> {
  console.debug(to,currentUser.value);
  if (to.meta.requiresAuth && !currentUser.value) {
    return  {
      path : '/signin'
    }
  }
})

export default router;