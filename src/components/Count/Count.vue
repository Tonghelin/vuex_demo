<template>
  <div id="store">
    <h1>来自Store的数据</h1>
    <p>{{msg}}</p>
    <!-- 加载store中的数据 -->
    <!--<p>{{$store.state.count}}</p>-->
    <!-- 使用模块组 -->
    <!--使用模块组如何加载数据？ 如下-->
    <p>{{$store.state.aName.count}}--{{count}}</p>
    <br>
    <button @click="$store.commit('added')">➕</button>
    <button @click="$store.commit('subtract')">➖</button>

  </div>
</template>

<script>
/* eslint-disable no-console */
import store from '@/vuex/store'; // 引入store
// 方法二使用mapState
// mapMutations 简化函数调用 @click="$store.commit('added')"
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      msg: 'Hello Store',
      randow: 1,
    };
  },
  // 引入 store
  store,
  computed: {
    ...mapState(['count']),
    // 正常写法
    // count() {
    //   return this.$store.getters.count;
    // },

    // 使用mapGetters
    ...mapGetters(['count']),
  },
  updated() { // 数据更新才会调用（数据发生改变）
    this.randow = Math.floor(Math.random() * 10) + 1;
  },
  // 配置一下，这时就可以将 @click="$store.commit('added')" 替换成 added
  // methods: mapMutations(['added', 'added2']),
  // 同样的使用...扩展一下methods
  methods: {
    ...mapMutations(['added', 'added2']),
    ...mapActions(['addAction', 'reduceAction']),
  },
};
</script>
