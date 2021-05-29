<template>
  <div class="login">
    <div class="loginBox" v-if="page">
      <div class="loginTitle">
        <span :class="{active: currentShow==='index' }" @click="currentShow='index'">登录</span>
        <span :class="{active: currentShow==='regist' }" @click="currentShow='regist'">注册</span>
      </div>
      <!--登陆面板-->
      <div class="loginContent" v-if="currentShow==='index'">
        <input type="text" placeholder="请输入账号" v-model="account">
        <input type="password" placeholder="请输入密码" v-model="password"/>
        <span class="forget" @click="page=false">忘记密码</span>
        <button class="loginBtn" @click="login">登录</button>
      </div>
      <!--注册面板-->
      <div class="regContent" v-else>
        <input type="text" placeholder="请输入账户" v-model="account">
        <input type="password" placeholder="请输入密码" v-model="password">
        <input type="password" placeholder="再次确认密码" v-model="rePassword">
        <select required v-model="question">
          <option style="display: none;" disabled selected>请选择密保问题</option>
          <option value ="address">你的家庭住址？</option>
          <option value ="bir">你的生日是什么时候？</option>
          <option value="school">你的小学名字是什么？</option>
          <option value="mother">你母亲叫什么？</option>
        </select>
        <input type="text" placeholder="请输入密保答案" v-model="protection">
        <button class="registerBtn" @click="register">注册</button>
      </div>
    </div>
    <!--忘记密码面板-->
    <div class="forgetBox" v-else>
      <div class="title">找回密码</div>
      <div class="content">
        <input type="text" placeholder="请输入账号" v-model="account">
        <input type="password" placeholder="请输入新密码" v-model="password">
        <input type="password" placeholder="请确认新密码" v-model="rePassword">
        <select required v-model="question">
          <option style="display: none;" disabled selected>请选择密保问题</option>
          <option value ="address">你的家庭住址？</option>
          <option value ="bir">你的生日是什么时候？</option>
          <option value="school">你的小学名字是什么？</option>
          <option value="mother">你母亲叫什么？</option>
        </select>
        <input type="text" placeholder="请输入答案" v-model="protection">
        <button class="confirmBtn" @click="changePass">确认</button>
        <div class="returnBack" @click="page=true">返回登录</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "login",
        data(){
            return{
                currentShow:'index',//值为index时，表示显示登录面板
                page:true,//当值为false时显示忘记密码面板
                /*登录和注册的所需信息--------*/
                account:'',//账号
                password:'',//密码
                rePassword:'',//确认密码
                question:'',//密保问题
                protection:'',//密保答案
            }
        },
        methods:{
            /*对话框确认封装*/
            showConfirm(message,callback) {
                this.$confirm({
                    title: message,
                    okText:'确认',
                    cancelText:'取消',
                    onOk() {
                        callback();
                    },
                })
            },
            /*登陆账号*/
            login(){
                if(this.account==''||this.password==''){
                    this.$message.error('账号或密码不能为空');
                }else{
                    this.$https.post('user/login',{
                        account:this.account,
                        password:this.password
                    }).then( res => {
                        var data = res.body;
                        if(data.success){
                            this.$store.commit('setToken',data.token);
                            /*将账号存在全局变量中*/
                            this.$store.commit('setAccount',data.account);
                            this.$store.commit('sethHeadPic',data.headPic);
                            this.$store.commit('setNickName',data.nickName);
                            /*跳转到首页*/
                            if(data.type == '0'){
                                this.$router.push({path:'/'});
                            }else{
                                this.$router.push({path:'/admin'});
                            }
                            this.account = this.password = '';
                        }else{
                            this.$message.error(data.rspDesc);
                        }
                    });
                }
            },
            /*注册账号*/
            register(){
                if(this.account==''||this.password==''){
                    this.$message.error('账号或密码不能为空');
                }else if(this.password != this.rePassword){
                    this.$message.error('两次密码不一致');
                }else if(this.question==''||this.protection==''){
                    this.$message.error('请输入密保问题和答案');
                }else{
                    var _this=this;
                    this.$confirm({
                        title: '是否确认注册?',
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.$https.post('user/register',{
                                account:_this.account,
                                password:_this.password,
                                passQues:_this.question,
                                passAns:_this.protection
                            }).then( res => {
                                if(res.body.success){
                                    /*显示登陆页面*/
                                    _this.currentShow='index';
                                }else{
                                    _this.$message.error(res.body.rspDesc);
                                }
                                _this.password=_this.rePassword=_this.question=_this.protection='';
                            })
                        }
                    });
                }
            },
            /*修改密码*/
            changePass(){
                if(this.account==''||this.password==''){
                    this.$message.error('账号或密码不能为空');
                }else if(this.password != this.rePassword){
                    this.$message.error('两次密码不一致');
                }else if(this.question==''||this.protection==''){
                    this.$message.error('请输入密保问题和答案');
                }else{
                    var _this=this;
                    this.$confirm({
                        title: '是否确认修改密码?',
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.$https.post('user/restPassword',{
                                account:_this.account,
                                password:_this.password,
                                passQues: _this.question,
                                passAns:_this.protection
                            }).then( res => {
                                if(res.body.success){
                                    /*显示登陆页面*/
                                    _this.currentShow='index';
                                    _this.page=true;
                                }else{
                                    _this.$message.error(res.body.rspDesc);
                                }
                                _this.password=_this.rePassword=_this.question=_this.protection='';
                            })}
                    });
                }
            }
        },
        created() {
            this.currentShow = this.$route.query.id;
        }
    }
</script>
<style lang="scss" scoped>
  .login{
    width: 100%;
    height: 100%;
    background: url('../assets/back.jpg') no-repeat center center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    .loginBox, .forgetBox{
      width: 440px;
      min-height: 380px;
      background-color: #ffffff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 10px;
      padding: 10px;
      .loginTitle{
        display: flex;
        text-align: center;
        span{
          flex: 2;
          cursor: pointer;
          font-size: 20px;
          padding: 3px;
          color: #848595;
        }
        .active{
          border-bottom: 2px solid #2d3b77;
          color: #4b61c1;
        }
      }
      .loginContent{
        padding: 30px 20px 20px 20px;
        position: relative;
        .forget{
          position: absolute;
          right: 30px;
          top: 170px;
          font-size: 12px;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .loginBtn , .registerBtn,.confirmBtn{
        width: 380px;
        height: 40px;
        margin-top:60px;
        background-color: #5e5ea4;
        border-radius: 5px;
        outline: none;
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
      input[type='text'],input[type='password'],select{
        width: 380px;
        height: 40px;
        background-color:#f6f7f9 ;
        border: none;
        border-radius: 5px;
        padding: 5px 5px 5px 10px;
        margin-top: 20px;
        outline: none;
        color: #000;
        &:focus {
          border: 2px solid #5e5ea4;
        }
        &::-moz-placeholder {
          color:   #ccc;
        }
        &::-webkit-input-placeholder {
          color:    #ccc;
        }
      }
      .regContent{
        padding: 30px 20px 20px 20px;
      }
    }
    .forgetBox{
      padding: 0;
      min-height: 490px;
      .title{
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
        background-color: #f5f5f5;
        color: #666;
        font-size: 18px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .content{
        padding: 10px 30px 30px 30px;
        .confirmBtn{
          margin-top: 30px;
        }
        .returnBack{
          margin: 10px  0;
          float: right;
          font-size: 12px;
          text-decoration: underline;
          cursor: pointer;
        }
      }

    }
  }
</style>
