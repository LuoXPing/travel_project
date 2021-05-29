import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    /*首页*/
    {
     path: '/',
     name: 'home',
     component: Home
   },
    /*目的地*/
    {
        path: '/dest',
        name: 'dest',
        component: () => import('../views/destination.vue')
    },
    {
        path: '/destDetail',
        name: 'destDetail',
        component: () => import('../detail/destination-detail.vue')
    },
    {
        path: '/destScreen',
        name: 'destScreen',
        component: () => import('../screen/destination-screen.vue')
    },
    /*自由行*/
    {
        path: '/free',
        name: 'free',
        component: () => import('../views/freeTravel.vue')
    },
    {
        path: '/freeDetail',
        name: 'freeDetail',
        component: () => import('../detail/free-detail.vue')
    },
    {
        path: '/freeScreen',
        name: 'freeScreen',
        component: () => import('../screen/free-screen.vue')
    },
    {
        path: '/scenicDetail',
        name: 'scenicDetail',
        component: () => import('../detail/scenicDetail.vue')
    },
    /*跟团游*/
    {
        path: '/follow',
        name: 'follow',
        component: () => import('../views/followTravel.vue')
    },
    {
        path: '/followDetail',
        name: 'follow-detail',
        component: () => import('../detail/follow-detail.vue')
    },
    /*车票*/
    {
        path: '/ticket',
        name: 'ticket',
        component: () => import('../views/ticket.vue')
    }, {
        path: '/ticketDetail',
        name: 'ticketDetail',
        component: () => import('../detail/ticket-detail.vue')
    },
    /*宾馆*/
    {
        path: '/hotel',
        name: 'hotel',
        component: () => import('../views/hotel.vue')
    },
    {
        path: '/hotelDetail',
        name: 'hotelDetail',
        component: () => import('../detail/hotel-detail.vue')
    },
    {
        path: '/hotelScreen',
        name: 'hotelScreen',
        component: () => import('../screen/hotel-screen.vue')
    },
    /*旅游攻略*/
    {
        path: '/strategy',
        name: 'strategy',
        component: () => import('../views/strategy.vue')
    },
    {
        path: '/strategyDetail',
        name: 'strategyDetail',
        component: () => import('../detail/strategy-detail.vue')
    },
    /*签证*/
    {
        path: '/passport',
        name: 'passport',
        component: () => import('../views/passport.vue')
    },
    {
        path: '/passportDetail',
        name: 'passport-detail',
        component: () => import('../detail/passport-detail.vue')
    },
    /*登录*/
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/Login.vue')
    },
    /*个人中心*/
    {
        path: '/person',
        name: 'person',
        component: () => import('../pages/person.vue')
    },
    /*写游记*/
    {
        path: '/writeStrategy',
        name: 'writeStrategy',
        component: () => import('../pages/writeStrategy.vue')
    },
    /*管理系统首页*/
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../admin/AdminIndex.vue')
    },
]

const router = new VueRouter({
  //mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
