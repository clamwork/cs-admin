import Vue from 'vue';
import Vuex, { ActionTree, MutationTree } from 'vuex';

import { success, error } from '../utils/response';
import service from '../api';

Vue.use(Vuex);

interface State {
  login: boolean;
  postUser: boolean;
  postOption: boolean;
  user: StoreState.User;
}

const state: State = {
  login: false,
  postUser: false,
  postOption: false,
  user: {
    _id: '',
    name: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    slogan: '',
    gravatar: '',
  },
};

const actions: ActionTree<State, any> = {
  // 登录
  async login(
    { commit },
    user: StoreState.Login,
  ): Promise<Ajax.AjaxResponse> {
    commit('USER_LOGINING');
    const  res: Ajax.AjaxResponse = await service.login({...user});
    if (res && res.code === 1) {
      window.localStorage.setItem('TOKEN', JSON.stringify(res.data));
      success('登录成功');
    } else {
      error(res.message);
    }
    commit('USER_LOGINING_FINAL');
    return res;
  },
};

const mutations: MutationTree<State> = {
  // 'USER_LOGINING' (state: State): void {
  //   state.login = true
  // },
  //
  // 'USER_LOGINING_FINAL' (state: State): void {
  //   state.login = false
  // },
  //
  // 'USER_INFO' (state: State, user: StoreState.User): void {
  //   state.user = user;
  // },
  //
  // 'POST_USER_INFO' (state: State): void {
  //   state.postUser = true;
  // },
  //
  // 'POST_USER_FINAL' (state: State): void {
  //   state.postUser = false;
  // },
  //
  // 'POST_OPTION_INFO' (state: State): void {
  //   state.postOption = true;
  // },
  //
  // 'POST_OPTION_FINAL' (state: State): void {
  //   state.postOption = false;
  // },

  // 'OPTION_INFO' (state: State, option: StoreState.Option): void {
  //   state.option = option
  // },

  // 'QN_TOKEN' (state: State, token: string): void {
  //   state.QNtoken = token
  // }
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
  },
});
