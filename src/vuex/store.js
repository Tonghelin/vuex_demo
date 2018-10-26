/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = { // 状态声明
  count: 1,
};

const mutations = { // 要改变state状态 中的数据 必须通过mutations 来改变
  added() {
    state.count += 1;
  },
  subtract() {
    state.count -= 1;
  },
  reduce() {
    state.count -= 1;
  },
  added2(randow, randow2) {
    state.count += randow2;
    console.log(randow);
    console.log(randow2);
  },
  added3(randow, num) {
    state.count += num;
  },
};

const getters = { // 声明完要方到Vuex.Store 里面暴露出去
  count() {
    state.count += 100;
    console.log('state.count', state.count);
    return state.count;
  },
};

const actions = {
  // actions 可以调用mutations里面的方法
  addAction(context) { // 传入一个参数，上下文对象
    context.commit('added3', 1000);
  },
  reduceAction({ commit }) { // 不同的方法，这使用包装起来的commit对象
    commit('reduce');
  },
};

// module 模块组
const moduleA = {
  state,
  mutations, // 暴露出 mutations
  getters,
  actions,
};

// 使用module模块组之前的Vuex.Store
// export default new Vuex.Store({
//   state,
//   mutations, // 暴露出 mutations
//   getters,
//   actions,
// });

// 使用module模块组之后的Vuex.Store
export default new Vuex.Store({
  modules: {
    aName: moduleA,
  },
});

