const routes = [
  // {
  //   path: "/",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [
  //     { path: "", component: () => import("components/LoginComponent.vue") },
  //   ],
  //   // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/login",
    component: () => import("components/LoginComponent.vue"),
  },
  {
    path: "/forgot-password",
    component: () => import("components/ForgotPasswordComponent.vue"),
  },
  {
    path: "/verify-code",
    component: () => import("components/VerifyCodeComponent.vue"),
  },
  {
    path: "/",
    component: () => import("components/LoginComponent.vue"),
  },
];

export default routes;
