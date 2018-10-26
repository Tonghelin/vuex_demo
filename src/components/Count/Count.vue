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
  </div>
</template>

<script>
import store from '@/vuex/vuex'; // 引入store

export default {
  data() {
    return {
      msg: 'Hello Store',
    };
  },
  // 引入 store
  store,
};
</script>
