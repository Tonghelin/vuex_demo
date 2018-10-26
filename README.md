# vuex_demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 使用Vuex

> vuex是一个专门为vue.js设计的集中式状态管理架构。状态？我把它理解为在data中的属性需要共享给其他vue组件使用的部分，就叫做状态。简单的说就是data中需要共用的属性。比如：我们有几个页面要显示用户名称和用户等级，或者显示用户的地理位置。如果我们不把这些属性设置为状态，那每个页面遇到后，都会到服务器进行查找计算，返回后再显示。在中大型项目中会有很多共用的数据，所以尤大神给我们提供了vuex。

> npm install vuex --save
> import Vuex from 'vuex';

# 初试牛刀---一个小demo

```
  // 配置 store
  import Vue from 'vue';
  import Vuex from 'vuex'; // 1
  
  Vue.use(Vuex);
  
  const state = { // 2
    count: 1,
  };
  
  const mutations = { // 3. 要改变state状态 中的数据 必须通过mutations 来改变
    added() {
      state.count += 1;
    },
    subtract() {
      state.count -= 1;
    },
  };
  
  export default new Vuex.Store({
    state,
    mutations, // 4. 暴露出 mutations
  });

```

``` 
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
  </template>
  
  <script>
  import store from '@/vuex/vuex'; // 1. 引入store
  
  export default {
    data() {
      return {
        msg: 'Hello Store',
      };
    },
    // 2. 引入 store
    store,
  };
  </script>

```
#### 如何调用方法？$store.commit('name') 注意方法名要加引号
* @click="$store.commit('added')" 
