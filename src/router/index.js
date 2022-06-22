import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mmode:'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Sist. Enunciados | DIINF USACH',
      component: HomeView,
      nombre:'Sist. Enunciados | DIINF USACH'
    },
    {
      path: '/enunciados',
      name: 'Enunciados | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "enunciados" */ '../views/EnunciadosView.vue'),
      nombre:'Enunciados | SE'
    },
    {
      path: '/nuevoenunciado',
      name: 'Nuevo Enunciado | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "nuevoenunciado" */ '../views/AgregarEnunciadoView.vue'),
      nombre:'Enunciados | SE'
    },
    {
      path: '/revisarenunciados',
      name: 'Revisar Enunciados | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "revisarenunciados" */ '../views/RevisarEnunciadosView.vue'),
      nombre:'Revisar Enunciados | SE'
    },
    {
      path: '/area/:id1/:id2',
      name: 'Area Trabajo | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AreaTrabajo.vue'),
      nombre:'Area Trabajo | SE'
    },
    {
      path: '/entregado/:id',
      name: 'Entrega Realizada | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/EntregaView.vue'),
      nombre:'Entrega Realizada | SE'
    },

    {
      path: '/login',
      name: 'Login | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ '../views/loginView.vue'),
      nombre:'Login | SE'
    },

    {
      path: '/register',
      name: 'Registrame | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "register" */ '../views/registerView.vue'),
      nombre:'Registrame | SE'
    },

    {
      path: '/error',
      name: 'Error | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "error" */ '../views/errorView.vue'),
      nombre:'Error | SE'
    },

    {
      path: '/data',
      name: 'Datos | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "data" */ '../views/DataView.vue'),
      nombre:'Datos | SE'
    },

    {
      path: '/dataArea/:id',
      name: 'Data Area | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dataArea" */ '../views/DataAreaView.vue'),
      nombre:'Data Area | SE'
    },

    {
      path: '/quest/:id1/:id2',
      name: 'Cuestionario | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "quest" */ '../views/QuestionView.vue'),
      nombre:'Cuestionario | SE'
    },

    {
      path: '/progress',
      name: 'Mi Progreso | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "progress" */ '../views/ProgressView.vue'),
      nombre:'Mi Progreso | SE'
    },

    {
      path: '/progressArea/:id',
      name: 'Progress Area | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "progressArea" */ '../views/ProgressAreaView.vue'),
      nombre:''
    },
    {
      path: '/asignarrol',
      name: 'Asignar Roles | SE',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "asignarrol" */ '../views/AsignarRolView.vue'),
      nombre:'Asignar Roles | SE'
    },
    {
      path: '/prueba',
      name: 'prueba',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "prueba" */ '../views/PruebaView.vue')
    }
  ]
  
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router