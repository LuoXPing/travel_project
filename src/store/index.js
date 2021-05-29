import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      navigation:'0',/*首页导航条当前的显示*/
      token:'',//登陆的标志
      account:'',//当前登录的账号
      headPic:'',//头像的地址
      nickName:'',//姓名
  },
  mutations: {
    setNavigation:function(state,value){
        state.navigation = value;
    },
      setToken:function (state,token) {
          state.token = token;
      },
      setAccount:function (state,account) {
          state.account = account;
      },
      sethHeadPic:function (state,headPic) {
          state.headPic = headPic;
      },
      setNickName:function (state,nickName) {
          state.nickName = nickName;
      }
  },
  actions: {
  },
  modules: {
  }
})
