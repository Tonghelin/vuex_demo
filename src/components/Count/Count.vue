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
  </div>
</template>

<script>
import store from '@/vuex/vuex'; // 引入store
import { mapState } from 'vuex'; // 方法二使用mapState

export default {
  data() {
    return {
      msg: 'Hello Store',
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
  computed: mapState(['count']),
};
</script>
