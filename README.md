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

# 一、初试牛刀---一个小demo

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

# 二、state访问状态对象

1. 使用 computed  
2. 使用 mapState --- {}  
3. 使用mapState --- []  

```
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

```

# 三、Mutations 修改状态


* 接收参数
```
  const mutations = { // 要改变state状态 中的数据 必须通过mutations 来改变
    added() {
      state.count += 1;
    },
    subtract() {
      state.count -= 1;
    },
    added2(randow, randow2) {
      state.count += randow2;
      console.log(randow); // 第一个是方法对象，
      console.log(randow2); // 第二个起是参数
    },
  };
```

* 传递参数

``` 
  //  @click="$store.commit('added2',randow)"
  // commit 接收的第一个参数是 函数名，第二个开始是参数
  <button @click="$store.commit('added2',randow)">➕</button>

```

* mapMutations

@click="$store.commit('added2',randow)" 方法调用修改（简化成added2）

``` 
  /* eslint-disable no-console */
  import store from '@/vuex/vuex'; // 引入store
  // 方法二使用mapState
  // mapMutations 简化函数调用  1. 引入mapMutations
  @click="$store.commit('added')"
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    data() {
      return {
        msg: 'Hello Store',
        randow: 1, // 初始值不为0，保证数据更新
      };
    },
    // 引入 store
    store,
    computed: mapState(['count']),
    updated() { // 数据更新才会调用（数据发生改变）
      this.randow = Math.floor(Math.random() * 10) + 1;
    },
    methods: mapMutations(['added', 'added2']), // 2. 配置一下，这时就可以将 @click="$store.commit('added')" 替换成 added
  };
```

``` 
    <h2>使用mapMutations方法简化函数调用</h2>
    <p>将 @click="$store.commit('added')" 替换成 added</p>
    <!-- @click="added2(randow)" 这时接收的第一个就是参数-->
    <button @click="added2(randow)">added2</button>
```



