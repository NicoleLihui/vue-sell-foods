import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from '../components/goods/goods';
import Ratings from '../components/ratings/ratings';
import Sellers from '../components/sellers/sellers';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: Goods
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/sellers',
    component: Sellers
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

export default router;
