import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import BaseLayout from "@/views/BaseLayout.vue";
import ProfileView from "@/views/ProfileView.vue";
import ActivityView from "@/views/ActivityView.vue";
import PresensiView from "@/views/presensi/PresensiView.vue";
import { useSignIn } from "@/stores/useSignIn";
import { useUser } from "@/stores/useProfile";
import IzinView from "@/views/presensi/IzinView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "base",
      redirect: "home",
      component: BaseLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/activity",
          name: "activity",
          component: ActivityView,
        },
        {
          path: "/profile",
          name: "profile",
          component: ProfileView,
        },
      ],
    },
    {
      path: "/presensi",
      name: "presensi",
      component: PresensiView,
      meta: { requiresAuth: true, alreadyPresensi: true },
    },
    {
      path: "/izin",
      name: "izin",
      component: IzinView,
      meta: { requiresAuth: true, alreadyPresensi: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = useSignIn();
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !authStore.isAuthenticated
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  const presensiStore = useUser();
  if (
    to.matched.some((record) => record.meta.alreadyPresensi) &&
    presensiStore.isAlreadyPresensi
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
