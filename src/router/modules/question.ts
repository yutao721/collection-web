const Layout = () => import("@/layout/index.vue");

export default {
  path: "/question",
  name: "Question",
  component: Layout,
  redirect: "/question/index",
  meta: {
    icon: "Question",
    title: "问题反馈",
    rank: 11
  },
  children: [
    {
      path: "/question/index",
      name: "QuestionIndex",
      component: () => import("@/views/question/index.vue"),
      meta: {
        title: "问题反馈"
      }
    }
  ]
} as RouteConfigsTable;
