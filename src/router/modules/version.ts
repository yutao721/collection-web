const Layout = () => import("@/layout/index.vue");

export default {
  path: "/version",
  name: "Version",
  component: Layout,
  redirect: "/version/index",
  meta: {
    icon: "Monitor",
    title: "版本控制",
    rank: 10
  },
  children: [
    {
      path: "/version/index",
      name: "VersionIndex",
      component: () => import("@/views/version/index.vue"),
      meta: {
        title: "版本控制"
      }
    }
  ]
} as RouteConfigsTable;
