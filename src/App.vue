<template>
  <div id="app">
    <!--顶部导航栏目-->
    <div class="header clearfix" >
      <div class="headerContent" @mouseleave="menudisplay=false">
        <div class="logo">
          <img src="./assets/logo.png" alt="">
        </div>
        <ul class="menu" >
          <li v-for="(item,index) in navigateMenu" :key="index"
              @click="handleNavigate(index)" @mouseenter="handleCont(index)"
          >
            <router-link :to="item.link" :class="{link:true,active:index==nowFocus}">
              {{item.menu}}
              <a-icon type="caret-down" class='icon-before' style="color: #666; font-size: 13px" v-show="index==3"/>
              <a-icon type="caret-up" class="icon-after" v-show="index==3"/>
            </router-link>
          </li>
        </ul>
        <!--去旅游下拉菜单-->
        <ul class="travel-content" v-show="menudisplay">
          <li @click="handleMenu">
            <router-link to="/free" class="word">自由行</router-link>
          </li>
          <li @click="handleMenu">
            <router-link to="/follow" class="word">跟团游</router-link>
          </li>
          <li @click="handleMenu">
            <router-link to="/passport" class="word">签证</router-link>
          </li>
        </ul>
        <div class="login" @mouseleave="personMenuDisp=false">
          <!--已经登录时显示-->
          <span v-if="token" class="alreadyLogin" @mouseenter="personMenuDisp=true">
            <img :src="headPic" alt="">
            <a-icon type="down"  class="down-icon"/>
          </span>
          <!--未登录时显示-->
          <span v-else class="noLogin">
            <span @click="gotoLogin('index')">登录</span>|
            <span @click="gotoLogin('regist')">注册</span>
          </span>
          <!--登陆时显示的下拉菜单-->
          <ul class="loginMenu" v-show="personMenuDisp">
            <li class="item" @click="gotoPerson('/person',1)">
              <span class="iconfont icon-home"></span>我的空间
            </li>
            <li class="item" @click="gotoPerson('/person',2)">
              <span class="iconfont icon-write"></span>我的游记
            </li>
            <li class="item" @click="gotoPerson('/person',3)">
              <span class="iconfont icon-free-route"></span>我的足迹
            </li>
            <li class="item" @click="gotoPerson('/person',4)">
              <span class="iconfont icon-order"></span>我的订单
            </li>
            <li class="item" @click="gotoPerson('/person',0)">
              <span class="iconfont icon-setUp"></span>设置
            </li>
            <li class="item" @click="outLogin">
              <span class="iconfont icon-out"></span>退出
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content"></div>
    <a-back-top />
    <router-view></router-view>
  </div>
</template>
<script>
    export default {
        data(){
            return {
                /*导航栏的内容，已经相应跳转链接*/
                navigateMenu:[
                    {menu:'首页',link:'/'},{menu:'目的地',link:'/dest'},
                    {menu:'旅游攻略',link:'/strategy'},{menu:'去旅行',link:'/free'},
                    {menu:'火车票机票',link:'/ticket'},{menu:'订酒店',link:'/hotel'}
                ],
                /*是否显示去旅游的下来菜单*/
                menudisplay:false,
                /*是否显示个人中心菜单*/
                personMenuDisp:false,

            }
        },
        computed:{
            /*当前显示导航栏的第几个--*/
            nowFocus:function () {
                return this.$store.state.navigation;
            },
            /*初始化是否登录的标志*/
            token:function(){
                return this.$store.state.token;
            },
            account:function(){
                return this.$store.state.account;
            },
            headPic:function () {//用户头像地址
                return this.$store.state.headPic;
            }
        },
        methods: {
            /*跳转到登录页，id为选项：登录或者注册*/
            gotoLogin(id){
                this.$router.push({
                    path: '/login',
                    query:{
                        id:id
                    }
                });
            },
            /*下拉菜单的显示---用于改变标题样式*/
            handleCont(index){
                this.menudisplay = index==3?true:false
            },
            handleMenu(){
                this.$store.commit('setNavigation',3);//当点击旅游下拉菜单中的一个时
                this.menudisplay=false;/*显示下拉菜单*/
            },
            /*改变导航栏的样式，改变全局变量。index：当前第几个*/
            handleNavigate(index){
                this.$store.commit('setNavigation',index);
            },
            /*退出登录*/
            outLogin(){
                this.$https.post('user/quit',
                    {account:this.$store.state.account}).then( res => {
                    if(res.body.success){
                        this.$store.commit('setToken',null);
                        this.personMenuDisp = false;
                    }
                })

            },
            /*跳转到个人中心*/
            gotoPerson(path,param){
                this.$router.push({
                    path: path,
                    query:{
                        navIndex:param,
                    }
                });
            }
        },
        created(){
            /*刷新后，显示首页---*/
            this.$router.push( '/');
        }
    };
</script>

<style  lang="scss">
  #app{
    width: 100%;
    height: 100%;
    .headerContent {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-wrap: nowrap;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      min-width: 1000px;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      z-index: 5;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
      .logo {
        flex: 1;
        text-align: right;
        img {
          width: 100%;
          height: 99%;
          vertical-align: top;
        }
      }
      .menu {
        flex: 8;
        display: flex;
        height: 100%;
        text-align: center;
        li {
          flex: 1;
          list-style: none;

          .icon-after {
            display: none;
          }
          &:hover {
            border-left: 1px solid #eaeaea;
            border-right: 1px solid #eaeaea;
            border-bottom: 1px solid #4b61c1;
            .icon-before {
              display: none;
            }
            .icon-after {
              display: inline-block;
            }
          }
          .link {
            color: #000;
            display: block;
            text-decoration: none;
            &:hover {
              color: #4b61c1;
            }
          }
        }
        .active {
          background-color: #4b61c1;
          color: #fff !important;
          .icon-after {
            color: #fff;
            display: inline-block;
          }
          .icon-before {
            display: none;
          }
        }
      }
      /*去旅游菜单*/
      .travel-content {
        list-style: none;
        position: absolute;
        top: 43px;
        left: 710px;
        background-color: #fff;
        width: 120px;
        padding-left: 0;
        li {
          height: 40px;
          line-height: 40px;
          padding-left: 35px;
          cursor: pointer;
          .word {
            color: #666;
          }
          &:hover {
            background-color: #ddd;
          }
        }
      }
      /*登录选项*/
      .login {
        flex: 1.5;
        text-align: right;
        position: relative;
        .alreadyLogin {
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .down-icon {
            color: #ccc;
            line-height: 50px;
            height: 100%;
            width: 30px;
            display: inline-block;
          }
          &:hover {
            img {
              border: 1px solid #ff8800;
            }
            .down-icon {
              color: #ff8800;
            }
          }
        }
        .noLogin {
          span {
            color: #4b61c1;
            font-size: 13px;
            cursor: pointer;
          }
        }
        .loginMenu{
          position: absolute;
          left: 20px;
          top: 46px;
          background-color: #fff;
          padding-left: 0;
          list-style: none;
          text-align: left;
          .item{
            padding: 0 25px;
            .iconfont{
              padding-right: 5px;
            }
            &:hover{
              background-color: #ddd;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .content{
    width: 100%;
    height:  45px;
  }
</style>
