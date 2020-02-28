
const User = {
  template: '<div>User</div>'
}
export default [
  {
    path: '/editor',
    name: 'editor',
    meta: {
      title: '页面编辑器'
    },
    component: User
  },
//   {
//     path: '/preview',
//     name: 'preview',
//     meta: {
//       title: '预览'
//     },
//     component: () => import('../view/preview.vue')
//   }
]