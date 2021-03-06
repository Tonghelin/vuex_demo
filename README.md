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

* 参考
> [技术胖的vuex视频教程](http://jspang.com/post/vuex.html)  
> [Axios](https://www.jianshu.com/p/df464b26ae58)尤大神推荐   

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

# 四、getters计算过滤操作
  
  对比computed

  getters从表面是获得的意思，可以把他看作在获取数据之前进行的一种再编辑,相当于对数据的一个过滤和加工。你可以把它看作store.js的计算属性。
  

* getters基本用法：

比如我们现在要对store.js文件中的count进行一个计算属性的操作，就是在它输出前，给它加上100.

我们首先要在store.js里用const声明我们的getters属性。
``` 
const getters = {
    count:function(state){
        return state.count +=100;
    }
}
``` 
写好了gettters之后，我们还需要在Vuex.Store()里引入，由于之前我们已经引入了state盒mutations，所以引入里有三个引入属性。代码如下，
``` 
export default new Vuex.Store({
    state,
    mutations,
    getters
})
``` 
在store.js里的配置算是完成了，我们需要到模板页对computed进行配置。在vue 的构造器里边只能有一个computed属性，如果你写多个，只有最后一个computed属性可用，所以要将存在的computed属性进行一个改造。改造时我们使用ES6中的展开运算符”…”。

``` 
computed:{
    ...mapState(["count"]),
    count(){
        return this.$store.getters.count;
    }
},
``` 

需要注意的是，你写了这个配置后，在每次count 的值发生变化的时候，都会进行加100的操作。

用mapGetters简化模板写法：⚠️ 推荐

我们都知道state和mutations都有map的引用方法把我们模板中的编码进行简化，我们的getters也是有的，我们来看一下代码。

首先用import引入我们的`mapGetters

``` 
import { mapState,mapMutations,mapGetters } from 'vuex';
```

在computed属性中加入mapGetters

```
computed: {
    ...mapState(['count']),
    // 正常写法
    // count() {
    //   return this.$store.getters.count;
    // },

    // 改使用mapGetters
    ...mapGetters(['count']),
  },

```

# 5、actions异步修改状态

> 前面学的Mutations 修改状态是同步的

actions和之前讲的Mutations功能基本一样，不同点是，actions是异步的改变state状态，而Mutations是同步改变状态。

首先 store.js
``` 
  const actions = {
    // actions 可以调用mutations里面的方法
    addAction(context) { // 传入一个参数，上下文对象
      context.commit('added3', 1000);
    },
    reduceAction({ commit }) { // 不同的方法，这使用包装起来的commit对象
      commit('reduce');
    },
  };
  export default new Vuex.Store({
    state,
    mutations, // 暴露出 mutations
    getters,
    actions,
  });
```

然后

```
  methods: {
    ...mapMutations(['added', 'added2']),
    ...mapActions(['addAction', 'reduceAction']),
  },
```

# module 模块组  

> 非大型项目不建议使用模块组

随着项目的复杂性增加，我们共享的状态越来越多，这时候我们就需要把我们状态的各种操作进行一个分组，分组后再进行按组编写。

* 声明模块组：

在vuex/store.js中声明模块组，我们还是用我们的const常量的方法声明模块组。代码如下：

``` 
  const moduleA={
      state,mutations,getters,actions
  }
```
* 声明好后，我们需要修改原来 Vuex.Stroe里的值：

``` 
  export default new Vuex.Store({
      modules:{a:moduleA}
  })
```

* 在模板中使用 现在我们要在模板中使用count状态，要用插值的形式写入。
``` 
  <h3>{{$store.state.a.count}}</h3>
```

