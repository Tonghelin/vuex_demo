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
  added2(randow, randow2) {
    state.count += randow2;
    console.log(randow);
    console.log(randow2);
  },
};

const getters = { // 声明完要方到Vuex.Store 里面暴露出去
  count() {
    state.count += 100;
    console.log('state.count', state.count);
    return state.count;
  },
};

export default new Vuex.Store({
  state,
  mutations, // 暴露出 mutations
  getters,
});
