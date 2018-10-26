<template>
  <div id="store">
    <h1>来自Store的数据</h1>
    <p>{{msg}}</p>
    <!-- 加载store中的数据 -->
    <p>{{$store.state.count}}</p>
    <br>
    <!-- 调用store中的方法 $store.commit('name') -->
    <button @click="$store.commit('added')">➕</button>
    <button @click="$store.commit('subtract')">➖</button>

    <hr>
    <h1>state访问状态对象</h1>
    <p>{{$store.state.count}}---{{count}}</p>

    <hr>
    <!-- 传递参数： @click="$store.commit('added',param1，param2)"---第一个是函数名，第二个开始是参数 -->
    <button @click="$store.commit('added2',randow)">➕</button>

    <hr>
    <h2>使用mapMutations方法简化函数调用</h2>
    <p>将 @click="$store.commit('added')" 替换成 added</p>
    <!-- @click="added2(randow)" 这时接收的第一个就是参数-->
    <button @click="added2(randow)">added2</button>

    <hr>
    // 2
    <h1>actions异步修改状态</h1>
    <button @click="addAction(randow)">addAction</button>
    <button @click="reduceAction(randow)">reduceAction</button>
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
      randow: 1, // 初始值不为0，保证数据更新
    };
  },
  // 引入 store
  store,
  // 【state访问状态对象】--- 方法一
  // computed: {
  //   count() {
  //     return this.$store.state.count;
  //   },
  // },
  // 【state访问状态对象】--- 方法二 使用mapState --- {}
  // computed: mapState({
  //   count: state => state.count,
  // }),
  // 【state访问状态对象】--- 方法三 使用mapState --- []
  // computed: mapState(['count']), // ---使用 ES6的扩展运算符 ... 没错就是三个点
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
