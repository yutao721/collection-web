const Layout = () => import("@/layout/index.vue");

export default {
  path: "/host",
  name: "Host",
  component: Layout,
  redirect: "/host/dev",
  meta: {
    icon: "Monitor",
    title: "域名集合",
    rank: 10
  },
  children: [
    {
      path: "/host/dev",
      name: "HostDev",
      component: () => import("@/views/hostCollection/devHost.vue"),
      meta: {
        title: "域名集合"
      }
    }
  ]
} as RouteConfigsTable;
