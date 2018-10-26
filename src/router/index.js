import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Count from '@/components/Count/Count';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default: HelloWorld,
        Count,
      },
    }, {
      path: '/Count',
      name: 'Count',
      component: Count,
    },
  ],
});
