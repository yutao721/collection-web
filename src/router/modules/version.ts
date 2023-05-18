const Layout = () => import("@/layout/index.vue");

export default {
  path: "/version",
  name: "Version",
  component: Layout,
  redirect: "/version/index",
  meta: {
    icon: "Monitor",
    title: "需求用例",
    rank: 9
  },
  children: [
    {
      path: "/version/index",
      name: "VersionIndex",
      component: () => import("@/views/version/index.vue"),
      meta: {
        title: "需求用例"
      }
    }
  ]
} as RouteConfigsTable;
