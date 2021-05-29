<template>
    <div class="person-index">
        <div class="center">
            <!--侧边个人信息 -->
            <div class="sidebar">
                <div class="head">
                    <img :src="headPic" alt="">
                </div>
                <div class="firstPart">
                    <span class="name">{{nickName}}</span>
                    <span class="sex">
                       <span class="iconfont icon-woman" v-if="sex==1"></span>
                       <span class="iconfont icon-man" v-else></span>
                   </span>
                </div>
                <div class="secondPart">
                    <span class="address">现居：{{address}}</span>|
                    <span class="iconfont icon-setUp" @click="senValue"></span>
                </div>
                <div class="writeBtn" v-if="!introInputDisp&&introduce==null" @click="introInputDisp=true" >填写个人简介</div>
                <div class="introduceWord" v-if="!introInputDisp" @click="introInputDisp=true">{{introduce}}</div>
                <div class="writeIntroInput" v-else>
                    <a-textarea placeholder="例：摄影师/潜水爱好者"
                                :rows="5"  class="introInput" v-model="introduce"/><br/>
                    <span class="saveBtn" @click="saveIntroduce">保存</span>
                </div>
            </div>
            <div class="personContent">
                <div class="introduce">
                    <p><span class="name">{{nickName}}</span>，这里是你的【窝】！</p>
                    <p>是记录你的旅行记忆，结交各路豪杰的地盘儿。现在开启旅程！</p>
                    <ul class="introduce-main">
                        <li><img src="../../assets/person-icon1.png" alt="">
                            <p>做一个有“脸面”的人上传头像，完善资料！</p>
                            <span class="btn"  @click="senValue">完善个人资料</span>
                        </li>
                        <li><img src="../../assets/person-icon2.png" alt="">
                            <p>这儿潜伏着哪些旅行大神？ 他们都怎么玩儿？</p>
                            <span class="btn" @click="gotoIndex('/strategy')">逛逛达人攻略</span>
                        </li>
                        <li><img src="../../assets/person-icon3.png" alt="">
                            <p>这里有适合你的众多的的套餐，看看哪款适合你</p>
                            <span class="btn" @click="gotoIndex('/follow')">查看套餐</span>
                        </li>
                    </ul>
                </div>
                <div class="strategyBox">
                    <h3>我的游记</h3>
                    <img src="../../assets/person-strage.jpg" alt="">
                    <span class="writeBtn" @click="gotoWriteStrategy">
                       <span class="iconfont icon-write"></span>
                       写游记</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personDefault",
        data(){
            return{
                sex:'',
                /*个人简介*/
                introduce:'',
                address:'',
                account: '',
                token:'',
                /*个人简介输入框是否显示*/
                introInputDisp:false,

            }
        },
        computed:{
            headPic:function () {//用户头像地址
                return this.$store.state.headPic;
            },
            nickName:function () {//名字
                return this.$store.state.nickName;
            }
        },
        methods:{
            /*跳转到首页进行查看*/
            gotoIndex(path){
                if(path == '/follow'){
                    this.$store.commit('setNavigation',3)
                }else{
                    this.$store.commit('setNavigation',2)
                }
                this.$router.push({
                    path: path,
                });
            },
            /*传递参数给父组件,用于跳转到修改信息页面*/
            senValue(){
                this.$emit('sendNavIndex',0)
            },
            /*功能：跳转到写游记的页面*/
            gotoWriteStrategy(){
                this.$router.push('writeStrategy');
            },
            /*功能：保存个人简介的修改*/
            saveIntroduce(){
                var params={account:this.account, describe:this.introduce, token:this.token};
                var _this = this;
                this.$confirm({
                    title: '是否确认修改?',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        _this.$https.post('user/modifyInfo',params).then( res => {
                            if(res.body.success){
                                _this.introInputDisp = false;
                                _this.$message.success(res.body.rspDesc);
                            }else{
                                _this.$message.error(res.body.rspDesc);
                            }
                        })
                       if( _this.introduce == ''){_this.introInputDisp = true;}
                    }
                })
            }
        },
        created(){
            this.token =this.$store.state.token;
            this.account =this.$store.state.account;
            this.$https.post('user/init', {account:this.account}).then( res => {
                var data = res.body;
                if (data.success) {
                    this.introduce = data.user.des;
                    this.address = data.user.address;
                    this.sex = data.user.sex;
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .center{
        width: 75%;
        margin: 0 auto;
        display: flex;
    }
    /*侧边个人信息*/
    .sidebar{
        flex: 1;
        background-color: #fff;
        position: relative;
        box-shadow:  0 0 2px rgba(0,0,0,0.05);
        text-align: center;
        padding-bottom: 30px;
        height: 400px;
        .head{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid #eee;
            position: absolute;
            left: 50%;
            top: -40px;
            transform: translateX(-50%);
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .firstPart{
            padding-top: 70px;
            .name{
                font-size: 22px;
                color: #737373;
            }
            .sex{
                color: #e8765a;
                padding-left: 10px;
            }
        }
        .secondPart{
            padding: 5px;
            .address{
                font-size: 13px;
                padding-right: 10px;
            }
            .icon-setUp{
                padding-left: 5px;
                cursor: pointer;
            }
        }
        .writeBtn{
            width: 80%;
            height: 30px;
            line-height: 30px;
            background-color: #efefef;
            border-radius: 3px;
            margin: 10px auto;
            cursor: pointer;
            font-size: 14px;
        }
        .writeIntroInput{
            text-align: center;
            .introInput{
                background-color: #efefef;
                width: 85%;
                border-radius: 0;
                margin: 10px 0;
                border: none;
                font-size: 12px;
            }
            .saveBtn{
                display: block;
                width: 85%;
                background-color: #cccccc;
                height: 30px;
                line-height: 30px;
                margin: 5px auto;
                border-radius: 5px;
                color: #fff;
                &:hover{
                    background-color: #ff8a00;
                }
            }
        }
        .introduceWord{
            margin: 10px 0;
            cursor: pointer;
        }
    }
    .personContent{
        flex: 3;
        padding: 20px;
        .introduce{
            width: 100%;
            height: 390px;
            background-color: #f5dc52;
            margin-bottom: 20px;
            padding: 20px;
            box-shadow: 2px 3px 0 #dfca58;
            >p{
                padding-left: 10px;
                .name{
                    font-size: 18px;
                    color: #ff7200;
                }
            }
            .introduce-main{
                padding-left: 10px;
                list-style: none;
                display: flex;
                li{
                    flex: 1;
                    margin-right: 15px;
                    padding: 20px 20px 30px 20px ;
                    background-color: #fff;
                    text-align: center;
                    img{
                        width: 90%;
                    }
                    p{
                        margin: 10px 0 40px 0;
                        font-size: 14px;
                        line-height: 24px;
                    }
                    .btn{
                        width: 80%;
                        background-color: #f1744f;
                        color: #fff;
                        padding: 5px 15px;
                        font-size: 14px;
                        border-radius: 15px;
                        margin-top: 10px;
                        cursor: pointer;
                    }
                }
            }
        }
        .strategyBox{
            width: 100%;
            height: 450px;
            background-color: #fff;
            box-shadow: 0 0 2px rgba(0,0,0,0.05);
            position: relative;
            h3{
                padding: 20px;
            }
            img{
                width: 100%;
            }
            .writeBtn{
                position: absolute;
                right: 20px;
                top: 15px;
                background-color: #ff9e00;
                color: #fff;
                display: inline-block;
                width: 140px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
</style>