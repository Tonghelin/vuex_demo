import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 1,
};

const mutations = { // 要改变state状态 中的数据 必须通过mutations 来改变
  added() {
    state.count += 1;
  },
  subtract() {
    state.count -= 1;
  },
};

export default new Vuex.Store({
  state,
  mutations, // 暴露出 mutations
});
